// Placeholder for animated pet icon (replace with IconScout asset)
import { motion } from 'framer-motion';
const pet3d = 'assets/PetIcon3.png';

export default function PetIcon({ animate = true, className = '', mood = 'idle' }) {
  // Define animations based on mood
  const moodAnimations = {
    idle: {
      animate: { y: [0, -5, 0], scale: 1, opacity: 1 },
      transition: { 
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 120, damping: 10 },
        opacity: { duration: 0.6 }
      }
    },
    happy: {
      animate: { rotate: [0, -5, 5, -5, 0], scale: 1, opacity: 1 },
      transition: { 
        rotate: { repeat: Infinity, duration: 1, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 120, damping: 10 },
        opacity: { duration: 0.6 }
      }
    },
    alert: {
      animate: { scale: [1, 1.05, 1], opacity: 1 },
      transition: { 
        scale: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.6 }
      }
    }
  };

  // Select the appropriate animation based on mood, default to idle
  const currentMood = moodAnimations[mood] || moodAnimations.idle;
  
  return (
    <motion.div className="reduced-motion">
      <motion.img
        src={pet3d}
        alt="Pet"
        className={`rounded-full shadow-elevated ${className}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={animate ? currentMood.animate : {}}
        transition={currentMood.transition}
        style={{ width: 96, height: 96 }}
        whileHover={{ scale: 1.05 }}
      />
    </motion.div>
  );
}
