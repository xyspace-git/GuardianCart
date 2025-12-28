import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/styles/index.css';
import './components/styles/auth.css';
import './components/styles/dashboard.css';
import './components/styles/animations.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
