export async function respond(messages, signal) {
  const mode = import.meta.env.VITE_CHAT_MODE || 'mock';
  if (mode === 'mock') return mockRespond(messages);

  return await apiRespond(messages, signal);
}

/**
 * Generate a mock response based on message content
 * 
 * @param {Array} messages - Chat history
 * @returns {Object} Mock response
 */
function mockRespond(messages) {
  console.log("MockRespond called with messages:", messages);
  
  if (!Array.isArray(messages)) {
    console.error("Invalid messages passed to mockRespond (not an array):", messages);
    return Promise.resolve({
      role: 'assistant',
      content: "I'm sorry, but I didn't receive your message properly. Could you please try again?"
    });
  }
  
  if (messages.length === 0) {
    console.error("Empty messages array passed to mockRespond");
    return Promise.resolve({
      role: 'assistant',
      content: "Hello! I'm your pet care assistant. How can I help you today?"
    });
  }
  
  // Get the last user message
  const lastMessage = messages.filter(m => m.role === 'user').pop();
  if (!lastMessage) {
    console.error("No user message found in messages array");
    return Promise.resolve({
      role: 'assistant',
      content: "Hello! I'm your pet care assistant. How can I help you today?"
    });
  }
  
  const text = lastMessage.content?.toLowerCase() || '';
  console.log("Processing user message:", text);
  
  // Random delay between 500ms and 1500ms to simulate thinking time
  return new Promise((resolve) => {
    const delay = Math.random() * 1000 + 500;
    setTimeout(() => {
      let response;
      
      // Rule-based responses
      if (text.includes('vet') || text.includes('clinic') || text.includes('doctor')) {
        response = {
          role: 'assistant',
          content: "If you're looking for a veterinarian, you can use our Vet Finder tool to locate clinics near you. Would you like me to help you navigate to the Vet Finder page?"
        };
      }
      else if (text.includes('vomit') || text.includes('throw') || text.includes('puke')) {
        response = {
          role: 'assistant',
          content: "I'm sorry to hear your pet isn't feeling well. Vomiting can be concerning. Make sure to:\n\n• Remove food for 12 hours, but provide small amounts of water\n• Gradually reintroduce bland food like boiled chicken and rice\n• Watch for dehydration signs (dry gums, lethargy)\n\nIf vomiting persists for more than 24 hours, contains blood, or your pet seems lethargic, please see a vet immediately."
        };
      }
      else if (text.includes('diarrhea') || text.includes('loose stool')) {
        response = {
          role: 'assistant',
          content: "Diarrhea in pets can be uncomfortable and concerning. Here are some care tips:\n\n• Ensure they stay hydrated with fresh water\n• Try a 12-24 hour fast for adult dogs (no fasting for cats or puppies)\n• Introduce a bland diet like plain boiled chicken and rice\n• Add a teaspoon of canned pumpkin (not pie filling) for fiber\n\nIf diarrhea continues beyond 48 hours, contains blood, or your pet seems weak, please consult a veterinarian right away."
        };
      }
      else if (text.includes('fever') || text.includes('temperature')) {
        response = {
          role: 'assistant',
          content: "A fever in pets can indicate an infection or illness. Normal temperature for dogs is 101.0 to 102.5°F (38.3 to 39.2°C) and for cats is 100.5 to 102.5°F (38 to 39.2°C).\n\n• Don't give human medications like Tylenol or ibuprofen - they're toxic to pets\n• Cool them with a damp towel if temperature is very high\n• Make sure they stay hydrated\n\nIf your pet has a fever over 103°F (39.4°C) or it persists for more than 24 hours, please see a veterinarian as soon as possible."
        };
      }
      else if (text.includes('emergency') || text.includes('urgent') || text.includes('help') || text.includes('dying')) {
        response = {
          role: 'assistant',
          content: "⚠️ If you're experiencing a pet emergency, please contact an emergency vet clinic immediately. Signs of emergency include:\n\n• Difficulty breathing\n• Severe bleeding\n• Collapse or inability to stand\n• Suspected poisoning\n• Severe trauma or injury\n\nDon't wait - emergency treatment can save your pet's life. Use our Emergency button at the top of the screen to locate the nearest emergency vet clinic."
        };
      }
      else if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text === 'hi' || text === 'hello') {
        response = {
          role: 'assistant',
          content: "Hello! I'm your Pet Help assistant. How can I help you with your pet today?"
        };
      }
      else if (text.includes('thank')) {
        response = {
          role: 'assistant',
          content: "You're welcome! I'm happy to help. Feel free to ask if you have any other questions about your pet."
        };
      }
      else if (text.length < 10) {
        response = {
          role: 'assistant',
          content: "I'd love to help you with your pet care question. Could you provide a bit more detail so I can give you the best advice?"
        };
      }
      else {
        // Default friendly response
        const defaultResponses = [
          "That's a great question about pet care. While I don't have a specific answer for that particular query, I'd recommend consulting with your veterinarian for personalized advice tailored to your pet's needs.",
          "I understand your concern for your pet. This might require specific veterinary advice based on your pet's breed, age, and health history. Is there anything specific about your pet that would help me provide better guidance?",
          "Thanks for sharing about your pet! While I can provide general guidance, remember that each pet is unique. Regular check-ups with your vet are always the best way to ensure your pet stays happy and healthy.",
          "I appreciate your question! Pets can be complex, and what works for one might not work for another. Would you like me to point you to some resources on this topic, or perhaps help you find a veterinarian in your area?",
          "That's an interesting question about pet behavior. Animals communicate in fascinating ways! If you're noticing unusual behavior that concerns you, it might be worth documenting it (maybe even with video) to show your vet at your next appointment."
        ];
        
        // Pick a random default response
        const randomIndex = Math.floor(Math.random() * defaultResponses.length);
        response = {
          role: 'assistant',
          content: defaultResponses[randomIndex]
        };
      }
      
      resolve(response);
    }, delay);
  });
}

/**
 * Send a request to the API
 * 
 * @param {Array} messages - Chat history
 * @param {AbortSignal} signal - AbortController signal
 * @returns {Promise<Object>} API response
 */
async function apiRespond(messages, signal) {
  try {
    // Trim the messages to only include relevant fields
    const trimmedMessages = messages.map(({ role, content }) => ({ role, content }));
    
    // Make the API request
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages: trimmedMessages }),
      signal
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from API');
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('API response error:', error);
    throw new Error('Failed to connect to the assistant. Please try again.');
  }
}

// The respond function has been moved to the top of this file.
// No duplicate function needed here.

// The apiRespond function is already defined earlier in this file.
// No duplicate definition needed here.
