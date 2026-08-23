export const DESIGN_TOKENS = {
  colors: {
    primary: '#6B3A8C',
    accent: '#D91E63',
    text: '#E0E0E0',
    bg: '#0F0F1E',
    surface: '#1A1A2E',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
} as const;

export const ROBOT_ASSEMBLY_STAGES = {
  CHASSIS: 0,
  WHEELS: 20,
  SENSORS: 40,
  GRIPPER: 60,
  ELECTRONICS: 80,
  BOOTUP: 95,
} as const;
