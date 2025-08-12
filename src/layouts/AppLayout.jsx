import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import PawLoader from '../components/PawLoader';
import { useState, useEffect } from 'react';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Fetching a paw-sitive answer...");
  const creatorName = "Prince Dwivedi";
  const creatorTitle = "Pet Enthusiast & Developer";
  
  // Loading effect when navigating between pages
  useEffect(() => {
    const messages = [
      "Fetching a paw-sitive answer... 🐾",
      "Calling all paws and claws...",
      "Getting our furry facts together...",
      "Gathering pet wisdom...",
      "Warming up some pet care advice...",
      "Sniffing out the best information..."
    ];
    
    // Track navigation with a unique key for each path
    const navigationKey = `navigation-${location.pathname}-${Date.now()}`;
    sessionStorage.setItem('last-navigation', navigationKey);
    
    setShowLoader(true);
    setLoadingMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    const timer = setTimeout(() => {
      // Only hide loader if this is still the latest navigation
      if (sessionStorage.getItem('last-navigation') === navigationKey) {
        setShowLoader(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Define navigation pages
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Symptoms', path: '/symptoms' },
    { name: 'Vet Finder', path: '/vets' },
    { name: 'Files', path: '/files' }
  ];
  
  // Determine active page based on current location
  const activePage = pages.findIndex(p => p.path === location.pathname);
  
  // Handle page navigation
  const handlePageChange = (index) => {
    navigate(pages[index].path);
  };
  
  // Handle emergency button click
  const handleEmergencyClick = () => {
    // If you have an emergency page, navigate to it
    navigate('/emergency');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Decorative background – no interactions */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-rose-50 opacity-60"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-40 right-[10%] w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-[10%] w-64 h-64 bg-amber-200/5 rounded-full filter blur-3xl"></div>
      </div>

      <Header 
        pages={pages} 
        onEmergencyClick={handleEmergencyClick}
        className="relative z-50" 
      />
      
      {/* Loading overlay */}
      <AnimatePresence>
        {showLoader && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-40"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="text-center px-6 py-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <PawLoader message={loadingMessage} size="lg" showMessage={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative z-10 flex-grow">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      
      {/* Footer with creator info */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-sm border-t border-gray-100 py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className="text-red-500 text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.8 }}
              >
                ❤️
              </motion.span>
              <span className="text-sm text-gray-600">Made with love by </span>
              <Link 
                to="/about" 
                className="text-sm font-medium text-primary hover:underline"
              >
                {creatorName}
              </Link>
            </motion.div>
          </div>
          
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://portfolio.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <span className="sr-only">Portfolio</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.935v2.131l-12 8.954-12-8.954v-2.131l12 8.954 12-8.954zm0-2.935l-12 8.954-12-8.954 12-8.954 12 8.954z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
