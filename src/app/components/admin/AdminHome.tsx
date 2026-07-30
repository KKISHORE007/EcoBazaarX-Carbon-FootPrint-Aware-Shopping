import { motion } from 'motion/react';
import {
  Package, Users, DollarSign, Leaf, TrendingUp, AlertTriangle,
  ShoppingCart, Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import type { AppState } from '../../App';

type AdminHomeProps = {
  appState: AppState;
};

export default function AdminHome({ appState }: AdminHomeProps) {
  const totalProducts = appState.products.length;
  const totalOrders = appState.orders.length;
  const totalUsers = appState.users.filter(u => u.role === 'user').length;
  const totalRevenue = appState.orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalCO2 = appState.orders.reduce((sum, order) => sum + order.totalCO2, 0);
  const lowStockProducts = appState.products.filter(p => p.stock < 20).length;
  const outOfStockProducts = appState.products.filter(p => p.stock === 0).length;
  const pendingOrders = appState.orders.filter(o => o.status === 'pending').length;

  // Monthly revenue (mock data for current month)
  const currentMonth = new Date().getMonth();
  const monthlyRevenue = totalRevenue;

  // Category data for pie chart
  const categoryData = appState.products.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#2E7D32', '#69F0AE', '#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9', '#1B5E20', '#388E3C'];

  // CO2 by category
  const co2ByCategory = appState.products.reduce((acc, product) => {
    const existing = acc.find(item => item.category === product.category);
    if (existing) {
      existing.co2 += product.co2;
    } else {
      acc.push({ category: product.category, co2: product.co2 });
    }
    return acc;
  }, [] as { category: string; co2: number }[]);

  // Order status data
  const orderStatusData = [
    { status: 'Pending', count: appState.orders.filter(o => o.status === 'pending').length },
    { status: 'Packed', count: appState.orders.filter(o => o.status === 'packed').length },
    { status: 'Shipped', count: appState.orders.filter(o => o.status === 'shipped').length },
    { status: 'Delivered', count: appState.orders.filter(o => o.status === 'delivered').length },
  ];

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      change: '+12%',
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      change: '+23%',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-100 text-green-600',
      change: '+18%',
    },
    {
      title: 'Monthly Revenue',
      value: `₹${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
      change: '+31%',
    },
    {
      title: 'Total CO₂ Saved',
      value: `${(500 - totalCO2).toFixed(1)} kg`,
      icon: Leaf,
      color: 'bg-green-100 text-green-600',
      change: '+8%',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
      change: '',
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockProducts,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      change: '',
    },
    {
      title: 'Out of Stock',
      value: outOfStockProducts,
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
      change: '',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  {stat.change && (
                    <span className="text-green-600 text-sm font-semibold">
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Order Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#69F0AE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* CO2 Analytics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            CO₂ Footprint by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={co2ByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis label={{ value: 'CO₂ (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="co2" fill="#2E7D32" name="Total CO₂ (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      {(lowStockProducts > 0 || outOfStockProducts > 0 || pendingOrders > 0) && (
        <Card className="shadow-lg border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingOrders > 0 && (
              <div className="flex items-center gap-2 text-orange-800">
                <ShoppingCart className="h-4 w-4" />
                <span>{pendingOrders} pending orders require attention</span>
              </div>
            )}
            {lowStockProducts > 0 && (
              <div className="flex items-center gap-2 text-orange-800">
                <Package className="h-4 w-4" />
                <span>{lowStockProducts} products are running low on stock</span>
              </div>
            )}
            {outOfStockProducts > 0 && (
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <span>{outOfStockProducts} products are out of stock</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="shadow-lg bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Quick Insights</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-white/80 mb-1">Average Order Value</p>
              <p className="text-2xl font-bold">
                ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-1">Average CO₂ per Order</p>
              <p className="text-2xl font-bold">
                {totalOrders > 0 ? (totalCO2 / totalOrders).toFixed(1) : 0} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-1">Products per Category</p>
              <p className="text-2xl font-bold">
                {categoryData.length > 0 ? (totalProducts / categoryData.length).toFixed(0) : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
