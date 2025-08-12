import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Accessible Modal component with focus trap and keyboard navigation
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal should close
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.className - Additional CSS classes for the modal content
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '',
  ...props 
}) {
  const modalRef = useRef(null);
  const prevFocusedElement = useRef(null);
  
  // Handle keyboard navigation and focus trap
  useEffect(() => {
    if (!isOpen) return;
    
    // Store the previously focused element to restore focus later
    prevFocusedElement.current = document.activeElement;
    
    // Focus the modal
    if (modalRef.current) {
      setTimeout(() => {
        modalRef.current.focus();
      }, 10);
    }
    
    // Handle ESC key to close the modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Focus trap - keep focus inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      
      // Restore focus to the previous element
      if (prevFocusedElement.current) {
        prevFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);
  
  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            className={`glassmorphism bg-white/90 rounded-2xl shadow-elevated max-w-lg w-full max-h-[90vh] overflow-auto focus:outline-none ${className}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            tabIndex={-1}
            {...props}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-heading font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Use a portal to render the modal outside the DOM hierarchy
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : null;
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
