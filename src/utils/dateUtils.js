/**
 * Format a date or timestamp string into a readable time format
 * 
 * @param {Date|string} date - Date object or timestamp string
 * @returns {string} Formatted time string
 */
export function formatTime(date) {
  try {
    const d = date instanceof Date ? date : new Date(date);
    
    // If invalid date, return empty string
    if (isNaN(d.getTime())) return '';
    
    // Format as "Today, 10:30 AM" or "Yesterday, 3:45 PM" or "May 3, 2:15 PM"
    const now = new Date();
    const isToday = now.toDateString() === d.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === d.toDateString();
    
    const timeString = d.toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (isToday) {
      return `Today, ${timeString}`;
    } else if (isYesterday) {
      return `Yesterday, ${timeString}`;
    } else {
      return d.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}

/**
 * Format date to ISO string for storage
 * 
 * @param {Date} date - Date object
 * @returns {string} ISO string
 */
export function toISOString(date) {
  return date instanceof Date ? date.toISOString() : '';
}
