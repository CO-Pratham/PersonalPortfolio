

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root');

// Protect against HMR double-mounts
if (!container._reactRoot) {
  const root = createRoot(container);
  container._reactRoot = root;
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Update existing root (HMR)
  container._reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
