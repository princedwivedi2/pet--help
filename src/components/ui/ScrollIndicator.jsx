import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated scroll indicator component
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.targetId - ID of the element to scroll to
 * @returns {JSX.Element} - Scroll indicator component
 */
export default function ScrollIndicator({ className = '', targetId = 'features' }) {
  // Handle click to scroll to target section
  const handleScrollClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  return (
    <motion.div
      className={`flex flex-col items-center cursor-pointer ${className}`}
      onClick={handleScrollClick}
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: 1.5, duration: 0.5 }
      }}
      whileHover={{ y: 5 }}
      role="button"
      tabIndex={0}
      aria-label="Scroll to features"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleScrollClick();
        }
      }}
    >
      <span className="text-sm font-medium text-gray-500 mb-2">Scroll</span>
      <motion.div
        className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-primary rounded-full"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}

ScrollIndicator.propTypes = {
  className: PropTypes.string,
  targetId: PropTypes.string,
};
