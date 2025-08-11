import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PetIcon from '../components/PetIcon';
import { animations } from '../utils/theme';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const petIconControls = useAnimationControls();
  const sectionRef = useRef(null);
  const featureRefs = [useRef(null), useRef(null), useRef(null)];
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const featureIntersections = featureRefs.map(ref => 
    useIntersectionObserver(ref, { threshold: 0.1, rootMargin: '-100px' })
  );
  
  // Animation variants for staggered animations
  const containerVariants = animations.stagger.container;
  const itemVariants = animations.stagger.item;

  // Wait for hydration before showing animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      petIconControls.start({ 
        scale: 1, 
        opacity: 1, 
        transition: { type: 'spring', stiffness: 80, damping: 12 } 
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [petIconControls]);

  // Hero section with fixed height to prevent layout shift
  return (
    <div className="overflow-visible">
      {/* Hero Section */}
      <motion.section 
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-visible"
        style={{
          background: 'linear-gradient(135deg, #FFF8F3 0%, #FDF6F0 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorative elements */}
        <motion.div className="absolute top-40 left-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
        <motion.div className="absolute bottom-40 right-10 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <motion.div
          className="mb-8 reduced-motion relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={petIconControls}
        >
          <div className="relative">
            <PetIcon mood="idle" className="w-32 h-32 md:w-40 md:h-40" />
            
            {/* Floating effect decoration */}
            <motion.div 
              className="absolute -inset-4 rounded-full bg-primary/5 -z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="flex flex-col items-center reduced-motion relative z-10 max-w-xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-responsive-2xl md:text-responsive-3xl font-bold gradient-text mb-4 text-center drop-shadow-soft"
          >
            Welcome to Pet Help
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-secondary text-responsive-base text-center max-w-xl mb-8"
          >
            Your friendly AI-powered assistant for pet care, vet finding, and emergency help.
          </motion.p>
          
          <motion.a
            variants={itemVariants}
            href="#chat"
            className="px-8 py-3 rounded-full font-bold shadow-elevated
                      bg-primary-gradient text-white hover:shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Chatting
          </motion.a>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path 
              d="M12 5V19M12 19L5 12M12 19L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Everything your pet needs
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto">
              From health checks to finding the best vet, we've got you covered with these amazing features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              ref={featureRefs[0]}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={featureIntersections[0] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="feature-icon bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="feature-title">Smart Pet Chat</h3>
              <p className="feature-description">
                Get instant answers to your pet care questions with our AI-powered assistant
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              ref={featureRefs[1]}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={featureIntersections[1] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="feature-icon bg-accent/10 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="feature-title">Health Symptom Checker</h3>
              <p className="feature-description">
                Identify potential health issues and receive care recommendations
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              ref={featureRefs[2]}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={featureIntersections[2] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="feature-icon bg-secondary/10 text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Vet Finder</h3>
              <p className="feature-description">
                Locate the nearest veterinarians with ratings, hours and contact information
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
