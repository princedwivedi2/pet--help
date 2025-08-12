import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Reusable Card component with glassmorphism effect
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.icon - Icon to display in the card
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Whether the card should have hover effects
 * @param {Object} props.animate - Framer motion animation props
 */
export default function Card({ 
  title, 
  icon, 
  children, 
  className = '',
  hoverable = true,
  animate = {},
  ...props 
}) {
  const baseClasses = "glassmorphism p-6 md:p-8 rounded-2xl shadow-card";
  const hoverClasses = hoverable ? "transition-transform hover:-translate-y-1 hover:shadow-elevated" : "";
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      whileHover={hoverable ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      {...animate}
      {...props}
    >
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-lg md:text-xl font-heading font-semibold mb-3">
          {title}
        </h3>
      )}
      
      <div className={`${title || icon ? 'mt-4' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  animate: PropTypes.object,
};
