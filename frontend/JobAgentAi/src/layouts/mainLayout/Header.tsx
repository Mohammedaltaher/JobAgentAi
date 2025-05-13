import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          JobAgentAI
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>

          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Auth Buttons */}
        <div className="auth-buttons">

          {/* <button className="login-button">
            <Link to="/login">Log in</Link>
          </button> */}
          <button className="signup-button">
            <Link to="/login">Log in / Sign up</Link>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          <ul>
            <li><Link to="/features" onClick={toggleMenu}>Features</Link></li>
            <li><Link to="/how-it-works" onClick={toggleMenu}>How It Works</Link></li>
            <li><Link to="/pricing" onClick={toggleMenu}>Pricing</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;