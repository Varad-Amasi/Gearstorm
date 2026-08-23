import type { MeshStandardMaterial } from 'three';

export interface ElectronicsProps {
  /** Registers emissive materials that light up during boot-up. */
  registerLight: (material: MeshStandardMaterial | null) => void;
}

/**
 * Top deck electronics: PCB with chips, an antenna, and neon side strips.
 */
export const Electronics = ({
  registerLight,
}: ElectronicsProps): JSX.Element => (
  <group>
    <mesh position={[-0.35, 0.32, 0]}>
      <boxGeometry args={[0.9, 0.08, 0.9]} />
      <meshStandardMaterial color="#166534" roughness={0.6} />
    </mesh>
    <mesh position={[-0.5, 0.41, 0.15]}>
      <boxGeometry args={[0.22, 0.1, 0.22]} />
      <meshStandardMaterial color="#111827" roughness={0.5} />
    </mesh>
    <mesh position={[-0.15, 0.39, -0.2]}>
      <boxGeometry args={[0.16, 0.06, 0.28]} />
      <meshStandardMaterial color="#374151" roughness={0.5} />
    </mesh>
    <group position={[-0.75, 0.36, -0.3]}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          ref={registerLight}
          color="#D91E63"
          emissive="#D91E63"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
    {[-0.72, 0.72].map((z) => (
      <mesh key={z} position={[0, 0.08, z]}>
        <boxGeometry args={[1.9, 0.07, 0.03]} />
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
