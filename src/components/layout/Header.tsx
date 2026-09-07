import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/resume-builder', label: 'Resume Builder' },
  { path: '/resume-templates', label: 'Templates' },
  { path: '/resume-examples', label: 'Examples' },
  { path: '/resume-tips', label: 'Tips' },
  { path: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900">
              Resume<span className="text-primary-600">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline
                  ${location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/resume-builder">
              <Button size="sm">Create Resume Free</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-secondary-200 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`
                  px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline
                  ${location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-600 hover:bg-secondary-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-secondary-200">
              <Link to="/resume-builder" onClick={() => setMenuOpen(false)}>
                <Button fullWidth>Create Resume Free</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
