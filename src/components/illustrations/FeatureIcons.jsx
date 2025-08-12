import { motion, useReducedMotion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Feature icons for the landing page features section
 */

// Chat icon for the pet chat feature
export function ChatIcon({ className = '', animate = true }) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 1,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={`relative rounded-full bg-primary/10 p-4 ${className}`}>
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-primary"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.path 
          variants={animate ? pathVariants : {}}
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
        />
      </motion.svg>
    </div>
  );
}

// Health icon for the symptom checker feature
export function HealthIcon({ className = '', animate = true }) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 1,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={`relative rounded-full bg-accent/10 p-4 ${className}`}>
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-accent"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.path 
          variants={animate ? pathVariants : {}}
          d="M22 12h-4l-3 9L9 3l-3 9H2" 
        />
      </motion.svg>
    </div>
  );
}

// Map icon for the vet finder feature
export function MapIcon({ className = '', animate = true }) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 1,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={`relative rounded-full bg-secondary/10 p-4 ${className}`}>
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-secondary"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.path 
          variants={animate ? pathVariants : {}}
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" 
        />
        <motion.circle 
          variants={animate ? pathVariants : {}}
          cx="12" 
          cy="10" 
          r="3" 
        />
      </motion.svg>
    </div>
  );
}

// Document icon for the file upload feature
export function DocumentIcon({ className = '', animate = true }) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 1,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={`relative rounded-full bg-primary/10 p-4 ${className}`}>
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-primary"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.path 
          variants={animate ? pathVariants : {}}
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
        />
        <motion.polyline 
          variants={animate ? pathVariants : {}}
          points="14 2 14 8 20 8" 
        />
        <motion.line 
          variants={animate ? pathVariants : {}}
          x1="16" 
          y1="13" 
          x2="8" 
          y2="13" 
        />
        <motion.line 
          variants={animate ? pathVariants : {}}
          x1="16" 
          y1="17" 
          x2="8" 
          y2="17" 
        />
        <motion.polyline 
          variants={animate ? pathVariants : {}}
          points="10 9 9 9 8 9" 
        />
      </motion.svg>
    </div>
  );
}

// Alert icon for the emergency feature
export function AlertIcon({ className = '', animate = true }) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 1,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={`relative rounded-full bg-danger/10 p-4 ${className}`}>
      <motion.svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-danger"
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.path 
          variants={animate ? pathVariants : {}}
          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" 
        />
        <motion.line 
          variants={animate ? pathVariants : {}}
          x1="12" 
          y1="9" 
          x2="12" 
          y2="13" 
        />
        <motion.line 
          variants={animate ? pathVariants : {}}
          x1="12" 
          y1="17" 
          x2="12.01" 
          y2="17" 
        />
      </motion.svg>
    </div>
  );
}

// Props for all icons
const iconPropTypes = {
  className: PropTypes.string,
  animate: PropTypes.bool
};

ChatIcon.propTypes = iconPropTypes;
HealthIcon.propTypes = iconPropTypes;
MapIcon.propTypes = iconPropTypes;
DocumentIcon.propTypes = iconPropTypes;
AlertIcon.propTypes = iconPropTypes;
