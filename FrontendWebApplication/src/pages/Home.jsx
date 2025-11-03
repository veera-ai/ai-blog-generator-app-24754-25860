import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page with retro hero */
  return (
    <section className="retro-hero">
      <h1>AI Blog Generator</h1>
      <p>Type a topic, get a blog post. Retro-styled productivity.</p>
      <div className="retro-row">
        <Link to="/register" className="btn-retro">Get Started</Link>
        <Link to="/login" className="btn-retro btn-outline">Login</Link>
      </div>
    </section>
  );
}
