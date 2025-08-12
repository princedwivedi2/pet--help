import { motion, useReducedMotion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Hero illustration for the landing page
 */
export default function PetHeroIllustration({ className = '' }) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  // Define animation variants for the different parts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 100,
        damping: 10,
        duration: prefersReducedMotion ? 0.1 : undefined
      }
    }
  };
  
  const floatAnimation = prefersReducedMotion ? 
    { opacity: 1 } : // No animation if reduced motion is preferred
    {
      y: [0, -15, 0],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    };

  return (
    <div className={`relative ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute -inset-4 bg-primary/5 rounded-full filter blur-xl"></div>
      
      {/* Main pet illustration - in real app, replace with IconScout asset */}
      <motion.div 
        className="relative z-10 w-72 h-72 md:w-96 md:h-96 reduced-motion"
        animate={floatAnimation}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full p-4 shadow-elevated flex items-center justify-center overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          {/* Placeholder for 3D pet illustration - would be replaced with actual image */}
          <motion.svg 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Body */}
            <motion.circle 
              cx="100" cy="110" r="60" 
              fill="#F28B82" 
              variants={itemVariants} 
            />
            
            {/* Face */}
            <motion.circle 
              cx="100" cy="90" r="45" 
              fill="#FFF" 
              variants={itemVariants} 
            />
            
            {/* Eyes */}
            <motion.circle 
              cx="80" cy="85" r="10" 
              fill="#7E8A97" 
              variants={itemVariants} 
            />
            <motion.circle 
              cx="120" cy="85" r="10" 
              fill="#7E8A97" 
              variants={itemVariants} 
            />
            
            {/* Nose */}
            <motion.circle 
              cx="100" cy="100" r="8" 
              fill="#FF6F61" 
              variants={itemVariants} 
            />
            
            {/* Mouth */}
            <motion.path 
              d="M 80 115 Q 100 135 120 115" 
              stroke="#7E8A97" 
              strokeWidth="4" 
              fill="transparent"
              variants={itemVariants} 
            />
            
            {/* Ears */}
            <motion.ellipse 
              cx="70" cy="50" rx="15" ry="25" 
              fill="#F28B82" 
              transform="rotate(-20 70 50)"
              variants={itemVariants} 
            />
            <motion.ellipse 
              cx="130" cy="50" rx="15" ry="25" 
              fill="#F28B82" 
              transform="rotate(20 130 50)"
              variants={itemVariants} 
            />
          </motion.svg>
        </motion.div>
      </motion.div>
      
      {/* Small decorative paw prints */}
      <motion.div 
        className="absolute top-0 right-0 text-accent opacity-60"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="25" cy="25" r="10" />
          <circle cx="45" cy="15" r="8" />
          <circle cx="60" cy="25" r="8" />
          <circle cx="45" cy="45" r="10" />
          <circle cx="42" cy="30" r="15" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-4 left-4 text-primary opacity-60"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <svg width="30" height="30" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="25" cy="25" r="10" />
          <circle cx="45" cy="15" r="8" />
          <circle cx="60" cy="25" r="8" />
          <circle cx="45" cy="45" r="10" />
          <circle cx="42" cy="30" r="15" />
        </svg>
      </motion.div>
    </div>
  );
}

PetHeroIllustration.propTypes = {
  className: PropTypes.string,
};
