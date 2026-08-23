import type { Mesh } from 'three';

export interface WheelProps {
  /** Registers the spinning mesh so the model can rotate it during boot-up. */
  registerSpin: (mesh: Mesh | null) => void;
}

/**
 * Single wheel with a magenta hub cap. The cylinder's axis is rotated onto Z
 * (the robot's left-right axis) so spinning its local Y rolls it forward.
 */
export const Wheel = ({ registerSpin }: WheelProps): JSX.Element => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <mesh ref={registerSpin}>
      <cylinderGeometry args={[0.42, 0.42, 0.24, 24]} />
      <meshStandardMaterial color="#111827" roughness={0.9} metalness={0.1} />
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
        <meshStandardMaterial color="#D91E63" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.13, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
        <meshStandardMaterial color="#D91E63" metalness={0.6} roughness={0.3} />
      </mesh>
    </mesh>
  </group>
);
