/**
 * Two-arm gripper mounted on the robot's front bumper.
 */
export const Gripper = (): JSX.Element => (
  <group position={[1.22, 0.02, 0]}>
    <mesh position={[0.05, 0, 0]}>
      <boxGeometry args={[0.14, 0.16, 0.7]} />
      <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
    </mesh>
    {[-1, 1].map((side) => (
      <group key={side} position={[0.3, 0, side * 0.28]}>
        <mesh>
          <boxGeometry args={[0.45, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#6B7280"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.3, 0, side * -0.07]} rotation={[0, side * -0.55, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.08]} />
          <meshStandardMaterial
            color="#D91E63"
            metalness={0.5}
            roughness={0.35}
          />
        </mesh>
      </group>
    ))}
  </group>
);
