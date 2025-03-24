
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus-ring rounded-md px-2 py-1"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-semibold text-sm">PP</span>
            </div>
            <span className="font-medium text-lg">Project Planner</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" current={location.pathname}>Home</NavLink>
            <NavLink to="/dashboard" current={location.pathname}>Projects</NavLink>
            <NavLink to="/create" current={location.pathname}>New Project</NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link to="/create">
                <Button size="sm" className="focus-ring">Get Started</Button>
              </Link>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white/90 backdrop-blur-md border-t border-gray-200">
          <MobileNavLink to="/" current={location.pathname}>Home</MobileNavLink>
          <MobileNavLink to="/dashboard" current={location.pathname}>Projects</MobileNavLink>
          <MobileNavLink to="/create" current={location.pathname}>New Project</MobileNavLink>
          <div className="pt-2">
            <Link to="/create" className="block w-full">
              <Button size="sm" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// NavLink component for navigation
const NavLink = ({ to, current, children }: { to: string; current: string; children: React.ReactNode }) => {
  const isActive = current === to;
  
  return (
    <Link
      to={to}
      className={`relative py-1 transition-colors duration-200 story-link ${
        isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, current, children }: { to: string; current: string; children: React.ReactNode }) => {
  const isActive = current === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
        isActive 
          ? 'bg-primary/10 text-primary' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
