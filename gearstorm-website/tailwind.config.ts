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
          800: 'rgb(var(--c-surface-rgb) / <alpha-value>)',
          900: 'rgb(var(--c-page-2-rgb) / <alpha-value>)',
          950: 'rgb(var(--c-page-rgb) / <alpha-value>)',
          DEFAULT: 'rgb(var(--c-page-rgb) / <alpha-value>)',
        },
        'text-light': 'rgb(var(--c-text-rgb) / <alpha-value>)',
        'text-muted': 'rgb(var(--c-muted-rgb) / <alpha-value>)',
        'text-subtle': 'rgb(var(--c-subtle-rgb) / <alpha-value>)',
        border: 'rgb(var(--c-border-rgb) / <alpha-value>)',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        'neon-cyan': '#8B5CF6',
        'neon-orange': '#F0518A',
        'vivid-purple': '#A56BFF',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        heading: ['var(--font-heading)'],
        subhead: ['var(--font-subhead)'],
        body: ['var(--font-body)'],
        sans: ['var(--font-sans)'],
        accent: ['var(--font-accent)'],
        brand: ['var(--font-brand)'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        'serif-accent': ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        purple: '0 12px 32px -14px rgba(107, 58, 140, 0.55)',
        magenta: '0 12px 32px -14px rgba(217, 30, 99, 0.45)',
        orange: '0 12px 32px -14px rgba(217, 30, 99, 0.32)',
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
