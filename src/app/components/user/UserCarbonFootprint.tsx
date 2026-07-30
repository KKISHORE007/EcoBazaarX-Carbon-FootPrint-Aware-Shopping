import { motion } from 'motion/react';
import { Leaf, TrendingDown, Award, Earth } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import type { User, Order } from '../../App';

type UserCarbonFootprintProps = {
  user: User;
  orders: Order[];
};

export default function UserCarbonFootprint({ user, orders }: UserCarbonFootprintProps) {
  const totalCO2 = orders.reduce((sum, order) => sum + order.totalCO2, 0);
  
  // Category breakdown
  const categoryBreakdown = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      const category = item.product.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += item.product.co2 * item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]);

  const getCO2Rating = () => {
    if (totalCO2 < 20) return { 
      rating: 'Excellent', 
      emoji: '😊', 
      color: 'text-green-600', 
      earth: 'https://friendlystock.com/wp-content/uploads/2019/09/6-happy-earth-cartoon-clipart.jpg'
    };
    if (totalCO2 < 50) return { 
      rating: 'Good', 
      emoji: '🙂', 
      color: 'text-blue-600', 
      earth: 'https://friendlystock.com/wp-content/uploads/2019/09/6-happy-earth-cartoon-clipart.jpg'
    };
    if (totalCO2 < 100) return { 
      rating: 'Moderate', 
      emoji: '😐', 
      color: 'text-yellow-600', 
      earth: 'https://friendlystock.com/wp-content/uploads/2019/09/9-sad-earth-cartoon-clipart.jpg'
    };
    return { 
      rating: 'High', 
      emoji: '😟', 
      color: 'text-red-600', 
      earth: 'https://friendlystock.com/wp-content/uploads/2019/09/9-sad-earth-cartoon-clipart.jpg'
    };
  };

  const co2Rating = getCO2Rating();
  const maxCO2 = 100;
  const co2Percentage = Math.min((totalCO2 / maxCO2) * 100, 100);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Carbon Footprint Dashboard</h2>

      {/* Main CO2 Card with Earth Animation */}
      <Card className="shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Earth Animation */}
            <div className="flex-1 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1 }}
                className="relative inline-block"
              >
                <motion.img
                  src={co2Rating.earth}
                  alt="Earth"
                  className="w-64 h-64 object-contain"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <p className={`text-3xl font-bold ${co2Rating.color}`}>
                  {co2Rating.rating}
                </p>
                <p className="text-gray-600 mt-2">Carbon Footprint Rating</p>
              </motion.div>
            </div>

            {/* CO2 Stats */}
            <div className="flex-1">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-4xl font-bold text-gray-800">{totalCO2.toFixed(1)} kg</p>
                    <p className="text-sm text-gray-600">Total CO₂ Emissions</p>
                  </div>
                </div>
                
                <Progress value={co2Percentage} className="h-3 mb-2" />
                <p className="text-xs text-gray-500">
                  {co2Percentage.toFixed(0)}% of 100 kg target
                </p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Eco Points Earned</span>
                    <span className="text-lg font-bold text-green-600">{user.ecoPoints}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Orders</span>
                    <span className="text-lg font-bold text-blue-600">{orders.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">CO₂ Saved</span>
                    <span className="text-lg font-bold text-purple-600">{(500 - totalCO2).toFixed(1)} kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>CO₂ Footprint by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedCategories.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No data available yet</p>
          ) : (
            sortedCategories.map(([category, co2], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category}</span>
                  <span className="text-green-700 font-semibold">{co2.toFixed(1)} kg CO₂</span>
                </div>
                <Progress value={(co2 / totalCO2) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {((co2 / totalCO2) * 100).toFixed(1)}% of total
                </p>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="shadow-lg bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Leaf className="h-5 w-5" />
            Eco Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Look for products with CO₂ values below 2 kg</li>
            <li>✅ Choose items made from recycled or organic materials</li>
            <li>✅ Buy local products to reduce transportation emissions</li>
            <li>✅ Opt for reusable products over single-use items</li>
            <li>✅ Check our "Low Carbon Alternatives" section when shopping</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}