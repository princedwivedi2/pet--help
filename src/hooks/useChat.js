import { useState, useEffect, useRef, useCallback } from 'react';
import { respond } from '../lib/chatClient';

const STORAGE_KEY = 'pethelp.chat.v1';

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
    
    // Update messages with the user message
    const next = [...messages, userMessage];
    setMessages(next);
    setIsLoading(true);
    
    controllerRef.current = new AbortController();
    
    try {
      console.log("Sending message:", text);
      
      // Get the assistant response using the next array which includes the user message
      const reply = await respond(next, controllerRef.current.signal);
      console.log("Received response:", reply);
      
      // Add response to messages
      if (reply?.content) {
        // Add timestamp to the response
        const assistantMessage = {
          ...reply,
          time: new Date().toISOString()
        };
        console.log("Adding assistant response:", assistantMessage);
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Chat error:', err);
        setError('Could not get a response. Try again.');
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
