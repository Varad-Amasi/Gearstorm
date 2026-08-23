import type { MeshStandardMaterial } from 'three';

export interface SensorMastProps {
  /** Registers emissive materials that light up during boot-up. */
  registerLight: (material: MeshStandardMaterial | null) => void;
}

/**
 * Sensor pole with a camera head and two cyan "eye" sensors at the front.
 */
export const SensorMast = ({ registerLight }: SensorMastProps): JSX.Element => (
  <group position={[0.68, 0.28, 0]}>
    <mesh position={[0, 0.22, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 0.45, 12]} />
      <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
    </mesh>
    <mesh position={[0.02, 0.5, 0]}>
      <boxGeometry args={[0.36, 0.24, 0.44]} />
      <meshStandardMaterial color="#1A1A2E" metalness={0.5} roughness={0.4} />
    </mesh>
    {[-0.11, 0.11].map((z) => (
      <mesh key={z} position={[0.21, 0.5, z]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          ref={registerLight}
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.15}
        />
      </mesh>
    ))}
  </group>
);
