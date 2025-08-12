// Theme utility for easy access to colors, shadows, and radii
export const theme = {
  colors: {
    // Core theme colors matching tailwind config
    primary: '#F28B82',
    accent: '#FDD663',
    background: '#FDF6F0',
    secondary: '#7E8A97',
    success: '#81C995',
    danger: '#FF6F61',
    
    // Gradients and variations
    backgroundGradient: 'linear-gradient(135deg, #FDF6F0 0%, #FDF6F0 100%)',
    primaryLight: '#FF9A9A',
    primaryDark: '#D65A5A',
    primaryGradient: 'linear-gradient(135deg, #F28B82 0%, #FF9A9A 100%)',
    accentLight: '#FFE08A',
    accentDark: '#E6B856',
    accentGradient: 'linear-gradient(135deg, #FDD663 0%, #FFE08A 100%)',
    
    // Utility colors
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1.25rem',
    xl: '2rem',
    full: '9999px',
  },
  boxShadow: {
    card: '0 2px 8px rgba(0,0,0,0.1)',
    elevated: '0 4px 12px rgba(0,0,0,0.15)',
    glow: '0 0 8px rgba(242,139,130,0.6)',
    soft: '0 4px 6px rgba(0, 0, 0, 0.1)',
    button: '0 5px 15px -5px rgba(242,139,130,0.4)',
    glowAccent: '0 0 15px rgba(255, 211, 105, 0.5)',
  },
  typography: {
    responsive: {
      base: 'clamp(1rem, 1.5vw, 1.125rem)',
      lg: 'clamp(1.125rem, 2vw, 1.25rem)',
      xl: 'clamp(1.25rem, 2.5vw, 1.5rem)',
      '2xl': 'clamp(1.5rem, 3vw, 2rem)',
      '3xl': 'clamp(1.875rem, 4vw, 2.5rem)',
    },
  },
  spacing: {
    navHeight: '80px',
    containerPadding: '1.5rem',
    sectionGap: '4rem',
  },
  zIndex: {
    navbar: 40,
    overlay: 50,
    modal: 60,
    tooltip: 70,
  },
};

// Helper functions for component styling
export const getGlassmorphismStyle = (opacity = 0.7) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: 'blur(12px)',
  borderRadius: theme.borderRadius.lg,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: theme.boxShadow.soft,
});

export const getGradientTextStyle = (gradient = theme.colors.primaryGradient) => ({
  background: gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
});

// Framer Motion animations
export const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 80,
        damping: 12
      }
    },
  },
  stagger: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.2,
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: 'spring',
          stiffness: 80,
          damping: 12
        }
      }
    }
  },
  // Intersection Observer - only animate when in viewport
  viewport: {
    once: true,
    margin: "-100px",
  }
};
