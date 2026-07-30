import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { AppState } from '../../App';

type AdminReviewsProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function AdminReviews({ appState }: AdminReviewsProps) {
  const allReviews = appState.products.flatMap(p =>
    p.reviews.map(r => ({ ...r, productName: p.name, productId: p.id }))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Reviews ({allReviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {allReviews.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {allReviews.map((review) => (
                <Card key={review.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.userName}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                fill={i < review.rating ? '#FCD34D' : 'none'}
                                stroke={i < review.rating ? '#FCD34D' : '#D1D5DB'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Product: {review.productName}</p>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-xs text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
