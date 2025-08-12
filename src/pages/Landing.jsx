import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Section, ScrollIndicator } from '../components/ui';
import { 
  PetHeroIllustration,
  ChatIcon, 
  HealthIcon, 
  MapIcon, 
  DocumentIcon, 
  AlertIcon 
} from '../components/illustrations';

import PageTransition from '../components/PageTransition';

export default function Landing() {
  const navigate = useNavigate();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Feature cards data
  const features = [
    {
      title: "Caring Companion Chat",
      description: "Our AI assistant listens and responds with the warmth and understanding your pet deserves, providing guidance that feels like talking to a fellow pet lover.",
      icon: <ChatIcon />,
      link: "/chat",
      color: "primary"
    },
    {
      title: "Gentle Health Guardian",
      description: "When your furry friend isn't feeling their best, our symptom checker helps ease your worries with compassionate guidance and next steps.",
      icon: <HealthIcon />,
      link: "/symptom-checker",
      color: "accent"
    },
    {
      title: "Trusted Vet Matchmaker",
      description: "Find a veterinarian who will love your pet almost as much as you do, with carefully curated recommendations based on care quality and compassion.",
      icon: <MapIcon />,
      link: "/vet-finder",
      color: "secondary"
    },
    {
      title: "Memory Keeper",
      description: "Preserve your pet's health journey with love and care, keeping their important medical milestones organized and accessible whenever needed.",
      icon: <DocumentIcon />,
      link: "/records",
      color: "primary"
    },
    {
      title: "Calming Crisis Support",
      description: "In scary moments, we're here with a steady hand to guide you through emergencies with clear, reassuring steps and immediate vet access.",
      icon: <AlertIcon />,
      link: "/emergency",
      color: "danger"
    }
  ];

  return (
    <PageTransition type="fade">
      <main className="overflow-visible">
        {/* Hero Section */}
      <Section 
        className="min-h-screen flex flex-col items-center justify-center py-16 md:py-24 relative overflow-hidden" 
        fullWidth
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(245,247,250,0.9) 100%)"
        }}
      >
        {/* Background decorative elements - with pointer-events-none */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Hero content */}
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span 
                className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Because every pet deserves the best care 🐾
              </motion.span>
              
              <motion.h1 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 drop-shadow-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Your Furry Family Deserves <span className="gradient-text">The Best Care</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                We understand the special bond you share with your pets. Our AI-powered platform is designed with love to keep your companions happy and healthy.
              </motion.p>
              
              <motion.p
                className="text-lg text-primary/90 italic mb-8 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                "Because the love between you and your pet is something truly special, and we're here to help you nurture it."
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Button 
                  onClick={() => navigate('/chat')}
                  className="relative z-10"
                  size="lg"
                >
                  Start Chat
                </Button>
                <Link 
                  to="/about" 
                  className="relative z-10 inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Hero illustration */}
            <PetHeroIllustration className="w-full max-w-md md:max-w-lg" />
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ScrollIndicator targetId="features" />
          </div>
        </div>
      </Section>
      
      {/* Features Section */}
      <Section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 font-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Supporting Your Journey Together
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Every feature is designed with both you and your pet in mind, creating moments of joy and peace of mind throughout your shared journey.
            </motion.p>
            <motion.p 
              className="text-lg text-primary/90 italic mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Because your pet's happiness reflects in your smile
            </motion.p>
          </div>
          
          {/* Features grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  as={Link}
                  to={feature.link}
                  className="h-full transition-transform duration-300 hover:scale-105"
                  icon={feature.icon}
                  title={feature.title}
                >
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Creator Section */}
      <Section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full md:w-1/3">
              <motion.div 
                className="relative w-72 h-72 mx-auto overflow-hidden rounded-full border-4 border-primary/20 shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full md:w-2/3"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold font-heading mb-4">Meet the Creator</h2>
              <h3 className="text-xl text-primary font-medium mb-4">Prince Dwivedi - Pet Enthusiast & Developer</h3>
              <p className="text-gray-600 mb-6">
                As both a devoted pet parent and passionate developer, I created Pet Help to bridge the gap between technology and pet care. 
                My journey began when my own furry companion faced health issues, and I struggled to find reliable information quickly.
              </p>
              <p className="text-gray-600 mb-6">
                Pet Help is built with love, understanding that our pets are family members who deserve the best care possible. 
                Every feature has been thoughtfully designed to provide peace of mind to pet parents everywhere.
              </p>
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://portfolio.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                  <span className="sr-only">Portfolio</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 10.935v2.131l-12 8.954-12-8.954v-2.131l12 8.954 12-8.954zm0-2.935l-12 8.954-12-8.954 12-8.954 12 8.954z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section 
        className="py-20 bg-gray-50"
        style={{
          background: "linear-gradient(135deg, rgba(245,247,250,0.9) 0%, rgba(255,255,255,0.8) 100%)"
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="bg-white rounded-3xl shadow-elevated p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 font-heading"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Your Pet's Happiness Starts Here
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Join our community of caring pet parents who understand that pets aren't just animals—they're family. Get trusted guidance, emergency support, and everyday care tips tailored to your furry companion's needs.
              </motion.p>
              <motion.p 
                className="text-lg text-primary/90 italic mb-8 font-light max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Because every wag, purr, and playful moment matters.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Button as={Link} to="/signup" size="lg">
                  Create Free Account
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
    </PageTransition>
  );
}
