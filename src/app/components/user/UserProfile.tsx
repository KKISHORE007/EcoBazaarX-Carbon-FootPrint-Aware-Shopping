import { useState } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Edit, Package, TrendingUp, Award, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import type { User, Order, AppState } from '../../App';
import { toast } from 'sonner';

type UserProfileProps = {
  user: User;
  orders: Order[];
  updateAppState: (newState: Partial<AppState>) => void;
  appState: AppState;
};

export default function UserProfile({ user, orders, updateAppState, appState }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const totalCO2 = orders.reduce((sum, order) => sum + order.totalCO2, 0);
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const ecoPoints = Math.floor(orders.length * 10 + (50 - totalCO2) * 5);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name, phone, ecoPoints, totalCO2 };
    const updatedUsers = appState.users.map((u) =>
      u.id === user.id ? updatedUser : u
    );
    updateAppState({ users: updatedUsers, currentUser: updatedUser });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-600';
      case 'shipped':
        return 'bg-blue-600';
      case 'packed':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] text-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarFallback className="bg-white text-[#2E7D32] text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="text-white/90 mb-1">{user.email}</p>
              <p className="text-white/90">{user.phone}</p>
            </div>
            <Button
              variant="outline"
              className="bg-white text-[#2E7D32] hover:bg-white/90"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  className="bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Eco Points</p>
                <p className="text-3xl font-bold text-green-600">{ecoPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold text-purple-600">₹{totalSpent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eco Level Progress */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Eco Warrior Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Level: {Math.floor(ecoPoints / 100)}</span>
              <span>Next Level: {Math.floor(ecoPoints / 100) + 1}</span>
            </div>
            <Progress value={(ecoPoints % 100)} className="h-3" />
            <p className="text-sm text-gray-600">
              {100 - (ecoPoints % 100)} points to next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold">Order #{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {order.items.map((item) => (
                            <div
                              key={item.product.id}
                              className="flex items-center gap-2 bg-white rounded-md p-2"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-10 w-10 object-cover rounded"
                              />
                              <div className="text-sm">
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-[#2E7D32]">
                          ₹{order.totalPrice}
                        </p>
                        <p className="text-sm text-gray-600">
                          CO₂: {order.totalCO2.toFixed(1)} kg
                        </p>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        {['pending', 'packed', 'shipped', 'delivered'].map((status, idx) => (
                          <div key={status} className="flex items-center">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                ['pending', 'packed', 'shipped', 'delivered'].indexOf(order.status) >= idx
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}
                            >
                              {idx + 1}
                            </div>
                            {idx < 3 && (
                              <div
                                className={`h-1 w-12 md:w-24 ${
                                  ['pending', 'packed', 'shipped', 'delivered'].indexOf(order.status) > idx
                                    ? 'bg-green-600'
                                    : 'bg-gray-300'
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>Pending</span>
                        <span>Packed</span>
                        <span>Shipped</span>
                        <span>Delivered</span>
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
