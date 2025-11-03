import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Load retro theme from public (linked via index.html by CRA at runtime, but keep class usage here)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
