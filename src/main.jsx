// Nunito and Poppins from Google Fonts
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import './styles/animations.css'; // Import animation styles
import AppRoutes from './routes.jsx';

// Import scroll animation utility
import './utils/scrollAnimations.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
