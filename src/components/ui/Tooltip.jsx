import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

/**
 * Tooltip component for displaying additional information on hover
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The element that triggers the tooltip
 * @param {string} props.content - Tooltip content text
 * @param {string} props.position - Tooltip position (top, right, bottom, left)
 * @param {string} props.variant - Tooltip variant (light, dark)
 * @param {string} props.className - Additional CSS classes for tooltip container
 * @returns {JSX.Element} - Tooltip component
 */
export default function Tooltip({
  children,
  content,
  position = 'top',
  variant = 'dark',
  className = '',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleFocus = useCallback(() => setIsVisible(true), []);
  const handleBlur = useCallback(() => setIsVisible(false), []);
  
  // Position styles
  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };
  
  // Arrow styles based on position
  const arrowStyles = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-0',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-0',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-0',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-0',
  };
  
  // Variant styles
  const variantStyles = {
    dark: 'bg-gray-800 text-white',
    light: 'bg-white text-gray-800 border border-gray-200',
  };
  
  const arrowColorStyles = {
    dark: 'border-gray-800',
    light: 'border-gray-200',
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
      
      {isVisible && content && (
        <motion.div 
          role="tooltip"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={`
            absolute z-50 px-2 py-1 text-sm font-medium rounded shadow-md
            whitespace-nowrap pointer-events-none
            ${positionStyles[position]} 
            ${variantStyles[variant]}
          `}
        >
          {content}
          <div 
            className={`
              absolute w-0 h-0 border-4
              ${arrowStyles[position]} 
              ${arrowColorStyles[variant]}
            `}
          />
        </motion.div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  variant: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
};
