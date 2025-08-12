import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * PawLoader Component
 * 
 * A cute paw-themed loading animation with emotional messages
 * and accessibility considerations.
 */
export default function PawLoader({ 
  message = "Fetching paw-some content...",
  size = "md", 
  showMessage = true 
}) {
  // Size classes for the container
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };
  
  // Emotional loading messages
  const loadingMessages = [
    "Wagging our tails with excitement...",
    "Purring while we prepare your content...",
    "Fetching paw-some information...",
    "Sniffing out the best answers...",
    "Pawing through our resources...",
    "Rolling over your request..."
  ];
  
  // If a message wasn't provided, pick a random one
  const displayMessage = message || loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div 
        className={`relative ${sizeClasses[size] || sizeClasses.md}`}
        animate={{ rotate: [0, 10, 0, -10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        <img 
          src="/assets/paw-animation.svg" 
          alt="Loading..." 
          className="w-full h-full" 
        />
      </motion.div>
      
      {showMessage && (
        <motion.p 
          className="mt-4 text-primary text-center max-w-xs font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {displayMessage}
        </motion.p>
      )}
    </div>
  );
}

PawLoader.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showMessage: PropTypes.bool
};
