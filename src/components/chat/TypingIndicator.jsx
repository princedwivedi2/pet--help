import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useReducedMotion } from 'framer-motion';

/**
 * TypingIndicator component shows when the assistant is "typing"
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export default function TypingIndicator({ className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  // Define dot animation based on reduced motion preference
  const dotVariants = {
    hidden: { opacity: 0.4, y: 0 },
    visible: { 
      opacity: 1, 
      y: prefersReducedMotion ? 0 : -5,
      transition: {
        duration: 0.3,
      }
    },
  };

  // Stagger the dots animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.1 : 0.2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div 
      className={`flex items-end py-2 px-4 ${className}`} 
      role="status" 
      aria-live="polite"
      aria-label="Assistant is typing..."
    >
      <div className="flex items-center bg-white/70 glassmorphism shadow-card rounded-2xl px-4 py-3 rounded-bl-none">
        <motion.div 
          className="flex space-x-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-2 h-2 bg-primary/70 rounded-full" variants={dotVariants} />
          <motion.div className="w-2 h-2 bg-primary/70 rounded-full" variants={dotVariants} />
          <motion.div className="w-2 h-2 bg-primary/70 rounded-full" variants={dotVariants} />
        </motion.div>
      </div>
    </div>
  );
}

TypingIndicator.propTypes = {
  className: PropTypes.string,
};
