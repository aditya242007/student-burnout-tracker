import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

/**
 * Navbar — Sticky glassmorphism navigation bar
 * Features: dark mode toggle, mobile hamburger menu, active link highlighting
 */
export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🧠</span>
            </div>
            <span className="text-lg font-bold text-text-primary hidden sm:block">
              Burnout<span className="gradient-text">Tracker</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                  isActive(link.to)
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Dark Mode Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-surface-tertiary hover:bg-surface-secondary border border-border-default
                         transition-all duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <HiOutlineSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <HiOutlineMoon className="w-5 h-5 text-text-secondary" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-surface-tertiary hover:bg-surface-secondary
                         border border-border-default transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiOutlineX className="w-5 h-5 text-text-primary" />
              ) : (
                <HiOutlineMenu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-default overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                    isActive(link.to)
                      ? 'bg-brand-500/10 text-brand-600'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
