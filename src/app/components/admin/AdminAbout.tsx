import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Shield, Settings, BarChart } from 'lucide-react';

export default function AdminAbout() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About Admin Panel</h2>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Admin Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Full Control</h3>
              <p className="text-gray-600">Manage all products, orders, and customer data from one dashboard.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-gray-600">Track revenue, carbon footprint, and customer behavior with detailed charts.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Easy Management</h3>
              <p className="text-gray-600">Add, edit, and remove products with a simple interface.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
