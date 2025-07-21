import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Clock, DollarSign, ArrowLeft, X, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import ReviewCard from '@/components/ReviewCard';
import Footer from '@/components/Footer'; // Added import for Footer

const RestaurantDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [restaurant, setRestaurant] = useState(location.state?.restaurant || null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(!restaurant);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!restaurant && slug) {
      fetchRestaurantBySlug();
    }
    if (restaurant) {
      fetchReviews();
    }
  }, [slug, restaurant]);

  const fetchRestaurantBySlug = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*');

      if (error) throw error;

      const foundRestaurant = data?.find(r => 
        r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
      );

      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
      } else {
        toast({
          title: "Restaurant not found",
          description: "The restaurant you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      toast({
        title: "Error",
        description: "Failed to load restaurant details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!restaurant) return;

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading restaurant details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Restaurant Not Found</h1>
            <p className="text-muted-foreground mb-6">The restaurant you're looking for doesn't exist.</p>
            <Link to="/explore">
              <Button>Back to Explore</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const avgRating = calculateAverageRating();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/explore" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Explore
          </Link>

          {/* Restaurant Header */}
          <div className="mb-8 fade-in">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2">
                  {restaurant.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-2">
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {restaurant.area}
                  </span>
                  <span className="flex items-center">
                    <Star size={16} className="mr-1 fill-current text-yellow-500" />
                    {avgRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  {restaurant.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {restaurant.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {restaurant.images && restaurant.images.length > 0 && (
            <div className="mb-8 fade-in fade-in-delay-1">
              <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Gallery</h2>
              <div className="relative w-full">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Dialog>
                    <DialogTrigger asChild>
                      <img 
                        src={restaurant.images[selectedImageIndex] || '/placeholder.svg'}
                        alt={`${restaurant.name} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <div className="relative">
                        <img 
                          src={restaurant.images[selectedImageIndex] || '/placeholder.svg'}
                          alt={`${restaurant.name} - Image ${selectedImageIndex + 1}`}
                          className="w-full h-auto max-h-[90vh] object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Navigation Arrows */}
                  {restaurant.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? restaurant.images.length - 1 : selectedImageIndex - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex === restaurant.images.length - 1 ? 0 : selectedImageIndex + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {restaurant.images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {restaurant.images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {restaurant.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedImageIndex ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image || '/placeholder.svg'}
                          alt={`${restaurant.name} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Restaurant Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Details */}
            <div className="md:col-span-1 lg:col-span-2 space-y-6 fade-in fade-in-delay-2">
              <div className="card-elegant p-6 rounded-xl">
                <h3 className="text-xl font-heading font-semibold text-primary mb-4">Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {restaurant.phone && (
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-muted-foreground" />
                      <span>{restaurant.phone}</span>
                    </div>
                  )}
                  {restaurant.timing && (
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-muted-foreground" />
                      <span>{restaurant.timing}</span>
                    </div>
                  )}
                  {restaurant.price_range && (
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-2 text-muted-foreground" />
                      <span>{restaurant.price_range}</span>
                    </div>
                  )}
                  {restaurant.type && (
                    <div className="flex items-center">
                      <Badge variant="outline">{restaurant.type}</Badge>
                    </div>
                  )}
                </div>
                {restaurant.address && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Address:</strong> {restaurant.address}
                    </p>
                  </div>
                )}
              </div>

              {/* Features */}
              {restaurant.features && restaurant.features.length > 0 && (
                <div className="card-elegant p-6 rounded-xl">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.features.map((feature: string) => (
                      <Badge key={feature} variant="outline" className="bg-muted/50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 fade-in fade-in-delay-3">
              <div className="card-elegant p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {avgRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={20}
                      className={`${star <= Math.round(avgRating) ? 'fill-current text-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="fade-in fade-in-delay-4">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-6 flex items-center">
              <MessageCircle size={24} className="mr-2" />
              Reviews ({reviews.length})
            </h3>
            
            {reviews.length === 0 ? (
              <div className="card-elegant p-8 rounded-xl text-center">
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
              </div>
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
      {/* Added Footer */}
      <Footer />
    </div>
  );
};

export default RestaurantDetail;