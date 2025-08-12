import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Avatar component for displaying user or entity images
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} props.size - Avatar size (xs, sm, md, lg, xl)
 * @param {string} props.status - Status indicator (online, away, busy, offline)
 * @param {string} props.variant - Avatar variant (circle, rounded)
 * @param {string} props.initials - Initials to display when no image is available
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Avatar component
 */
export default function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  status,
  variant = 'circle',
  initials,
  className = '',
  ...props
}) {
  // Size styles
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-xl',
  };
  
  // Status styles
  const statusStyles = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400',
  };
  
  // Status size based on avatar size
  const statusSizeStyles = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };
  
  // Variant styles
  const variantStyles = {
    circle: 'rounded-full',
    rounded: 'rounded-md',
  };
  
  // Initial background color based on provided initials
  const getInitialBackground = () => {
    if (!initials) return 'bg-primary';
    
    // Use a simple hash of the initials to pick a color
    const colors = [
      'bg-primary', 'bg-secondary', 'bg-accent', 
      'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const hasImage = Boolean(src);
  
  return (
    <motion.div
      className={`relative inline-flex flex-shrink-0 ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Avatar image or initials */}
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className={`
            object-cover
            ${sizeStyles[size]}
            ${variantStyles[variant]}
          `}
        />
      ) : (
        <div
          className={`
            flex items-center justify-center text-white font-medium
            ${getInitialBackground()}
            ${sizeStyles[size]}
            ${variantStyles[variant]}
          `}
          aria-label={alt}
        >
          {initials || '?'}
        </div>
      )}
      
      {/* Status indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4
            border-2 border-white
            ${statusStyles[status]}
            ${statusSizeStyles[size]}
            ${variantStyles[variant]}
          `}
          role="status"
          aria-label={`Status: ${status}`}
        />
      )}
    </motion.div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  status: PropTypes.oneOf(['online', 'away', 'busy', 'offline']),
  variant: PropTypes.oneOf(['circle', 'rounded']),
  initials: PropTypes.string,
  className: PropTypes.string,
};
