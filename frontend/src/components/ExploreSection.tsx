import { useState, useEffect } from 'react';
import { Star, MapPin, Filter, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ReviewCard from './ReviewCard';

const ExploreSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [showReviews, setShowReviews] = useState(false);
  const { toast } = useToast();

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'cafe', label: 'Cafés' }
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRestaurants(data || []);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast({
        title: "Error",
        description: "Failed to load restaurants",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (restaurantId: string) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const calculateAverageRating = (restaurantId: string) => {
    const restaurantReviews = reviews.filter(r => r.restaurant_id === restaurantId);
    if (restaurantReviews.length === 0) return 0;
    const sum = restaurantReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / restaurantReviews.length).toFixed(1);
  };

  const filteredRestaurants = activeFilter === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.type === activeFilter);

  const handleViewDetails = async (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setShowReviews(true);
    await fetchReviews(restaurant.id);
  };

  if (loading) {
    return (
      <section id="explore" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading restaurants...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="explore" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Explore Local Flavors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exceptional dining experiences curated just for you
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 fade-in fade-in-delay-1">
          <div className="flex items-center gap-2 mr-4">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
          </div>
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={`transition-all duration-200 ${
                activeFilter === filter.id 
                  ? 'bg-primary text-primary-foreground shadow-soft' 
                  : 'hover:bg-muted'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant, index) => (
            <div 
              key={restaurant.id} 
              className={`card-elegant rounded-xl overflow-hidden fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={restaurant.images?.[0] || '/placeholder.svg'}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-primary shadow-soft">
                    <Star size={12} className="mr-1 fill-current" />
                    {calculateAverageRating(restaurant.id) || '0.0'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-heading font-semibold text-primary">
                    {restaurant.name}
                  </h3>
                </div>

                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{restaurant.area}</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {restaurant.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.tags?.map((tag: string) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="text-xs bg-coral/20 text-maroon hover:bg-coral/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  onClick={() => handleViewDetails(restaurant)}
                  className="w-full btn-ripple bg-gradient-accent hover:opacity-90 text-white font-medium"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Details Modal */}
        {showReviews && selectedRestaurant && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                      {selectedRestaurant.name}
                    </h2>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {selectedRestaurant.area}
                      </span>
                      <span className="flex items-center">
                        <Star size={16} className="mr-1 fill-current text-yellow-500" />
                        {calculateAverageRating(selectedRestaurant.id) || '0.0'}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReviews(false)}
                    className="text-muted-foreground"
                  >
                    Close
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-muted-foreground mb-4">{selectedRestaurant.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-primary">Phone:</span> {selectedRestaurant.phone}
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Timing:</span> {selectedRestaurant.timing}
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Price Range:</span> {selectedRestaurant.price_range}
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Type:</span> {selectedRestaurant.type}
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-4 flex items-center">
                    <MessageCircle size={20} className="mr-2" />
                    Reviews ({reviews.length})
                  </h3>
                  
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review!</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12 fade-in">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-3 text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Load More Places
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;