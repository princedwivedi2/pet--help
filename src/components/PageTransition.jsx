import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * PageTransition component
 * 
 * Wraps page components with consistent page transition animations
 * Provides different animations based on the transition type
 */
export default function PageTransition({ 
  children, 
  type = 'fade',
  duration = 0.5
}) {
  // Animation variants for different transition types
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 }
    }
  };

  const selectedVariant = variants[type] || variants.fade;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariant}
      transition={{ 
        duration: duration,
        ease: 'easeInOut'
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['fade', 'slideUp', 'slideRight', 'scale']),
  duration: PropTypes.number
};
