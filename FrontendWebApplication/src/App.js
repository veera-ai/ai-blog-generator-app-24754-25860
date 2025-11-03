import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesRoot from './routes';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// PUBLIC_INTERFACE
function App() {
  /** Root App wrapper with Router and Auth Context. Applies retro theme via public/retro-styles.css */
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main className="retro-container">
            <RoutesRoot />
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
