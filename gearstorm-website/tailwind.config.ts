import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3E8FF',
          100: '#E9D5FF',
          500: '#D946EF',
          600: '#D1259C',
          700: '#6B3A8C',
          800: '#5A2E78',
          900: '#3C1C57',
          DEFAULT: '#6B3A8C',
        },
        accent: {
          50: '#FCE7F3',
          500: '#D91E63',
          600: '#C81D5D',
          700: '#9D174D',
          DEFAULT: '#D91E63',
        },
        dark: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          600: '#4B5563',
          700: '#374151',
          800: '#1A1A2E',
          900: '#111827',
          950: '#0F0F1E',
          DEFAULT: '#0F0F1E',
        },
        'text-light': '#E0E0E0',
        'text-muted': '#9CA3AF',
        'text-subtle': '#6B7280',
        border: '#374151',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        'neon-cyan': '#00D9FF',
        'electric-green': '#00FF88',
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        purple: '0 0 20px rgba(107, 58, 140, 0.5)',
        magenta: '0 0 20px rgba(217, 30, 99, 0.5)',
      },
      maxWidth: {
        content: '1400px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      zIndex: {
        dropdown: '30',
        header: '40',
        modal: '50',
        toast: '60',
        skiplink: '70',
      },
    },
  },
  plugins: [],
};

export default config;
