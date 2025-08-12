import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../utils/theme';

export default function Header({ 
  pages = [], 
  activePage = 0, 
  onPageChange = () => {}, 
  onEmergencyClick = () => {}, 
  className = "" 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-navbar flex justify-center pointer-events-none ${className}`}>
      <motion.nav 
        className={`
          pointer-events-auto glassmorphism-navbar px-4 py-2 my-4 mx-4 
          max-w-4xl w-full flex items-center justify-between transition-all duration-300
          ${isScrolled ? 'shadow-elevated' : 'shadow-soft'}
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 50,
          damping: 15,
          delay: 0.2
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <motion.span 
            className="text-lg md:text-xl font-heading font-bold gradient-text mr-2"
            whileHover={{ scale: 1.05 }}
          >
            Pet Help
          </motion.span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {pages.map((p, i) => (
            <motion.button
              key={p.name}
              className={`
                px-4 py-2 rounded-full font-heading text-sm transition
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${i === activePage 
                  ? 'bg-primary-gradient text-white shadow-button' 
                  : 'bg-white/50 text-secondary hover:bg-primary-light/10'}
              `}
              onClick={() => onPageChange(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {p.name}
            </motion.button>
          ))}
          <motion.button
            className="
              ml-2 px-4 py-2 rounded-full bg-danger text-white font-bold shadow-button
              focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2
            "
            onClick={onEmergencyClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Emergency
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            className="p-2 rounded-full bg-white/80 text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-20 left-4 right-4 pointer-events-auto glassmorphism p-4 shadow-elevated"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex flex-col gap-2">
              {pages.map((p, i) => (
                <motion.button
                  key={p.name}
                  className={`
                    px-4 py-3 rounded-lg font-heading text-base transition
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${i === activePage 
                      ? 'bg-primary-gradient text-white shadow-button' 
                      : 'bg-white/50 text-secondary hover:bg-primary-light/10'}
                  `}
                  onClick={() => {
                    onPageChange(i);
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {p.name}
                </motion.button>
              ))}
              <motion.button
                className="
                  mt-2 px-4 py-3 rounded-lg bg-danger text-white font-bold shadow-button
                  focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2
                "
                onClick={() => {
                  onEmergencyClick();
                  setIsMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.98 }}
              >
                Emergency
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
