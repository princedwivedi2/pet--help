import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Reusable Chip component for tags, statuses, and category labels
 * 
 * @param {Object} props - Component props
 * @param {'default'|'success'|'danger'|'accent'} props.variant - Color variant
 * @param {React.ReactNode} props.children - Chip content
 * @param {React.ReactNode} props.icon - Optional icon to show
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.dismissible - Whether the chip can be dismissed
 * @param {Function} props.onDismiss - Function called when dismissed
 */
export default function Chip({
  variant = 'default',
  children,
  icon,
  className = '',
  dismissible = false,
  onDismiss,
  ...props
}) {
  // Variant styles
  const variantStyles = {
    default: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    accent: 'bg-accent/10 text-accent'
  };
  
  return (
    <motion.span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-1.5 hover:opacity-80 focus:outline-none"
          aria-label="Dismiss"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </motion.span>
  );
}

Chip.propTypes = {
  variant: PropTypes.oneOf(['default', 'success', 'danger', 'accent']),
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
};
