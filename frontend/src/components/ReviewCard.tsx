import { useState, useEffect } from 'react';
import { Star, Heart, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReviewCardProps {
  review: {
    id: string;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
    helpful_count: number;
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const { toast } = useToast();

  // Get user IP for tracking likes
  const getUserIP = () => {
    return localStorage.getItem('user_ip') || (() => {
      const ip = 'user-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('user_ip', ip);
      return ip;
    })();
  };

  useEffect(() => {
    fetchLikeData();
    
    // Set up real-time subscription for like updates
    const channel = supabase
      .channel('review-likes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'review_likes',
          filter: `review_id=eq.${review.id}`
        },
        () => fetchLikeData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [review.id]);

  const fetchLikeData = async () => {
    try {
      const userIp = getUserIP();
      
      // Get total like count for this review
      const { data: likesData, error: likesError } = await supabase
        .from('review_likes')
        .select('id')
        .eq('review_id', review.id);

      if (likesError) throw likesError;

      setLikeCount(likesData?.length || 0);

      // Check if current user has already liked this review
      const { data: userLikeData, error: userLikeError } = await supabase
        .from('review_likes')
        .select('id')
        .eq('review_id', review.id)
        .eq('user_ip', userIp)
        .single();

      if (userLikeError && userLikeError.code !== 'PGRST116') {
        throw userLikeError;
      }

      setHasLiked(!!userLikeData);
    } catch (error) {
      console.error('Error fetching like data:', error);
    }
  };

  const handleLike = async () => {
    if (hasLiked || isLiking) return;

    setIsLiking(true);
    try {
      const userIp = getUserIP();
      
      const { error } = await supabase
        .from('review_likes')
        .insert({
          review_id: review.id,
          user_ip: userIp
        });

      if (error) throw error;
      
      toast({
        title: "Thank you!",
        description: "Your feedback helps others discover great places.",
      });
    } catch (error) {
      console.error('Error liking review:', error);
      toast({
        title: "Error",
        description: "Failed to like review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="card-elegant p-6 rounded-xl">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-primary">{review.user_name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="text-sm text-muted-foreground">
              {formatDate(review.created_at)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        {review.comment}
      </p>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={hasLiked || isLiking}
          className={`text-muted-foreground hover:text-primary ${hasLiked ? 'text-primary' : ''}`}
        >
          <ThumbsUp size={16} className={`mr-2 ${hasLiked ? 'fill-current' : ''}`} />
          Helpful ({likeCount})
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;