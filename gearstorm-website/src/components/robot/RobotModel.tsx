import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useCallback, useRef } from 'react';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import { Chassis } from './RobotParts/Chassis';
import { Electronics } from './RobotParts/Electronics';
import { Gripper } from './RobotParts/Gripper';
import { SensorMast } from './RobotParts/SensorMast';
import { Wheel } from './RobotParts/Wheel';

/**
 * How the assembly is driven:
 * - `scroll`: follows the scroll-linked progress value (pinned desktop hero)
 * - `auto`: plays through once on its own, for layouts with no pinned track
 * - `static`: renders the finished robot with no motion (reduced motion)
 */
export type RobotMode = 'scroll' | 'auto' | 'static';

export interface RobotModelProps {
  /** Assembly progress, 0-100. Only read in `scroll` mode. */
  progress: MotionValue<number>;
  mode: RobotMode;
}

/** Progress units per second when auto-playing (~2.2s for a full assembly). */
const AUTO_SPEED = 45;

type Offset = readonly [number, number, number];

/** Where each part flies in from, relative to its mounted position. */
const CHASSIS_OFFSET: Offset = [0, 2.6, 0];
const SENSOR_OFFSET: Offset = [0.4, 2.2, 0];
const GRIPPER_OFFSET: Offset = [2.4, 0.3, 0];
const ELECTRONICS_OFFSET: Offset = [-0.5, 2.4, 0];

const WHEEL_POSITIONS: readonly Offset[] = [
  [0.75, -0.42, 0.79],
  [0.75, -0.42, -0.79],
  [-0.75, -0.42, 0.79],
  [-0.75, -0.42, -0.79],
];

/** Assembly stage ranges in progress percent: [start, end]. */
const STAGE = {
  chassis: [0, 20],
  wheels: [20, 40],
  sensors: [40, 60],
  gripper: [60, 80],
  electronics: [80, 95],
  bootup: [95, 100],
} as const;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const stageT = (p: number, [start, end]: readonly [number, number]): number =>
  clamp01((p - start) / (end - start));

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const applyStage = (
  group: Group | null,
  p: number,
  range: readonly [number, number],
  offset: Offset
): void => {
  if (!group) {
    return;
  }
  const t = easeOutCubic(stageT(p, range));
  group.visible = t > 0.001;
  group.position.set(
    offset[0] * (1 - t),
    offset[1] * (1 - t),
    offset[2] * (1 - t)
  );
  group.scale.setScalar(0.55 + 0.45 * t);
};

/**
 * The GearStorm bot, assembled part by part as `progress` moves 0-100:
 * chassis, wheels, sensors, gripper, electronics, then boot-up (lights on,
 * wheels spinning, gentle hover).
 */
export const RobotModel = ({
  progress,
  mode,
}: RobotModelProps): JSX.Element => {
  const rootRef = useRef<Group>(null);
  const chassisRef = useRef<Group>(null);
  const sensorRef = useRef<Group>(null);
  const gripperRef = useRef<Group>(null);
  const electronicsRef = useRef<Group>(null);
  const wheelGroupRefs = useRef<(Group | null)[]>([]);

  const spinMeshes = useRef(new Set<Mesh>());
  const bootLights = useRef(new Set<MeshStandardMaterial>());

  /** Smoothed progress so fast scrolling doesn't make parts jump. */
  const smoothed = useRef(0);
  /** Self-advancing progress used in `auto` mode. */
  const autoProgress = useRef(0);
  /** Accumulated yaw once the robot has booted. */
  const bootSpin = useRef(0);

  const registerSpin = useCallback((mesh: Mesh | null) => {
    if (mesh) {
      spinMeshes.current.add(mesh);
    }
  }, []);

  const registerLight = useCallback((material: MeshStandardMaterial | null) => {
    if (material) {
      bootLights.current.add(material);
    }
  }, []);

  useFrame((state, delta) => {
    let target: number;
    if (mode === 'static') {
      target = 100;
    } else if (mode === 'auto') {
      autoProgress.current = Math.min(
        100,
        autoProgress.current + delta * AUTO_SPEED
      );
      target = autoProgress.current;
    } else {
      target = progress.get();
    }

    smoothed.current += (target - smoothed.current) * Math.min(1, delta * 7);
    const p = mode === 'static' ? 100 : smoothed.current;

    applyStage(chassisRef.current, p, STAGE.chassis, CHASSIS_OFFSET);
    applyStage(sensorRef.current, p, STAGE.sensors, SENSOR_OFFSET);
    applyStage(gripperRef.current, p, STAGE.gripper, GRIPPER_OFFSET);
    applyStage(
      electronicsRef.current,
      p,
      STAGE.electronics,
      ELECTRONICS_OFFSET
    );

    wheelGroupRefs.current.forEach((group, index) => {
      const position = WHEEL_POSITIONS[index];
      if (!position) {
        return;
      }
      applyStage(group, p, STAGE.wheels, [
        Math.sign(position[0]) * 1.4,
        -1.3,
        Math.sign(position[2]) * 1.2,
      ]);
    });

    const boot = easeOutCubic(stageT(p, STAGE.bootup));

    bootLights.current.forEach((material) => {
      material.emissiveIntensity = 0.15 + boot * 1.85;
    });

    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (mode === 'static') {
      root.rotation.y = 0.5;
      root.position.y = -0.15;
      return;
    }

    spinMeshes.current.forEach((mesh) => {
      mesh.rotation.y += delta * boot * 7;
    });

    bootSpin.current += delta * boot * 0.35;
    root.rotation.y = -0.4 + (p / 100) * 0.9 + bootSpin.current;
    root.position.y =
      -0.15 + Math.sin(state.clock.elapsedTime * 2.1) * 0.05 * boot;
  });

  return (
    <group ref={rootRef} position={[0, -0.15, 0]}>
      <group ref={chassisRef} visible={false}>
        <Chassis />
      </group>
      {WHEEL_POSITIONS.map((position, index) => (
        <group
          key={index}
          ref={(node) => {
            wheelGroupRefs.current[index] = node;
          }}
          visible={false}
        >
          <group position={[...position]}>
            <Wheel registerSpin={registerSpin} />
          </group>
        </group>
      ))}
      <group ref={sensorRef} visible={false}>
        <SensorMast registerLight={registerLight} />
      </group>
      <group ref={gripperRef} visible={false}>
        <Gripper />
      </group>
      <group ref={electronicsRef} visible={false}>
        <Electronics registerLight={registerLight} />
      </group>
    </group>
  );
};
