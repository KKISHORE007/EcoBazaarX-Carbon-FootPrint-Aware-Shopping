import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import { Toaster } from './components/ui/sonner';
import { initialProducts } from './data/products';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  photo?: string;
  ecoPoints: number;
  totalCO2: number;
  ecoBadges: string[];
  password: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  co2: number;
  description: string;
  stock: number;
  color: string[];
  sizes?: string[];
  category: string;
  image: string;
  rating: number;
  reviews: Review[];
  deliveryCharge: number;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalPrice: number;
  totalCO2: number;
  subtotal: number;
  deliveryCharges: number;
  tax: number;
  discount: number;
  ecoPointsEarned: number;
  status: 'pending' | 'packed' | 'shipped' | 'delivered';
  reviewGiven: boolean; // ✅ ADD THIS
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMode: string;
  date: string;
};


export type CartItem = {
  product: Product;
  quantity: number;
};

export type AppState = {
  users: User[];
  products: Product[];
  orders: Order[];
  currentUser: User | null;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const [appState, setAppState] = useState<AppState>({
    users: [],
    products: [],
    orders: [],
    currentUser: null,
  });

  useEffect(() => {
    // Load from localStorage
    const savedState = localStorage.getItem('ecoBazaarState');
    if (savedState) {
      setAppState(JSON.parse(savedState));
    } else {
      // Initialize with demo data
      initializeData();
    }

    // Hide splash after 3 seconds
    setTimeout(() => setShowSplash(false), 3000);
  }, []);

  useEffect(() => {
    // Save to localStorage whenever state changes
    localStorage.setItem('ecoBazaarState', JSON.stringify(appState));
  }, [appState]);

  const initializeData = () => {
    const demoProducts: Product[] = initialProducts;

    setAppState({
      users: [],
      products: demoProducts,
      orders: [],
      currentUser: null,
    });
  };

  const handleLogin = (user: User) => {
  setLoading(true);
  setTimeout(() => {
    setAppState(prev => ({
      ...prev,
      currentUser: user,
    }));
    setLoading(false);
  }, 1500);
};

  const handleLogout = () => {
  setLoading(true);
  setTimeout(() => {
    setAppState(prev => ({
      ...prev,
      currentUser: null,
    }));
    setLoading(false);
  }, 1000);
};


  const updateAppState = (newState: Partial<AppState>) => {
  setAppState(prev => ({
    ...prev,
    ...newState,
  }));
};


  if (showSplash) {
    return <SplashScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!appState.currentUser) {
    return (
      <>
        <AuthScreen appState={appState} updateAppState={updateAppState} onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  if (appState.currentUser.role === 'admin') {
    return (
      <>
        <AdminDashboard appState={appState} updateAppState={updateAppState} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <UserDashboard appState={appState} updateAppState={updateAppState} onLogout={handleLogout} />
      <Toaster />
    </>
  );
}

export default App;