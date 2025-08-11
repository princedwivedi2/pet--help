import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PetIcon from '../components/PetIcon';

const petReactions = [
  '😺', '🐶', '🐾', '❤️', '🎉', '😻', '🐕', '🐈',
];

// Staggered animation for new messages
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help your pet today?', from: 'pet' },
  ]);
  const [input, setInput] = useState('');
  const [reaction, setReaction] = useState(null);
  const [petMood, setPetMood] = useState('idle');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: 'user' }]);
    setInput('');
    // Random pet reaction
    const randomReaction = petReactions[Math.floor(Math.random() * petReactions.length)];
    setReaction(randomReaction);
    setPetMood('happy');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Thanks for sharing! I\'m processing that information to help your pet.', 
        from: 'pet' 
      }]);
    }, 1000);
    
    setTimeout(() => {
      setReaction(null);
      setPetMood('idle');
    }, 2000);
  };

  return (
    <motion.section 
      className="min-h-screen flex flex-col items-center py-8 px-2"
      style={{
        background: 'linear-gradient(135deg, #FFF8F3 0%, #FDF6F0 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-lg bg-white rounded-xl shadow-elevated p-6 flex flex-col gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10 }}
      >
        <div className="flex items-center gap-3 mb-2 pb-3 border-b border-accent/20">
          <PetIcon animate={true} mood={petMood} />
          <AnimatePresence>
            {reaction && (
              <motion.span
                className="text-3xl ml-2"
                initial={{ scale: 0, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {reaction}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="font-heading text-responsive-lg text-primary">PetBot</span>
        </div>
        
        <motion.div 
          className="flex-1 min-h-[280px] max-h-80 overflow-y-auto space-y-3 p-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ 
                opacity: 0,
                x: msg.from === 'user' ? 20 : -20 
              }}
              animate={{ 
                opacity: 1,
                x: 0 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 120,
                damping: 12 
              }}
            >
              <div 
                className={`
                  px-4 py-2 max-w-[80%] 
                  ${msg.from === 'user' 
                    ? 'bg-primary-gradient text-white rounded-t-lg rounded-bl-lg rounded-br-md shadow-glow' 
                    : 'bg-accent-gradient text-secondary rounded-t-lg rounded-br-lg rounded-bl-md shadow-glow-accent'}
                  reduced-motion
                `}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </motion.div>
        
        <motion.div 
          className="flex gap-2 mt-4 glassmorphism p-2 rounded-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <input
            className="flex-1 rounded-full border-none bg-transparent px-4 py-2 
                     focus:ring-2 focus:ring-primary-light focus:outline-none
                     placeholder:text-secondary/50"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <motion.button
            className="rounded-full bg-primary-gradient text-white px-6 py-2 font-bold shadow-elevated"
            onClick={sendMessage}
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(247, 108, 108, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
