import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // <footer className="bg-primary text-primary-foreground py-12">
    <footer className="bg-[#FC8391] text-[#83204D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Chewzy</h3>
            <p className="text-text-[#83204D]-foreground/80 leading-relaxed">
              Discover local taste, delivered digitally. Your premium food discovery platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                {isLandingPage ? (
                  <button 
                    onClick={() => scrollToSection('hero')}
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Home
                  </button>
                ) : (
                  <Link 
                    to="/"
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Home
                  </Link>
                )}
              </li>
              <li>
                {isLandingPage ? (
                  <button 
                    onClick={() => scrollToSection('explore')}
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Explore
                  </button>
                ) : (
                  <Link 
                    to="/explore"
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Explore
                  </Link>
                )}
              </li>
              <li>
                {isLandingPage ? (
                  <button 
                    onClick={() => scrollToSection('collab')}
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Partner
                  </button>
                ) : (
                  <Link 
                    to="/collab"
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Partner
                  </Link>
                )}
              </li>
              <li>
                {isLandingPage ? (
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Contact
                  </button>
                ) : (
                  <Link 
                    to="/contact"
                    className="text-text-[#83204D]-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Contact
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-text-[#83204D]-foreground/80 flex items-center justify-center">
            Made with ❤️ by the Chewzy team
          </p>
          <p className="text-text-[#83204D]-foreground/60 text-sm mt-2">
            © {currentYear} Chewzy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;