import { Canvas } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { CanvasTexture } from 'three';
import { RobotFallback } from './RobotFallback';
import { RobotModel, type RobotMode } from './RobotModel';
import { isWebGLAvailable } from '@/utils/webgl';

export interface Robot3DProps {
  /** Assembly progress, 0-100. Only read in `scroll` mode. */
  progress: MotionValue<number>;
  mode: RobotMode;
  /** When false, the render loop pauses (canvas is off-screen). */
  active: boolean;
}

/**
 * Soft radial-gradient shadow under the robot. A texture on a plane costs a
 * fraction of drei's ContactShadows (which pulls in all of three-stdlib).
 */
const GroundShadow = (): JSX.Element | null => {
  const texture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new CanvasTexture(canvas);
  }, []);

  useEffect(
    () => () => {
      texture?.dispose();
    },
    [texture]
  );

  if (!texture) {
    return null;
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
      <planeGeometry args={[5.5, 4.5]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
};

/**
 * 3D robot canvas for the Home hero. Lazy-loaded so Three.js stays out of the
 * initial bundle; renders a static fallback when WebGL is unavailable.
 */
const Robot3D = ({ progress, mode, active }: Robot3DProps): JSX.Element => {
  const [webglSupported] = useState(isWebGLAvailable);

  if (!webglSupported) {
    return <RobotFallback />;
  }

  return (
    <Canvas
      // Pausing off-screen keeps the GPU idle while reading the rest of the
      // page; a static robot only needs the one frame `demand` renders.
      frameloop={!active ? 'never' : mode === 'static' ? 'demand' : 'always'}
      dpr={[1, 1.75]}
      camera={{ position: [3.4, 1.9, 4.6], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <pointLight position={[-4, 2, -3]} intensity={35} color="#D91E63" />
      <RobotModel progress={progress} mode={mode} />
      <GroundShadow />
    </Canvas>
  );
};

export default Robot3D;
