import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Button } from '../ui';

/**
 * ChatInput component for sending messages
 * 
 * @param {Object} props
 * @param {string} props.value - The current input value
 * @param {Function} props.onChange - Function to call when input changes
 * @param {Function} props.onSend - Function to call when sending a message
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.isLoading - Whether a request is in progress
 * @param {number} props.maxLength - Maximum character length
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.inputId - ID for the textarea element
 * @returns {JSX.Element}
 */
export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  isLoading = false,
  maxLength = 1000,
  placeholder = "Type your message...",
  className = "",
  inputId = "chat-input",
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    // Send message on Enter (but not with Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && !isLoading) {
        console.log("Sending message via Enter key:", value);
        onSend(value);
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !disabled && !isLoading) {
      console.log("Sending message via button click:", value);
      onSend(value);
    } else {
      console.log("Send button clicked but conditions not met:", {
        hasValue: Boolean(value.trim()),
        notDisabled: !disabled,
        notLoading: !isLoading
      });
    }
  };

  const charactersRemaining = maxLength - (value?.length || 0);
  const isNearLimit = charactersRemaining < maxLength * 0.1;

  return (
    <div className={`relative bg-white shadow-card rounded-xl p-3 ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Message
      </label>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <textarea
          ref={textareaRef}
          id={inputId}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={1}
          className="w-full p-3 pr-16 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-200"
          aria-label="Chat message"
        />
      </motion.div>
      
      <div className="flex items-center justify-between px-3 mt-2">
        <motion.div 
          className={`text-xs ${isNearLimit ? 'text-danger' : 'text-gray-400'}`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ 
            repeat: isNearLimit ? Infinity : 0, 
            duration: 1.5 
          }}
        >
          {charactersRemaining} characters remaining
        </motion.div>
        
        <Button
          onClick={handleSend}
          disabled={!value.trim() || disabled || isLoading}
          size="sm"
          aria-label="Send message"
          variant={isLoading ? "outline" : "primary"}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputId: PropTypes.string,
};
