'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Trang chủ' },
    { href: '#about', label: 'Giới thiệu' },
    { href: '#skills', label: 'Kỹ năng' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Liên hệ' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">Young</span>
          <span className="logo-highlight">Coder</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 0;
          transition: background 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .logo-bracket {
          color: var(--accent-cyan);
        }

        .logo-text {
          color: white;
        }

        .logo-highlight {
          background: var(--cyber-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--cyber-gradient);
          transition: width 0.3s ease;
        }

        .nav-links a:hover {
          color: white;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .mobile-menu-btn span {
          width: 25px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 40px 20px;
            gap: 30px;
            transform: translateY(-150%);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
          }

          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }

          .nav-links a {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </nav>
  );
}
