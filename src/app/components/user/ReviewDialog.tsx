import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { Product, Review, AppState } from '../../App';
import { toast } from 'sonner';

type ReviewDialogProps = {
  open: boolean;
  onClose: () => void;
  product: Product;
  userId: string;
  userName: string;
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function ReviewDialog({
  open,
  onClose,
  product,
  userId,
  userName,
  appState,
  updateAppState,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userId,
      userName,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
    };

    // Add review to product
    const updatedProducts = appState.products.map((p) =>
      p.id === product.id
        ? {
            ...p,
            reviews: [...p.reviews, newReview],
            rating: [...p.reviews, newReview].reduce((sum, r) => sum + r.rating, 0) / [...p.reviews, newReview].length,
          }
        : p
    );

    updateAppState({ products: updatedProducts });
    toast.success('Review submitted successfully!');
    
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.brand}</p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="mb-2 block">Your Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Poor'}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="review-comment" className="mb-2 block">
              Your Review *
            </Label>
            <Textarea
              id="review-comment"
              placeholder="Share your thoughts about this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
