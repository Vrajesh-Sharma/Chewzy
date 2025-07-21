import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer'; // Added import for Footer

const Collab = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      icon: <Star className="h-8 w-8" />,
      features: [
        'Basic restaurant listing',
        'Customer reviews',
        'Basic analytics',
        'Standard support'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Pro',
      price: '₹299/month',
      description: 'For growing restaurants',
      icon: <Zap className="h-8 w-8" />,
      features: [
        'Enhanced restaurant profile',
        'Priority listing placement',
        'Advanced analytics',
        'Customer insights',
        'Photo gallery management',
        'Review management tools',
        'Priority support'
      ],
      buttonText: 'Activate Pro',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Premium',
      price: '₹599/month',
      description: 'For established restaurants',
      icon: <Crown className="h-8 w-8" />,
      features: [
        'Everything in Pro',
        'Featured restaurant badge',
        'Custom branding options',
        'Marketing campaign tools',
        'Dedicated account manager',
        'API access',
        '24/7 premium support'
      ],
      buttonText: 'Activate Premium',
      buttonVariant: 'default' as const,
      popular: false
    }
  ];

  const createContactMessage = (planName: string) => {
    return `Hi! I want to activate my ${planName} subscription for my restaurant. Please provide me with the details to get started.`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
              Partner With Chewzy
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Join our platform and connect with food lovers in your area. Choose the plan that fits your restaurant's needs and start growing your business today.
            </p>
            <Badge className="bg-coral/20 text-coral border-coral/30 px-4 py-2 text-sm">
              Trusted by 500+ restaurants
            </Badge>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`card-elegant rounded-2xl p-8 relative fade-in ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Basic' ? (
                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full"
                    disabled
                  >
                    {plan.buttonText}
                  </Button>
                ) : (
                  <Link 
                    to="/contact"
                    state={{ 
                      prefilledMessage: createContactMessage(plan.name),
                      planName: plan.name 
                    }}
                  >
                    <Button 
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 fade-in fade-in-delay-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Partner Restaurants</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Monthly Visitors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center fade-in fade-in-delay-4">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of restaurants already growing their business with Chewzy. 
              Our team is here to help you every step of the way.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-coral hover:bg-coral-dark text-maroon font-semibold px-8 py-3">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Added Footer */}
      <Footer />
    </div>
  );
};

export default Collab;