import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root was not found.');
}

// The build prerenders static markup into index.html; hydrate it when present,
// otherwise fall back to a fresh client render (plain `vite dev`).
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
