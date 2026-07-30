import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Mail, Phone, HelpCircle } from 'lucide-react';

export default function AdminSupport() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Support</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-600">admin@ecobazaar.com</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+91 1800-ADMIN</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Help Desk</h3>
            <p className="text-gray-600">24/7 Support</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Quick Admin Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>✓ Use the Dashboard to monitor overall business metrics</p>
          <p>✓ Add new products with complete details including CO₂ values</p>
          <p>✓ Update order statuses to keep customers informed</p>
          <p>✓ Monitor stock levels and restock low inventory items</p>
          <p>✓ Review customer feedback and ratings</p>
        </CardContent>
      </Card>
    </div>
  );
}
