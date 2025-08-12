import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

/**
 * PetReaction component displays a pet icon with different moods based on context
 * 
 * @param {Object} props
 * @param {string} props.mood - The mood of the pet ('idle', 'thinking', 'happy', 'alert')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export default function PetReaction({ mood = 'idle', className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const petIconSrc = '/assets/PetIcon3.png';
  
  // Map sentiment to mood color background
  const moodColors = {
    idle: 'bg-gray-100',
    thinking: 'bg-accent/20',
    happy: 'bg-success/20',
    alert: 'bg-danger/20'
  };

  // Map mood to accessible labels
  const moodLabels = {
    idle: 'Pet is waiting',
    thinking: 'Pet is thinking',
    happy: 'Pet is happy',
    alert: 'Pet is concerned'
  };
  
  // Define mood-specific animations
  const moodAnimations = {
    idle: {
      animate: { y: prefersReducedMotion ? 0 : [0, -5, 0], scale: 1, opacity: 1 },
      transition: { 
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 120, damping: 10 }
      }
    },
    thinking: {
      animate: { scale: prefersReducedMotion ? 1 : [1, 1.03, 1], opacity: 1 },
      transition: { 
        scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
      }
    },
    happy: {
      animate: { rotate: prefersReducedMotion ? 0 : [0, -5, 5, -5, 0], scale: 1, opacity: 1 },
      transition: { 
        rotate: { repeat: Infinity, duration: 1, ease: "easeInOut" }
      }
    },
    alert: {
      animate: { scale: prefersReducedMotion ? 1 : [1, 1.05, 1], opacity: 1 },
      transition: { 
        scale: { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
      }
    }
  };

  // Get the appropriate animation based on mood
  const currentAnimation = moodAnimations[mood] || moodAnimations.idle;

  return (
    <motion.div
      className={`rounded-full p-1 ${moodColors[mood] || moodColors.idle} ${className}`}
      animate={currentAnimation.animate}
      transition={currentAnimation.transition}
    >
      <motion.img
        src={petIconSrc}
        alt={moodLabels[mood] || moodLabels.idle}
        className="w-10 h-10 object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-label={moodLabels[mood] || moodLabels.idle}
        onError={(e) => {
          console.error("Failed to load pet icon", e);
          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z'/%3E%3C/svg%3E";
        }}
      />
    </motion.div>
  );
}

PetReaction.propTypes = {
  mood: PropTypes.oneOf(['idle', 'thinking', 'happy', 'alert']),
  className: PropTypes.string,
};
