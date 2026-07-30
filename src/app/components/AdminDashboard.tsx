import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Home, User, Info, MessageCircle, Package, Trash2, Edit,
  DollarSign, Star, TrendingUp, LogOut, Menu, X, Leaf, ShoppingBag
} from 'lucide-react';
import { Button } from './ui/button';
import type { AppState } from '../App';

import AdminHome from './admin/AdminHome';
import AdminProfile from './admin/AdminProfile';
import AdminAbout from './admin/AdminAbout';
import AdminSupport from './admin/AdminSupport';
import AdminAddProduct from './admin/AdminAddProduct';
import AdminManageProducts from './admin/AdminManageProducts';
import AdminEditPrice from './admin/AdminEditPrice';
import AdminReviews from './admin/AdminReviews';
import AdminOrders from './admin/AdminOrders';
import AdminStock from './admin/AdminStock';

type AdminDashboardProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
  onLogout: () => void;
};

export default function AdminDashboard({ appState, updateAppState, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'about' | 'support' | 'add-product' | 'manage-products' | 'edit-price' | 'reviews' | 'orders' | 'stock'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: 'Dashboard', icon: Home },
    { id: 'add-product' as const, label: 'Add Product', icon: Package },
    { id: 'manage-products' as const, label: 'Manage Products', icon: ShoppingBag },
    { id: 'edit-price' as const, label: 'Edit Prices', icon: DollarSign },
    { id: 'orders' as const, label: 'Orders', icon: TrendingUp },
    { id: 'stock' as const, label: 'Stock', icon: Package },
    { id: 'reviews' as const, label: 'Reviews', icon: Star },
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'about' as const, label: 'About', icon: Info },
    { id: 'support' as const, label: 'Support', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50 relative overflow-hidden">
      {/* CO2 Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-200/15 rounded-full flex items-center justify-center text-xs text-green-700/30"
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
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            CO₂
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="https://media.istockphoto.com/id/1389111152/vector/shopping-cart-with-a-leaf-inside-circle-organic-shop-icon.jpg?s=612x612&w=0&k=20&c=TjNiLnPB7eUEni6mlvyTWd80LJdO8zig5DmKiHz8Lkk="
                alt="EcoBazaar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#69F0AE] to-[#2E7D32] bg-clip-text text-transparent">
                  EcoBazaar
                </span>
                <span className="block text-xs text-gray-600">Admin Panel</span>
              </div>
            </div>

            {/* Desktop Quick Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 4).map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={activeTab === item.id ? 'bg-[#69F0AE] text-black' : ''}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="hidden sm:flex"
              >
                <LogOut className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
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
              className="lg:hidden mt-4 pb-4 border-t pt-4"
            >
              <nav className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start ${activeTab === item.id ? 'bg-[#69F0AE] text-black' : ''}`}
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
                  className="justify-start text-red-600 col-span-2"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 min-h-screen bg-white/60 backdrop-blur-sm border-r sticky top-16 self-start">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === item.id ? 'bg-[#69F0AE] text-black' : ''
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
          {activeTab === 'home' && (
            <AdminHome appState={appState} />
          )}
          {activeTab === 'profile' && (
            <AdminProfile user={appState.currentUser!} />
          )}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'support' && <AdminSupport />}
          {activeTab === 'add-product' && (
            <AdminAddProduct appState={appState} updateAppState={updateAppState} />
          )}
          {activeTab === 'manage-products' && (
            <AdminManageProducts appState={appState} updateAppState={updateAppState} />
          )}
          {activeTab === 'edit-price' && (
            <AdminEditPrice appState={appState} updateAppState={updateAppState} />
          )}
          {activeTab === 'reviews' && (
            <AdminReviews appState={appState} updateAppState={updateAppState} />
          )}
          {activeTab === 'orders' && (
            <AdminOrders appState={appState} updateAppState={updateAppState} />
          )}
          {activeTab === 'stock' && (
            <AdminStock appState={appState} updateAppState={updateAppState} />
          )}
        </main>
      </div>
    </div>
  );
}