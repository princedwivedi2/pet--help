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
      title: "Smart Pet Chat",
      description: "Get instant answers to all your pet care questions through our AI-powered chat assistant.",
      icon: <ChatIcon />,
      link: "/chat",
      color: "primary"
    },
    {
      title: "Health Symptom Checker",
      description: "Quickly check your pet's symptoms and get recommendations for next steps.",
      icon: <HealthIcon />,
      link: "/symptom-checker",
      color: "accent"
    },
    {
      title: "Vet Finder",
      description: "Locate veterinary clinics near you with ratings, hours, and directions.",
      icon: <MapIcon />,
      link: "/vet-finder",
      color: "secondary"
    },
    {
      title: "Medical Records",
      description: "Upload and store your pet's medical history, vaccination records, and more.",
      icon: <DocumentIcon />,
      link: "/records",
      color: "primary"
    },
    {
      title: "Emergency Mode",
      description: "One-tap access to emergency guidance and nearest emergency vets.",
      icon: <AlertIcon />,
      link: "/emergency",
      color: "danger"
    }
  ];

  return (
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
                Your pet's wellness companion
              </motion.span>
              
              <motion.h1 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 drop-shadow-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Welcome to <span className="gradient-text">Pet Help</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Your friendly AI-powered assistant for pet care, vet finding, and emergency help.
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
              Everything your pet needs
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              From health checks to finding the best vet, we've got you covered with these amazing features
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
                Ready to give your pet the best care?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Join thousands of pet parents who trust our platform for reliable guidance, emergency support, and everyday pet care.
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
  );
}
