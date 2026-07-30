import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Check, Leaf, Gift, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import type { CartItem, AppState, Order } from '../../App';
import { toast } from 'sonner';


type UserCartProps = {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function UserCart({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  appState,
  updateAppState,
}: UserCartProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Checkout form
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMode, setPaymentMode] = useState('cod');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharges = cart.reduce((sum, item) => sum + (item.product.deliveryCharge || 0) * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const totalCO2 = cart.reduce((sum, item) => sum + item.product.co2 * item.quantity, 0);
  
  // NEW ECO POINTS CALCULATION
  const calculateEcoPoints = (co2: number) => {
    if (co2 <= 10) {
      return Math.floor(co2 * 10); // 10 points per kg up to 10 kg
    } else {
      const first10kg = 10 * 10; // 100 points for first 10 kg
      const excess = co2 - 10;
      const penalty = Math.floor(excess * 2); // -2 points per kg above 10
      return first10kg - penalty;
    }
  };

  const ecoPointsEarned = calculateEcoPoints(totalCO2);
  const total = subtotal + deliveryCharges + tax - discount;
  

  // Get alternative low CO2 products
  const getAlternativeProducts = () => {
    const cartProductIds = cart.map(item => item.product.id);
    const cartCategories = [...new Set(cart.map(item => item.product.category))];
    
    return appState.products
      .filter(p => 
        !cartProductIds.includes(p.id) && // Not in cart
        cartCategories.includes(p.category) && // Same category as cart items
        p.co2 < 2 && // Low CO2
        p.stock > 0 // In stock
      )
      .sort((a, b) => a.co2 - b.co2)
      .slice(0, 4); // Top 4 alternatives
  };

  const alternativeProducts = getAlternativeProducts();

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ECO10') {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success('Coupon applied! 10% discount');
    } else if (couponCode.toUpperCase() === 'GREEN50') {
      setDiscount(50);
      toast.success('Coupon applied! ₹50 off');
    } else if (couponCode.toUpperCase() === 'SAVE100') {
      setDiscount(100);
      toast.success('Coupon applied! ₹100 off');
    } else {
      toast.error('Invalid coupon code');
    }
  };
  
  
  const handleCheckout = () => {
    if (!street || !city || !state || !pincode) {
      toast.error('Please fill in all address fields');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

  // Create order
  const newOrder: Order = {
    id: Date.now().toString(),
    userId: appState.currentUser!.id,
    userName: appState.currentUser!.name,
    items: cart,
    totalPrice: total,
    totalCO2: totalCO2,
    subtotal: subtotal,
    deliveryCharges: deliveryCharges,
    tax: tax,
    discount: discount,
    ecoPointsEarned: ecoPointsEarned,
    status: 'pending',
    address: { street, city, state, pincode },
    paymentMode,
    date: new Date().toISOString(),
    reviewGiven: false,
  };

  // Update user eco points
  const updatedCurrentUser = appState.currentUser
    ? { ...appState.currentUser, ecoPoints: (appState.currentUser.ecoPoints || 0) + ecoPointsEarned }
    : null;

  const updatedUsers = appState.users.map(user =>
    user.id === appState.currentUser?.id
      ? { ...user, ecoPoints: (user.ecoPoints || 0) + ecoPointsEarned }
      : user
  );

    updateAppState({ 
      orders: [...appState.orders, newOrder],
      users: updatedUsers,
      currentUser: updatedCurrentUser
    });
    
    setShowCheckout(false);
    setShowSuccess(true);
    
  setTimeout(() => {
    clearCart();
    setShowSuccess(false);
    toast.success(`+${ecoPointsEarned} Eco Points earned!`);
  }, 3000);
};

  const getCO2Level = () => {
    if (totalCO2 < 10) return { 
      text: 'Excellent!', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      image: 'https://friendlystock.com/wp-content/uploads/2019/09/6-happy-earth-cartoon-clipart.jpg'
    };
    if (totalCO2 < 20) return { 
      text: 'Good', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      image: 'https://friendlystock.com/wp-content/uploads/2019/09/6-happy-earth-cartoon-clipart.jpg'
    };
    if (totalCO2 < 30) return { 
      text: 'Moderate', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50',
      image: 'https://friendlystock.com/wp-content/uploads/2019/09/9-sad-earth-cartoon-clipart.jpg'
    };
    return { 
      text: 'High', 
      color: 'text-red-600', 
      bgColor: 'bg-red-50',
      image: 'https://friendlystock.com/wp-content/uploads/2019/09/9-sad-earth-cartoon-clipart.jpg'
    };
  };

  const co2Level = getCO2Level();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <ShoppingBag className="h-32 w-32 text-gray-300 mb-4" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Add some eco-friendly products to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>
        
        <div className="space-y-4">
          {cart.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        {item.product.co2}kg
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">{item.product.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">₹{item.product.price} × {item.quantity}</p>
                          <p className="text-2xl font-bold text-[#2E7D32]">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Summary - Sticky */}
      <div className="md:col-span-1">
        <div className="sticky top-20 space-y-4">
          {/* Earth CO2 Indicator */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Card className={`shadow-xl border-2 ${co2Level.bgColor} border-green-200`}>
              <CardContent className="p-6 text-center">
                <motion.img
                  src={co2Level.image}
                  alt="Earth"
                  className="w-32 h-32 mx-auto mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="text-3xl font-bold">{totalCO2.toFixed(1)} kg</span>
                </div>
                <p className={`text-lg font-semibold ${co2Level.color}`}>
                  Carbon Footprint: {co2Level.text}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2 bg-white/50 rounded-lg p-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">+{ecoPointsEarned} Eco Points</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bill Summary */}
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] text-white">
              <CardTitle>Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-green-600">
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>GST (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Gift className="h-4 w-4" />
                      Discount
                    </span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-[#2E7D32]">₹{total.toFixed(2)}</span>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 text-sm">
                  <p className="text-green-700 font-medium">
                    💰 You'll save ₹{discount} on this order!
                  </p>
                </div>
              </div>

              {/* Coupon */}
              <Separator className="my-4" />
              <div>
                <Label className="text-sm font-semibold">Have a Coupon?</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="uppercase"
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyCoupon}
                    className="bg-green-50 hover:bg-green-100"
                  >
                    Apply
                  </Button>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-500">Try these codes:</p>
                  <p className="text-xs font-medium text-green-600">• ECO10 - 10% off</p>
                  <p className="text-xs font-medium text-green-600">• GREEN50 - ₹50 off</p>
                  <p className="text-xs font-medium text-green-600">• SAVE100 - ₹100 off</p>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] hover:from-[#1B5E20] hover:to-[#4CAF50] text-white font-bold py-6 text-lg shadow-lg"
                onClick={() => setShowCheckout(true)}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Your Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="street" className="text-sm font-semibold">Street Address *</Label>
              <Input
                id="street"
                placeholder="123 Main Street, Apartment 4B"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-semibold">City *</Label>
                <Input
                  id="city"
                  placeholder="Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-semibold">State *</Label>
                <Input
                  id="state"
                  placeholder="Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pincode" className="text-sm font-semibold">Pincode *</Label>
              <Input
                id="pincode"
                placeholder="400001"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="mt-1"
              />
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-semibold">Payment Method *</Label>
              <RadioGroup value={paymentMode} onValueChange={setPaymentMode} className="mt-3 space-y-3">
                <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI (GPay, PhonePe, Paytm)</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-xl text-[#2E7D32]">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Carbon Footprint:</span>
                <span className="font-semibold">{totalCO2.toFixed(1)} kg CO₂</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Eco Points:</span>
                <span className="font-semibold text-green-600">+{ecoPointsEarned} points</span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] hover:from-[#1B5E20] hover:to-[#4CAF50] text-white font-bold py-6 text-lg"
              onClick={handleCheckout}
            >
              <Check className="h-5 w-5 mr-2" />
              Place Order - ₹{total.toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="bg-green-100 rounded-full p-8 mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
              }}
            >
              <Check className="h-20 w-20 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-green-600 mb-3">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your eco-friendly order has been successfully placed
            </p>
            
            <div className="space-y-3 w-full">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium mb-2">
                  🌍 Environmental Impact
                </p>
                <p className="text-xs text-green-600">
                  You've made a conscious choice that reduces {totalCO2.toFixed(1)} kg of carbon emissions!
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-medium mb-2">
                  🎁 Rewards Earned
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  +{ecoPointsEarned} Eco Points
                </p>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
