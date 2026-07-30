import { motion } from 'motion/react';
import { Search, Star, Heart, ShoppingBag, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Product } from '../../App';
import { useState } from 'react';

type UserHomeProps = {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
};

export default function UserHome({
  products,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: UserHomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Clothing', icon: '👕', color: 'bg-blue-100' },
    { name: 'Footwear', icon: '👟', color: 'bg-purple-100' },
    { name: 'Bags', icon: '👜', color: 'bg-pink-100' },
    { name: 'Electronics', icon: '📱', color: 'bg-yellow-100' },
    { name: 'Kitchen', icon: '🍴', color: 'bg-green-100' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
    { name: 'Beauty', icon: '💄', color: 'bg-red-100' },
    { name: 'Stationery', icon: '✏️', color: 'bg-indigo-100' },
    { name: 'Home', icon: '🏠', color: 'bg-teal-100' },
  ];

  // Fuzzy search function - tolerates spelling mistakes
  const fuzzyMatch = (str: string, query: string): boolean => {
    if (!query) return true;
    
    str = str.toLowerCase();
    query = query.toLowerCase();
    
    // Direct match
    if (str.includes(query)) return true;
    
    // Character-by-character fuzzy matching
    let strIndex = 0;
    let queryIndex = 0;
    let consecutiveMatches = 0;
    
    while (strIndex < str.length && queryIndex < query.length) {
      if (str[strIndex] === query[queryIndex]) {
        queryIndex++;
        consecutiveMatches++;
      } else {
        consecutiveMatches = 0;
      }
      strIndex++;
    }
    
    // Allow up to 30% of characters to be mismatched
    const matchRatio = queryIndex / query.length;
    return matchRatio >= 0.7;
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = fuzzyMatch(p.name, searchQuery) || 
                         fuzzyMatch(p.brand, searchQuery) ||
                         fuzzyMatch(p.category, searchQuery) ||
                         fuzzyMatch(p.description, searchQuery);
    
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl"
      >
        {/* Animated Shopping Bag */}
        <motion.div
          className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <ShoppingBag size={200} className="text-white" />
        </motion.div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop Sustainably
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-lg">
            Discover eco-friendly products that reduce your carbon footprint
          </p>
          <div className="flex gap-2 items-center">
            <Leaf className="h-6 w-6 text-white" />
            <span className="text-white">Every purchase makes a difference!</span>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for eco-friendly products..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          {selectedCategory && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-sm"
            >
              Clear Filter
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category.name)}
            >
              <Card 
                className={`${
                  selectedCategory === category.name 
                    ? 'ring-2 ring-[#2E7D32] ' + category.color 
                    : category.color
                } hover:shadow-lg transition-all cursor-pointer`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Eco-Friendly Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts
            .map((product, index) => (
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
                        onToggleWishlist(product);
                      }}
                    >
                      <Heart
                        className="h-5 w-5"
                        fill={
                          wishlist.some((p) => p.id === product.id)
                            ? '#EF4444'
                            : 'none'
                        }
                        stroke={
                          wishlist.some((p) => p.id === product.id)
                            ? '#EF4444'
                            : 'currentColor'
                        }
                      />
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
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}