import { useState } from 'react';
import { Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import type { AppState, Order } from '../../App';
import { toast } from 'sonner';

type AdminOrdersProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function AdminOrders({ appState, updateAppState }: AdminOrdersProps) {
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = appState.orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    updateAppState({ orders: updatedOrders });
    toast.success('Order status updated!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-600';
      case 'shipped': return 'bg-blue-600';
      case 'packed': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders Management</h2>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Orders ({appState.orders.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appState.orders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No orders yet</p>
          ) : (
            appState.orders.map((order) => (
              <Card key={order.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">Order #{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Customer: {order.userName}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Address: {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                      </p>
                      <p className="text-sm text-gray-600">Payment: {order.paymentMode.toUpperCase()}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-2 bg-white rounded p-2">
                            <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-cover rounded" />
                            <div className="text-xs">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-xl text-[#2E7D32]">₹{order.totalPrice}</p>
                      <p className="text-sm text-gray-600">CO₂: {order.totalCO2.toFixed(1)} kg</p>
                      <Select value={order.status} onValueChange={(status: any) => updateOrderStatus(order.id, status)}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="packed">Packed</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
