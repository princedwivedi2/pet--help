import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF8F3',
        'background-gradient': 'linear-gradient(135deg, #FFF8F3 0%, #FDF6F0 100%)',
        primary: {
          DEFAULT: '#F76C6C',
          light: '#FF9A9A', // Updated per requirements
          dark: '#D65A5A',
          gradient: 'linear-gradient(135deg, #F76C6C 0%, #FF9A9A 100%)',
        },
        accent: {
          DEFAULT: '#FFD369',
          light: '#FFE08A',
          dark: '#E6B856',
          gradient: 'linear-gradient(135deg, #FFD369 0%, #FFE08A 100%)',
        },
        secondary: '#6C757D',
        success: '#4CAF50',
        danger: '#FF4C4C',
      },
      borderRadius: {
        'lg': '1.25rem',
        'xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)',
        card: '0 10px 30px -15px rgba(0,0,0,0.1)',
        button: '0 5px 15px -5px rgba(242,139,130,0.4)',
        elevated: '0 15px 35px -15px rgba(0,0,0,0.15), 0 5px 15px -5px rgba(0,0,0,0.08)',
        glow: '0 0 15px rgba(247, 108, 108, 0.5)',
        'glow-accent': '0 0 15px rgba(255, 211, 105, 0.5)',
      },
      fontFamily: {
        sans: ['Nunito', ...fontFamily.sans],
        heading: ['Poppins', ...fontFamily.sans],
      },
      fontSize: {
        'responsive-base': 'clamp(1rem, 1.5vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 2vw, 1.25rem)',
        'responsive-xl': 'clamp(1.25rem, 2.5vw, 1.5rem)',
        'responsive-2xl': 'clamp(1.5rem, 3vw, 2rem)',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(5px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        drop: {
          '0%': { transform: 'translateY(-20px) scale(0.9)', opacity: '0' },
          '70%': { transform: 'translateY(5px) scale(1.05)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(247, 108, 108, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(247, 108, 108, 0.6)' },
        }
      },
      animation: {
        bounceIn: 'bounceIn 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
        shake: 'shake 0.8s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        drop: 'drop 0.6s ease-out',
        glow: 'glow 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease-out forwards',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      },
      height: {
        'screen-navbar': 'calc(100vh - 80px)', // Screen height minus navbar height
      },
      zIndex: {
        'navbar': 40,
        'overlay': 50,
        'modal': 60,
        'tooltip': 70,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities, theme, addBase, addVariant, e }) {
      // Base HTML and body styles for proper scroll handling
      addBase({
        'html, body, #root': {
          minHeight: '100%',
          position: 'relative',
        },
      });
      
      // Intersection Observer animation variants
      addVariant('in-viewport', '&.in-viewport');
      
      // Custom utility classes
      const newUtilities = {
        '.glassmorphism': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        },
        '.glassmorphism-navbar': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        },
        '.elevated-card': {
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        '.elevated-card:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 35px -15px rgba(0,0,0,0.15), 0 5px 15px -5px rgba(0,0,0,0.08)',
        },
        '.reduced-motion': {
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none !important',
            transition: 'none !important',
          },
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #F76C6C 0%, #FF9A9A 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        },
        '.gradient-border': {
          border: 'double 4px transparent',
          backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, #F76C6C, #FF9A9A)`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
};

