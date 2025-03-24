
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutGrid, Plus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">PP</span>
            </div>
            <span className="font-medium text-lg">Project Planner</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" current={location.pathname}>
              <Home className="w-4 h-4 mr-1.5" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/dashboard" current={location.pathname}>
              <LayoutGrid className="w-4 h-4 mr-1.5" />
              <span>Projects</span>
            </NavLink>
            <NavLink to="/create" current={location.pathname}>
              <Plus className="w-4 h-4 mr-1.5" />
              <span>New Project</span>
            </NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link to="/create">
                <Button size="sm" className="focus-ring rounded-full px-5">
                  <Plus className="mr-1.5 h-4 w-4" />
                  New Project
                </Button>
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
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
            <MobileNavLink to="/" current={location.pathname}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </MobileNavLink>
            <MobileNavLink to="/dashboard" current={location.pathname}>
              <LayoutGrid className="w-4 h-4 mr-2" />
              Projects
            </MobileNavLink>
            <MobileNavLink to="/create" current={location.pathname}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </MobileNavLink>
            <div className="pt-2">
              <Link to="/create" className="block w-full">
                <Button size="sm" className="w-full rounded-full">
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

// NavLink component for navigation
const NavLink = ({ to, current, children }: { to: string; current: string; children: React.ReactNode }) => {
  const isActive = current === to;
  
  return (
    <Link
      to={to}
      className={`relative py-1 flex items-center transition-colors duration-200 px-3 py-1.5 rounded-full ${
        isActive 
          ? 'text-primary font-medium bg-primary/10' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
      className={`flex items-center px-3 py-2.5 rounded-xl text-base font-medium transition-colors duration-200 ${
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
