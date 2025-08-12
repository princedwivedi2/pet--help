import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Badge component for displaying counts or status indicators
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge variant (primary, secondary, accent, success, warning, danger)
 * @param {string} props.size - Badge size (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Badge content
 * @returns {JSX.Element} - Badge component
 */
export default function Badge({ 
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props 
}) {
  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-1.5 py-0.5 rounded',
    md: 'text-sm px-2 py-1 rounded-md',
    lg: 'text-base px-2.5 py-1 rounded-md'
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-green-500/10 text-green-600',
    warning: 'bg-yellow-500/10 text-yellow-600',
    danger: 'bg-danger/10 text-danger'
  };

  return (
    <motion.span
      className={`
        inline-block font-medium 
        ${sizeStyles[size]} 
        ${variantStyles[variant]}
        ${className}
      `}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.span>
  );
}

Badge.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
