/**
 * Robot body: purple main shell, dark base plate, and magenta front bumper.
 * The robot faces +X.
 */
export const Chassis = (): JSX.Element => (
  <group>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2.2, 0.55, 1.4]} />
      <meshStandardMaterial color="#6B3A8C" metalness={0.45} roughness={0.35} />
    </mesh>
    <mesh position={[0, -0.34, 0]}>
      <boxGeometry args={[2.35, 0.14, 1.5]} />
      <meshStandardMaterial color="#1A1A2E" metalness={0.6} roughness={0.4} />
    </mesh>
    <mesh position={[1.16, -0.12, 0]}>
      <boxGeometry args={[0.12, 0.3, 1.2]} />
      <meshStandardMaterial color="#D91E63" metalness={0.5} roughness={0.3} />
    </mesh>
  </group>
);
