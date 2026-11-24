import React from 'react';
import { createRoot } from 'react-dom/client';
import './lib/m3e';
import './styles/transitions.css';
import './styles/global.css';
import './styles/upgrade.css';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root was not found.');
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
