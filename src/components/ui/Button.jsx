import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Reusable Button component with multiple variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {'primary'|'secondary'|'outline'|'danger'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.type - Button type (submit, button, reset)
 * @param {string} props.ariaLabel - Accessible label for the button
 * @param {React.ElementType} props.as - Element type to render as (e.g. Link)
 * @param {string} props.to - Destination path when used with Link
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ariaLabel,
  as: Component = 'button',
  to,
  ...props
}) {
  // Base classes for all buttons
  const baseClasses = "font-medium rounded-full inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5",
    lg: "px-8 py-3 text-lg"
  };
  
  // Variant classes - using theme colors from tailwind config with improved accessibility
  const variantClasses = {
    primary: "bg-primary text-white shadow-button hover:shadow-glow focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none",
    secondary: "bg-secondary text-white shadow-button hover:bg-secondary/90 focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:outline-none",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none",
    danger: "bg-danger text-white shadow-button hover:bg-danger/90 focus:ring-2 focus:ring-offset-2 focus:ring-danger focus:outline-none",
  };
  
  // Animation settings - disable if user prefers reduced motion
  const animationProps = {
    whileHover: { scale: disabled ? 1 : 1.03 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
    className: `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className} reduced-motion`
  };

  // Special handling for Link component
  if (Component === Link) {
    return (
      <motion.div
        {...animationProps}
        style={{ position: 'relative' }}
      >
        <Link
          to={to}
          onClick={onClick}
          aria-label={ariaLabel}
          style={{ 
            display: 'flex', 
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10  // Ensure the link is clickable
          }}
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  // Custom component rendering
  if (Component !== 'button') {
    return (
      <motion.div {...animationProps}>
        <Component 
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </Component>
      </motion.div>
    );
  }

  // Default button rendering with enhanced accessibility
  return (
    <motion.button
      type={type}
      onClick={onClick}
      style={{ position: 'relative' }}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      role="button"
      {...animationProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  ariaLabel: PropTypes.string,
  as: PropTypes.elementType,
  to: PropTypes.string
};
