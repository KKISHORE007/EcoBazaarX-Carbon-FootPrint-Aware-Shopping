import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Heart, ShoppingCart, Leaf, TrendingDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Product } from '../../App';
import { toast } from 'sonner';

type ProductDetailProps = {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
};

export default function ProductDetail({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState<'co2' | 'price' | 'rating'>('co2');

  // Get alternative products with lower CO2 in same category
  const alternatives = allProducts
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id &&
        p.co2 < product.co2
    )
    .sort((a, b) => {
      if (sortBy === 'co2') return a.co2 - b.co2;
      if (sortBy === 'price') return a.price - b.price;
      return b.rating - a.rating;
    })
    .slice(0, 4);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#A5D6A7]/30 to-white relative overflow-hidden">
      {/* CO2 Bubbles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-200/20 rounded-full flex items-center justify-center text-xs text-green-700/40"
            style={{
              width: 40,
              height: 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          >
            CO₂
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="overflow-hidden shadow-xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600">{product.brand}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i < Math.floor(product.rating) ? '#FCD34D' : 'none'}
                    stroke={i < Math.floor(product.rating) ? '#FCD34D' : '#D1D5DB'}
                  />
                ))}
              </div>
              <span className="text-lg">({product.rating} stars)</span>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-green-600 text-lg py-2 px-4">
                <Leaf className="h-5 w-5 mr-2" />
                {product.co2} kg CO₂
              </Badge>
              {product.co2 < 3 && (
                <Badge className="bg-blue-600 text-sm py-1 px-3">
                  Low Carbon Footprint
                </Badge>
              )}
            </div>

            <div className="text-4xl font-bold text-[#2E7D32]">₹{product.price}</div>

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.color.length > 0 && (
              <div>
                <p className="font-semibold mb-2">Available Colors:</p>
                <div className="flex gap-2">
                  {product.color.map((color) => (
                    <Badge key={color} variant="outline">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="font-semibold mb-2">Stock: {product.stock} units</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={() => {
                  onToggleWishlist(product);
                  toast.success(
                    isInWishlist ? 'Removed from wishlist' : 'Added to wishlist'
                  );
                }}
              >
                <Heart
                  className="h-6 w-6"
                  fill={isInWishlist ? '#EF4444' : 'none'}
                  stroke={isInWishlist ? '#EF4444' : 'currentColor'}
                />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Low Carbon Alternatives */}
        {alternatives.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold">
                  Low Carbon Footprint Alternatives
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="co2">CO₂ Value</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {alternatives.map((alt, index) => (
                <motion.div
                  key={alt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                    <div className="relative">
                      <img
                        src={alt.image}
                        alt={alt.name}
                        className="w-full h-40 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        {alt.co2} kg CO₂
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-blue-600">
                        {((product.co2 - alt.co2) / product.co2 * 100).toFixed(0)}% less
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{alt.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{alt.brand}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3"
                            fill={i < Math.floor(alt.rating) ? '#FCD34D' : 'none'}
                            stroke={i < Math.floor(alt.rating) ? '#FCD34D' : '#D1D5DB'}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          ({alt.rating})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2E7D32]">
                          ₹{alt.price}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onAddToCart(alt, 1);
                            toast.success(`Added ${alt.name} to cart!`);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
