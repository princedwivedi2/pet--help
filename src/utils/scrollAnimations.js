/**
 * This utility script automatically adds animation classes when elements
 * enter the viewport using Intersection Observer API
 */

document.addEventListener('DOMContentLoaded', () => {
  // Find all elements that need scroll animations
  const animatedElements = document.querySelectorAll(
    '.reveal-on-scroll, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-group'
  );

  // If browser doesn't support Intersection Observer, show all elements
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => {
      el.classList.add('in-viewport');
    });
    return;
  }

  // Create observer with options
  const options = {
    root: null, // use the viewport
    threshold: 0.1, // trigger when at least 10% of the element is visible
    rootMargin: '-50px 0px' // trigger slightly before the element enters the viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to make element visible
        entry.target.classList.add('in-viewport');
        
        // Stop observing once animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Start observing all animation elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});
