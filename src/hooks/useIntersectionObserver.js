import { useState, useEffect } from 'react';

/**
 * Custom hook for intersection observer to detect when an element enters the viewport
 * @param {React.RefObject} elementRef - The ref of the element to observe
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visibility to trigger callback (0-1)
 * @param {string} options.rootMargin - Margin around the root element
 * @returns {boolean} - True if element is intersecting, false otherwise
 */
export default function useIntersectionObserver(
  elementRef,
  { threshold = 0, rootMargin = '0px' } = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef?.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, threshold, rootMargin]);

  return isIntersecting;
}
