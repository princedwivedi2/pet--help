/**
 * API endpoint for chat functionality
 * 
 * This is designed to work with Netlify Functions or Vercel Serverless Functions
 * The API receives messages from the chat and returns an AI assistant response
 */

// Helper to handle errors with proper status codes
const errorResponse = (message, statusCode = 500) => {
  return {
    statusCode,
    body: JSON.stringify({ error: message })
  };
};

// Mock handler to return responses without an actual AI backend
// In production, this would be replaced with a call to an LLM API
const mockResponseHandler = async (messages) => {
  // Get the last user message
  const lastMessage = messages.filter(m => m.role === 'user').pop();
  const text = lastMessage?.content?.toLowerCase() || '';
  
  // Rule-based responses similar to the client-side mock
  if (text.includes('vet') || text.includes('clinic') || text.includes('doctor')) {
    return {
      role: 'assistant',
      content: "If you're looking for a veterinarian, you can use our Vet Finder tool to locate clinics near you. Would you like me to help you navigate to the Vet Finder page?"
    };
  }
  else if (text.includes('vomit') || text.includes('throw') || text.includes('puke')) {
    return {
      role: 'assistant',
      content: "I'm sorry to hear your pet isn't feeling well. Vomiting can be concerning. Make sure to:\n\n• Remove food for 12 hours, but provide small amounts of water\n• Gradually reintroduce bland food like boiled chicken and rice\n• Watch for dehydration signs (dry gums, lethargy)\n\nIf vomiting persists for more than 24 hours, contains blood, or your pet seems lethargic, please see a vet immediately."
    };
  }
  else if (text.includes('diarrhea') || text.includes('loose stool')) {
    return {
      role: 'assistant',
      content: "Diarrhea in pets can be uncomfortable and concerning. Here are some care tips:\n\n• Ensure they stay hydrated with fresh water\n• Try a 12-24 hour fast for adult dogs (no fasting for cats or puppies)\n• Introduce a bland diet like plain boiled chicken and rice\n• Add a teaspoon of canned pumpkin (not pie filling) for fiber\n\nIf diarrhea continues beyond 48 hours, contains blood, or your pet seems weak, please consult a veterinarian right away."
    };
  }
  // More handlers similar to the client-side mock
  
  // Default response if no rules match
  return {
    role: 'assistant',
    content: "Thank you for reaching out about your pet. While I can provide general guidance, every pet is unique. Regular check-ups with your veterinarian are the best way to ensure your pet stays happy and healthy. Is there anything specific you'd like to know about pet care?"
  };
};

// In a real implementation, this would connect to an AI service
const aiResponseHandler = async (messages) => {
  try {
    // This would be replaced with actual API call code
    // Example:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       { role: 'system', content: 'You are a helpful pet care assistant.' },
    //       ...messages.slice(-10) // Only send the last 10 messages to save tokens
    //     ],
    //     temperature: 0.7
    //   })
    // });
    // 
    // const data = await response.json();
    // return data.choices[0].message;

    // For now, just use the mock handler
    return await mockResponseHandler(messages);
  } catch (error) {
    console.error('AI API error:', error);
    throw new Error('Failed to get response from AI service');
  }
};

// Main handler function for the API endpoint
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    // Validate request body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request. Messages array is required.' });
    }
    
    // Get response based on API mode
    const response = await aiResponseHandler(messages);
    
    // Return the response
    return res.status(200).json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Failed to process your request' });
  }
}

// For Netlify Functions format
export const config = {
  path: "/api/chat"
};
