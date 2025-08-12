import PropTypes from 'prop-types';

/**
 * Reusable Section component for consistent page layout
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.bg - Background color or gradient
 * @param {string} props.id - Section ID for navigation/anchoring
 * @param {boolean} props.fullWidth - Whether to use full width or constrained container
 */
export default function Section({
  children,
  className = '',
  bg = '',
  id,
  fullWidth = false,
  ...props
}) {
  // Determine background styles
  const bgStyles = {};
  
  if (bg) {
    if (bg.startsWith('bg-')) {
      // If it's a Tailwind class
      className = `${className} ${bg}`;
    } else if (bg.includes('gradient') || bg.includes('rgb') || bg.includes('#')) {
      // If it's a CSS value (gradient or color)
      bgStyles.background = bg;
    }
  }
  
  return (
    <section
      id={id}
      className={`py-16 md:py-24 px-4 relative overflow-visible ${className}`}
      style={bgStyles}
      {...props}
    >
      <div className={fullWidth ? 'w-full' : 'container max-w-7xl mx-auto'}>
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
  id: PropTypes.string,
  fullWidth: PropTypes.bool
};
