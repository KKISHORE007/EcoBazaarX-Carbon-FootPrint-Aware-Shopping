import { motion } from 'motion/react';
import { Heart, Star, ShoppingCart, Trash2, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Product } from '../../App';
import { toast } from 'sonner';

type UserWishlistProps = {
  wishlist: Product[];
  onProductClick: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export default function UserWishlist({
  wishlist,
  onProductClick,
  onRemoveFromWishlist,
  onAddToCart,
}: UserWishlistProps) {
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Heart className="h-24 w-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600">Save your favorite eco-friendly products here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Wishlist ({wishlist.length} items)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -10 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white/90 backdrop-blur-sm">
              <div
                className="relative cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-green-600">
                  <Leaf className="h-3 w-3 mr-1" />
                  {product.co2} kg CO₂
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(product);
                    toast.success('Removed from wishlist');
                  }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3
                  className="font-semibold mb-1 cursor-pointer hover:text-[#2E7D32]"
                  onClick={() => onProductClick(product)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      fill={i < Math.floor(product.rating) ? '#FCD34D' : 'none'}
                      stroke={i < Math.floor(product.rating) ? '#FCD34D' : '#D1D5DB'}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.rating})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#2E7D32]">
                    ₹{product.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#2E7D32] hover:bg-[#1B5E20]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                      toast.success('Added to cart!');
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
