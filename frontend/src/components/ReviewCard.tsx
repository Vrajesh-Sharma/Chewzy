import { useState, useEffect } from 'react';
import { Star, Heart, ThumbsUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Like {
  id: string;
  user_name: string;
  created_at: string;
}

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
  const [showLikeDialog, setShowLikeDialog] = useState(false);
  const [showLikesListDialog, setShowLikesListDialog] = useState(false);
  const [likesList, setLikesList] = useState<Like[]>([]);
  const [userName, setUserName] = useState('');
  const { toast } = useToast();

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
      // Get all likes for this review with user names
      const { data: likesData, error: likesError } = await supabase
        .from('review_likes')
        .select('id, user_name, created_at')
        .eq('review_id', review.id)
        .order('created_at', { ascending: false })
        .returns<Like[]>();

      if (likesError) throw likesError;

      setLikeCount(likesData?.length || 0);
      setLikesList(likesData || []);

      // Check if current user has already liked this review
      const { data: userLikeData, error: userLikeError } = await supabase
        .from('review_likes')
        .select('id')
        .eq('review_id', review.id)
        .eq('user_ip', window.location.hostname)
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
    setShowLikeDialog(true);
  };

  const submitLike = async () => {
    if (!userName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    setIsLiking(true);
    try {
      const { error } = await supabase
        .from('review_likes')
        .insert({
          review_id: review.id,
          user_ip: window.location.hostname,
          user_name: userName.trim()
        });

      if (error) throw error;
      
      toast({
        title: "Thank you!",
        description: "Your feedback helps others discover great places.",
      });
      setShowLikeDialog(false);
      setUserName('');
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
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={hasLiked || isLiking}
            className={`text-muted-foreground hover:text-primary ${hasLiked ? 'text-primary' : ''}`}
          >
            <ThumbsUp size={16} className={`mr-2 ${hasLiked ? 'fill-current' : ''}`} />
            Helpful
          </Button>
          {likeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLikesListDialog(true)}
              className="text-muted-foreground hover:text-primary"
            >
              Liked by {likeCount} {likeCount === 1 ? 'user' : 'users'}
            </Button>
          )}
        </div>
      </div>

      {/* Like Dialog */}
      <Dialog open={showLikeDialog} onOpenChange={setShowLikeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Review as Helpful</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-foreground mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="input-field"
              />
            </div>
            <Button 
              onClick={submitLike} 
              disabled={isLiking}
              className="w-full"
            >
              {isLiking ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Likes List Dialog */}
      <Dialog open={showLikesListDialog} onOpenChange={setShowLikesListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users Who Found This Review Helpful</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {likesList.map((like) => (
              <div
                key={like.id}
                className="py-3 border-b last:border-b-0 flex items-center justify-between"
              >
                <span className="font-medium">{like.user_name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(like.created_at)}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewCard;