import { useState, useEffect, useRef, useCallback } from 'react';
import { respond } from '../lib/chatClient';

const STORAGE_KEY = 'pethelp.chat.v1';

/**
 * Detects the emotion in a message based on content analysis
 * @param {string} content - The message content to analyze
 * @returns {string} - The detected emotion (happy, concerned, thoughtful)
 */
function detectEmotion(content) {
  if (!content) return '';
  
  const lowerContent = content.toLowerCase();
  
  // Check for emergency or concerning content
  if (
    lowerContent.includes('emergency') || 
    lowerContent.includes('immediately') || 
    lowerContent.includes('urgent') ||
    lowerContent.includes('danger') ||
    lowerContent.includes('warning') ||
    lowerContent.includes('⚠️')
  ) {
    return 'concerned';
  }
  
  // Check for positive/happy content
  if (
    lowerContent.includes('great') || 
    lowerContent.includes('excellent') || 
    lowerContent.includes('perfect') ||
    lowerContent.includes('happy') ||
    lowerContent.includes('healthy') ||
    lowerContent.includes('congratulations')
  ) {
    return 'happy';
  }
  
  // Default to thoughtful for informational responses
  return 'thoughtful';
}

/**
 * Custom hook to manage chat state and interactions
 * 
 * @returns {Object} Chat state and methods
 */
export default function useChat() {
  const [messages, setMessages] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 
    }
    catch { 
      return []; 
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const controllerRef = useRef(null);
  const transcriptRef = useRef(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom of transcript when messages change
  useEffect(() => {
    if (transcriptRef.current && messages.length > 0) {
      const transcript = transcriptRef.current;
      
      // Use smooth scrolling with respect to reduced motion preferences
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const behavior = mediaQuery.matches ? 'auto' : 'smooth';
      
      transcript.scrollTo({
        top: transcript.scrollHeight,
        behavior
      });
    }
  }, [messages]);

  // Clear all messages
  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);
  }, []);

  // Abort ongoing request
  const abort = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  // Send a new message
  const sendMessage = useCallback(async (text) => {
    if (!text?.trim() || isLoading) return;
    
    setError('');
    
    // Create a timestamp for the message
    const timestamp = new Date();
    
    // Create the new user message
    const userMessage = {
      role: 'user',
      content: text.trim(),
      time: timestamp.toISOString()
    };
    
    // Update messages with the user message - using functional update to ensure we have latest state
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, userMessage];
      // Immediately save to localStorage to preserve state across page navigations
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
      return updatedMessages;
    });
    
    setIsLoading(true);
    controllerRef.current = new AbortController();
    
    try {
      console.log("Sending message:", text);
      
      // Get the current messages to send to the API
      const currentMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      
      // Get the assistant response
      const reply = await respond(currentMessages, controllerRef.current.signal);
      console.log("Received response:", reply);
      
      // Add response to messages
      if (reply?.content) {
        // Add timestamp and emotion to the response
        const emotion = detectEmotion(reply.content);
        const assistantMessage = {
          ...reply,
          emotion,
          time: new Date().toISOString()
        };
        console.log("Adding assistant response:", assistantMessage);
        
        // Use functional update to ensure we have the latest state
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages, assistantMessage];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Chat error:', err);
        setError('Could not get a response. Try again.');
        
        // Add error message to chat for better user experience
        setMessages(prevMessages => {
          const errorMessage = {
            role: 'assistant',
            content: "I'm sorry, I encountered an error while processing your request. Please try again or refresh the page if the problem persists.",
            emotion: 'concerned',
            time: new Date().toISOString(),
            isError: true
          };
          const updatedMessages = [...prevMessages, errorMessage];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      }
    } finally {
      setIsLoading(false);
      controllerRef.current = null;
    }
  }, [messages, abort]);

  // Return the hook interface
  return {
    messages,
    sendMessage,
    isLoading,
    error,
    abort,
    clear: clearChat,
    transcriptRef
  };
}
