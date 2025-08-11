import { motion } from 'framer-motion';
import PetIcon from './PetIcon';

export default function AlertOverlay({ show, onClose }) {
  if (!show) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-danger/90 reduced-motion backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="animate-shake reduced-motion"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          scale: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
        }}
      >
        <PetIcon mood="alert" className="w-32 h-32" />
      </motion.div>
      
      <motion.h2 
        className="text-white text-responsive-2xl font-heading mt-6 mb-2 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Emergency Alert!
      </motion.h2>
      
      <motion.p
        className="text-white text-responsive-base text-center max-w-md px-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Please seek immediate veterinary assistance
      </motion.p>
      
      <motion.button
        className="mt-4 px-8 py-3 rounded-full bg-white text-danger font-bold shadow-elevated hover:shadow-glow transition-all"
        onClick={onClose}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Dismiss
      </motion.button>
    </motion.div>
  );
}
