import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Star, Users } from 'lucide-react';
import heroImage from '@/assets/hero-food.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-heading font-bold text-primary">
              Chewzy
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/explore" className="text-foreground hover:text-primary transition-colors font-medium">
                Explore
              </Link>
              <Link to="/collab" className="text-foreground hover:text-primary transition-colors font-medium">
                Partner
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Gourmet food spread"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-maroon/80 via-maroon/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 fade-in">
            Discover Local Taste,
            <span className="block text-coral">Delivered Digitally</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed fade-in fade-in-delay-1">
            Explore the finest restaurants and cafés in your neighborhood. 
            From hidden gems to celebrated establishments, find your next culinary adventure.
          </p>

          <div className="fade-in fade-in-delay-2">
            <Link to="/explore">
              <Button 
                size="lg"
                className="btn-ripple bg-coral hover:bg-coral-dark text-maroon font-semibold px-8 py-3 text-lg shadow-elegant group"
              >
                Explore Restaurants
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="fade-in">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Local Focus</h3>
              <p className="text-muted-foreground">Discover hidden gems in your neighborhood</p>
            </div>
            <div className="fade-in fade-in-delay-1">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Curated Reviews</h3>
              <p className="text-muted-foreground">Honest reviews from real food lovers</p>
            </div>
            <div className="fade-in fade-in-delay-2">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Community Driven</h3>
              <p className="text-muted-foreground">Built by food enthusiasts, for food enthusiasts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;