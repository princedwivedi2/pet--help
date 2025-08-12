import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useReducedMotion } from 'framer-motion';
import { Avatar } from '../ui';
import { formatTime } from '../../utils/dateUtils';

/**
 * ChatMessage component displays a single message in the chat
 * 
 * @param {Object} props
 * @param {string} props.role - The role of the message sender ('user', 'assistant', 'system')
 * @param {string} props.content - The message content
 * @param {string} props.time - The timestamp of the message
 * @param {React.ReactNode} props.avatar - Optional avatar component for the assistant
 * @param {boolean} props.isLast - Whether this is the last message in the chat
 * @param {string} props.className - Additional CSS classes for the message bubble
 * @returns {JSX.Element}
 */
export default function ChatMessage({ 
  role,
  content, 
  time,
  avatar,
  isLast = false,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();
  const isUser = role === 'user';
  
  // Animation variants
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[85%]`}>
        {!isUser && (
          <div className="mr-2 flex-shrink-0">
            {avatar || (
              <Avatar 
                size="md" 
                initials="P" 
                alt="Pet Assistant" 
                variant="circle" 
              />
            )}
          </div>
        )}

        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary text-white rounded-br-none' 
              : 'bg-white/80 glassmorphism shadow-card rounded-bl-none'
          } ${isLast ? 'animate-pulse-subtle' : ''} ${className}`}
        >
          <p className="whitespace-pre-wrap break-words">
            {content}
          </p>
          
          {time && (
            <div 
              className={`text-xs mt-1 ${isUser ? 'text-white/70 text-right' : 'text-gray-500'}`}
            >
              {formatTime(time)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

ChatMessage.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant', 'system']).isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  avatar: PropTypes.node,
  isLast: PropTypes.bool,
  className: PropTypes.string,
};
