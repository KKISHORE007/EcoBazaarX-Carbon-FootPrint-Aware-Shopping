import { useEffect } from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, User, Info, Search, MessageCircle, ShoppingCart, Heart, Leaf,
  LogOut, Menu, X
} from 'lucide-react';
import { Button } from './ui/button';
import type { AppState, Product, CartItem } from '../App';

import UserHome from './user/UserHome';
import UserProfile from './user/UserProfile';
import UserAbout from './user/UserAbout';
import UserSearch from './user/UserSearch';
import UserSupport from './user/UserSupport';
import UserCart from './user/UserCart';
import UserWishlist from './user/UserWishlist';
import UserCarbonFootprint from './user/UserCarbonFootprint';
import ProductDetail from './user/ProductDetail';

type UserDashboardProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
  onLogout: () => void;
};

export default function UserDashboard({ appState, updateAppState, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'about' | 'search' | 'support' | 'cart' | 'wishlist' | 'carbon'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔹 Load cart & wishlist when user logs in
  useEffect(() => {
    if (!appState.currentUser) return;

    const savedCart = localStorage.getItem(
      `cart_${appState.currentUser.id}`
    );
    const savedWishlist = localStorage.getItem(
      `wishlist_${appState.currentUser.id}`
    );

    setCart(savedCart ? JSON.parse(savedCart) : []);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, [appState.currentUser]);

  // 🔹 Save cart when it changes
  useEffect(() => {
    if (!appState.currentUser) return;

    localStorage.setItem(
      `cart_${appState.currentUser.id}`,
      JSON.stringify(cart)
    );
  }, [cart, appState.currentUser]);

  // 🔹 Save wishlist when it changes
  useEffect(() => {
    if (!appState.currentUser) return;

    localStorage.setItem(
      `wishlist_${appState.currentUser.id}`,
      JSON.stringify(wishlist)
    );
  }, [wishlist, appState.currentUser]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCO2 = cart.reduce((sum, item) => sum + item.product.co2 * item.quantity, 0);

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.find((p) => p.id === product.id)) {
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        allProducts={appState.products}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={wishlist.some((p) => p.id === selectedProduct.id)}
      />
    );
  }

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'about' as const, label: 'About', icon: Info },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'support' as const, label: 'Support', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#A5D6A7] to-white relative overflow-hidden">
      {/* CO2 Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="https://media.istockphoto.com/id/1389111152/vector/shopping-cart-with-a-leaf-inside-circle-organic-shop-icon.jpg?s=612x612&w=0&k=20&c=TjNiLnPB7eUEni6mlvyTWd80LJdO8zig5DmKiHz8Lkk="
                alt="EcoBazaar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] bg-clip-text text-transparent">
                EcoBazaar
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={activeTab === item.id ? 'bg-[#2E7D32]' : ''}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Carbon Footprint Button */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-green-600 text-green-700 hover:bg-green-50"
                onClick={() => setActiveTab('carbon')}
              >
                <Leaf className="h-4 w-4 mr-1" />
                Carbon
              </Button>

              {/* Wishlist */}
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart className="h-5 w-5" fill={wishlist.length > 0 ? '#EF4444' : 'none'} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setActiveTab('cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#2E7D32] text-white rounded-full flex flex-col items-center justify-center p-1 min-w-[28px]">
                    <span className="text-[10px] leading-none">{cart.length}</span>
                    <span className="text-[8px] leading-none">CO₂:{cartCO2.toFixed(1)}</span>
                  </div>
                )}
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="icon" onClick={onLogout} className="hidden sm:flex">
                <LogOut className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start ${activeTab === item.id ? 'bg-[#2E7D32]' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setActiveTab('carbon');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  Carbon Footprint
                </Button>
                <Button variant="ghost" className="justify-start text-red-600" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {activeTab === 'home' && (
          <UserHome
            products={appState.products}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {activeTab === 'profile' && (
          <UserProfile
            user={appState.currentUser!}
            orders={appState.orders.filter((o) => o.userId === appState.currentUser!.id)}
            updateAppState={updateAppState}
            appState={appState}
          />
        )}
        {activeTab === 'about' && <UserAbout />}
        {activeTab === 'search' && (
          <UserSearch
            products={appState.products}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {activeTab === 'support' && <UserSupport />}
        {activeTab === 'cart' && (
          <UserCart
            cart={cart}
            updateQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            appState={appState}
            updateAppState={updateAppState}
          />
        )}
        {activeTab === 'wishlist' && (
          <UserWishlist
            wishlist={wishlist}
            onProductClick={setSelectedProduct}
            onRemoveFromWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        )}
        {activeTab === 'carbon' && (
          <UserCarbonFootprint
            user={appState.currentUser!}
            orders={appState.orders.filter((o) => o.userId === appState.currentUser!.id)}
          />
        )}
      </main>
    </div>
  );
}