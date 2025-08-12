import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Button from './Button';

/**
 * Empty state component for placeholder pages or sections
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Main message to display
 * @param {string} props.description - Detailed explanation
 * @param {React.ReactNode} props.illustration - Visual element to display
 * @param {string} props.actionLabel - Text for the action button
 * @param {Function} props.onAction - Function to call when action button is clicked
 * @param {string} props.className - Additional CSS classes
 */
export default function EmptyState({
  title,
  description,
  illustration,
  actionLabel,
  onAction,
  className = '',
  ...props
}) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {illustration && (
        <div className="mb-6 reduced-motion">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut" 
            }}
          >
            {illustration}
          </motion.div>
        </div>
      )}
      
      {title && (
        <h3 className="text-xl md:text-2xl font-heading font-semibold mb-2">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-secondary max-w-md mb-8">
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  illustration: PropTypes.node,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string
};
