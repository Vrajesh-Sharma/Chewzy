import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-elegant' 
        : 'bg-white/5 backdrop-blur-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary">
            Chewzy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {isLandingPage ? (
              <>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Home
                </button>
                <Link 
                  to="/explore"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Explore
                </Link>
                <Link 
                  to="/collab"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Partner
                </Link>
                <Link 
                  to="/contact"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/explore"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Explore
                </Link>
                <Link 
                  to="/collab"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Partner
                </Link>
                <Link 
                  to="/contact"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="py-4 space-y-3">
              {isLandingPage ? (
                <>
                  <button 
                    onClick={() => {
                      scrollToSection('hero');
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Home
                  </button>
                  <Link 
                    to="/explore"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/collab"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Partner
                  </Link>
                  <Link 
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/explore"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/collab"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Partner
                  </Link>
                  <Link 
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium"
                  >
                    Contact
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;