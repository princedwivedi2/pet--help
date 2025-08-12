import React, { createContext, useState, useContext, useEffect } from 'react';

// Define available themes
const themes = {
  light: {
    name: 'light',
    background: 'bg-white',
    text: 'text-gray-900',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
  },
  dark: {
    name: 'dark',
    background: 'bg-gray-900',
    text: 'text-white',
    primary: 'bg-primary-dark',
    secondary: 'bg-secondary-dark',
    accent: 'bg-accent-dark',
  },
};

// Create the context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has a saved theme preference or use system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light'; // Default theme
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  // Update theme in localStorage and apply classes when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('theme-light', 'theme-dark');
    
    // Add new theme class
    root.classList.add(`theme-${currentTheme}`);
    
    // Save to localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Get current theme object
  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
