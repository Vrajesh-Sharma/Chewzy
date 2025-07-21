import { Heart, MapPin, Users, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Born in 2025",
      description: "Founded with a passion for connecting food lovers with exceptional local dining experiences."
    },
    {
      icon: MapPin,
      title: "Local Discovery",
      description: "We believe the best flavors are found in your own neighborhood, waiting to be discovered."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by food enthusiasts, for food enthusiasts. Every recommendation comes from real experiences."
    },
    {
      icon: Award,
      title: "Quality First",
      description: "We curate only the finest establishments, ensuring every meal is a memorable experience."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
            Inspired by Local Flavors
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Chewzy was born from a simple belief: the best culinary experiences happen when 
            passionate chefs meet curious food lovers. We're here to make those connections easier, 
            more meaningful, and more delicious.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`text-center group fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-6">
                <feature.icon size={32} className="text-primary" />
              </div>
              
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center fade-in">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-soft">
            <blockquote className="text-lg sm:text-xl font-heading text-primary italic leading-relaxed">
              "Every meal tells a story. Every chef has a passion. Every diner seeks an experience. 
              We're here to bring these elements together, creating moments that satisfy both 
              hunger and soul."
            </blockquote>
            <footer className="mt-6 text-muted-foreground font-medium">
              — The Chewzy Team
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;