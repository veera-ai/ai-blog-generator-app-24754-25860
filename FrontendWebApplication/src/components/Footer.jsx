import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Retro footer */
  return (
    <footer className="retro-footer">
      <div>© {new Date().getFullYear()} AI Blog Generator</div>
      <div className="retro-footer-right">Made with <span>🕹️</span> Retro Vibes</div>
    </footer>
  );
}
