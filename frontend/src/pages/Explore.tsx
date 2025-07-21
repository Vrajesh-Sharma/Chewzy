import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Explore = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortRestaurants();
  }, [restaurants, reviews, searchTerm, selectedArea, minRating, sortBy]);

  const fetchData = async () => {
    try {
      const [restaurantsResult, reviewsResult] = await Promise.all([
        supabase.from('restaurants').select('*').order('created_at', { ascending: false }),
        supabase.from('reviews').select('*')
      ]);

      if (restaurantsResult.error) throw restaurantsResult.error;
      if (reviewsResult.error) throw reviewsResult.error;

      setRestaurants(restaurantsResult.data || []);
      setReviews(reviewsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load restaurants",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = (restaurantId: string) => {
    const restaurantReviews = reviews.filter(r => r.restaurant_id === restaurantId);
    if (restaurantReviews.length === 0) return 0;
    const sum = restaurantReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / restaurantReviews.length;
  };

  const getReviewCount = (restaurantId: string) => {
    return reviews.filter(r => r.restaurant_id === restaurantId).length;
  };

  const filterAndSortRestaurants = () => {
    let filtered = restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === 'all' || restaurant.area === selectedArea;
      const avgRating = calculateAverageRating(restaurant.id);
      const matchesRating = avgRating >= parseFloat(minRating);
      
      return matchesSearch && matchesArea && matchesRating;
    });

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return calculateAverageRating(b.id) - calculateAverageRating(a.id);
        case 'trending':
          return getReviewCount(b.id) - getReviewCount(a.id);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredRestaurants(filtered);
  };

  const getUniqueAreas = () => {
    const areas = restaurants.map(r => r.area).filter(Boolean);
    return [...new Set(areas)];
  };

  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading restaurants...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
              Explore Local Restaurants
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional dining experiences in your area
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-4 fade-in fade-in-delay-1">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Area Filter */}
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {getUniqueAreas().map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Min Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="1">1+ Stars</SelectItem>
                <SelectItem value="2">2+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-muted-foreground">
            Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, index) => {
              const avgRating = calculateAverageRating(restaurant.id);
              const reviewCount = getReviewCount(restaurant.id);
              
              return (
                <Link 
                  key={restaurant.id}
                  to={`/explore/${createSlug(restaurant.name)}`}
                  state={{ restaurant }}
                  className="block"
                >
                  <div 
                    className="card-elegant rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={restaurant.images?.[0] || '/placeholder.svg'}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-primary shadow-soft">
                          <Star size={12} className="mr-1 fill-current" />
                          {avgRating.toFixed(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                        {restaurant.name}
                      </h3>

                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-sm">{restaurant.area}</span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {restaurant.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                        </div>
                        <Badge variant="secondary">
                          {restaurant.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No restaurants found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedArea('all');
                  setMinRating('0');
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Added Footer */}
      <Footer />
    </div>
  );
};

export default Explore;