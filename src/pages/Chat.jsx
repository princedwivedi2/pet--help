import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section, Button, Chip, Avatar, Tooltip } from '../components/ui';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import PetReaction from '../components/chat/PetReaction';
import useChat from '../hooks/useChat';

export default function Chat() {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    error, 
    clearChat, 
    transcriptRef 
  } = useChat();
  
  const [input, setInput] = useState('');
  const [petMood, setPetMood] = useState('idle');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Debug: log messages when they change
  useEffect(() => {
    console.log("Chat messages updated:", messages);
  }, [messages]);
  
  // Add a debug message to help users
  useEffect(() => {
    if (messages.length === 0) {
      console.log("Chat is ready. Type a message to start chatting!");
    }
  }, [messages.length]);

  // Update pet mood based on conversation context
  useEffect(() => {
    if (isLoading) {
      setPetMood('thinking');
      return;
    }
    
    // If there's an error, show alert mood
    if (error) {
      setPetMood('alert');
      return;
    }
    
    // If there are no messages, stay idle
    if (messages.length === 0) {
      setPetMood('idle');
      return;
    }
    
    // Check last message to set appropriate mood
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage.role === 'user') {
      setPetMood('thinking');
    } else {
      // Set happy mood briefly then return to idle
      setPetMood('happy');
      const timer = setTimeout(() => setPetMood('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading, error]);

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = (text) => {
    console.log("Sending message:", text);
    if (!text || !text.trim()) {
      console.warn("Attempted to send empty message");
      return;
    }
    
    sendMessage(text);
    setInput('');
  };

  // Handle clear chat confirmation
  const handleClearChat = () => {
    setShowClearConfirm(false);
    clearChat();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.section 
      className="min-h-screen flex flex-col items-center py-8 px-4 relative"
      style={{
        background: 'radial-gradient(circle at top right, rgba(255, 207, 175, 0.3), transparent 40%), radial-gradient(circle at bottom left, rgba(204, 235, 255, 0.4), transparent 40%), linear-gradient(135deg, #FFF8F3 0%, #FDF6F0 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-primary/5 filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-40 h-40 rounded-full bg-accent/5 filter blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <Section className="w-full max-w-2xl relative z-10">
        <motion.div 
          className="bg-white/90 glassmorphism shadow-elevated rounded-2xl overflow-hidden border border-white/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        >
          {/* Header with pet */}
          <motion.div 
            className="flex items-center justify-between px-6 py-4 border-b border-accent/20 bg-gradient-to-r from-primary/5 to-accent/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <PetReaction mood={petMood} className="shadow-lg" />
              </motion.div>
              <div>
                <motion.h2 
                  className="font-heading text-xl text-primary font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  PetBot Assistant
                </motion.h2>
                <motion.p
                  className="text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {petMood === 'thinking' ? 'Thinking...' : 
                   petMood === 'happy' ? 'Happy to help!' : 
                   petMood === 'alert' ? 'Attention needed' : 'Ready to assist'}
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tooltip content="New conversation">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => clearChat()}
                  aria-label="New conversation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Button>
              </Tooltip>
              <Tooltip content="Clear conversation">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowClearConfirm(true)}
                  aria-label="Clear conversation"
                >
                  <span className="sr-only">Clear conversation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Tooltip>
            </div>
          </motion.div>
          
          {/* Message transcript */}
          <div 
            ref={transcriptRef}
            className="flex-1 min-h-[400px] max-h-[65vh] overflow-y-auto p-4 space-y-4 bg-pattern-paws"
            style={{
              backgroundSize: "150px",
              backgroundOpacity: "0.03"
            }}
          >
            {messages.length === 0 ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5
                  }}
                  className="mb-6 transform"
                >
                  <PetReaction mood="idle" className="p-3 scale-125 shadow-lg" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-heading text-primary mb-2 font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Welcome to Pet Help!
                </motion.h3>
                
                <motion.p 
                  className="text-secondary mb-8 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  I'm your AI pet care assistant. Ask me anything about pet care, health concerns, or emergency situations.
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.8
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {[
                    {
                      text: "What should I do if my dog is vomiting?",
                      icon: "🤢"
                    },
                    {
                      text: "My cat isn't eating, what should I do?",
                      icon: "🍽️"
                    },
                    {
                      text: "How do I trim my pet's nails?",
                      icon: "✂️"
                    },
                    {
                      text: "What human foods are toxic to pets?",
                      icon: "☠️"
                    }
                  ].map((suggestion, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      <Chip 
                        onClick={() => {
                          setInput(suggestion.text);
                          // Focus on input after selecting a suggestion
                          setTimeout(() => {
                            document.getElementById('chat-input')?.focus();
                          }, 100);
                        }}
                        className="cursor-pointer flex items-center gap-2 py-3 px-4 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <span className="text-lg">{suggestion.icon}</span> {suggestion.text}
                      </Chip>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6 py-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.12,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                {messages.length > 0 && messages.map((message, index) => (
                  <motion.div 
                    key={index} 
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: 20,
                        x: message.role === 'user' ? 10 : -10 
                      },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 120,
                          damping: 14
                        }
                      }
                    }}
                    className={`${index > 0 && 'mt-6'}`}
                  >
                    <ChatMessage
                      role={message.role || (index % 2 === 0 ? 'user' : 'assistant')}
                      content={message.content || 'Message content unavailable'}
                      time={message.time}
                      isLast={index === messages.length - 1}
                      avatar={message.role === 'assistant' ? (
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <PetReaction mood={index === messages.length - 1 && message.role === 'assistant' ? petMood : 'idle'} />
                        </motion.div>
                      ) : undefined}
                      className={`${message.role === 'assistant' ? 'shadow-lg' : 'shadow-md'} hover:shadow-xl transition-shadow duration-300`}
                    />
                  </motion.div>
                ))}
                
                {/* Show typing indicator when loading */}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-12"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8">
                        <PetReaction mood="thinking" size="sm" />
                      </div>
                      <TypingIndicator className="shadow-md" />
                    </div>
                  </motion.div>
                )}
                
                {/* Show error message if any */}
                {error && (
                  <motion.div 
                    className="bg-danger/10 border border-danger/30 text-danger rounded-xl p-4 my-4 shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl mt-1">⚠️</div>
                      <div>
                        <h4 className="font-medium mb-1">Sorry, something went wrong</h4>
                        <p className="text-sm opacity-90">{error}</p>
                        <div className="mt-3 flex gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => sendMessage(messages[messages.length - 1]?.content || '')}
                          >
                            Try again
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.location.reload()}
                          >
                            Refresh page
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
          
          {/* Input area */}
          <motion.div 
            className="border-t border-accent/20 p-4 bg-white/90 backdrop-blur-sm"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 15 }}
          >
            <ChatInput
              value={input}
              onChange={handleInputChange}
              onSend={handleSendMessage}
              disabled={showClearConfirm}
              isLoading={isLoading}
              className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
              placeholder="Ask anything about your pet..."
              id="chat-input"
            />
            <div className="flex items-center justify-between mt-2 px-1">
              <p className="text-xs text-tertiary">Press Enter to send</p>
              <motion.div 
                className="text-xs text-tertiary flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.8 }}
                  className="text-red-500 text-sm"
                >❤️</motion.span> 
                <span>Powered by AI Pet Assistant</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Clear chat confirmation modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-elevated p-6 max-w-md w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-xl font-heading mb-2">Clear conversation?</h3>
                <p className="text-secondary mb-6">
                  This will delete all messages in this conversation. This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={handleClearChat}
                  >
                    Clear conversation
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </motion.section>
  );
}
