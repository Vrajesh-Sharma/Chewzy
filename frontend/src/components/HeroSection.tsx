import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-food.jpg';

const HeroSection = () => {
  const scrollToExplore = () => {
    const element = document.getElementById('explore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Gourmet food spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon/80 via-maroon/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 fade-in">
          Discover Local Taste,
          <span className="block text-coral">Delivered Digitally</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed fade-in fade-in-delay-1">
          Explore the finest restaurants and cafés in your neighborhood. 
          From hidden gems to celebrated establishments, find your next culinary adventure.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center fade-in fade-in-delay-2">
          <Button 
            onClick={scrollToExplore}
            size="lg"
            className="btn-ripple bg-coral hover:bg-coral-dark text-maroon font-semibold px-8 py-3 text-lg shadow-elegant"
          >
            Explore Nearby
          </Button>
          
          <Button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;