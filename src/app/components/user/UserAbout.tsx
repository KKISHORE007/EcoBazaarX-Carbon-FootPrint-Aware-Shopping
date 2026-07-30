import { motion } from 'motion/react';
import { Leaf, Heart, Users, Target, Award, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function UserAbout() {
  const features = [
    {
      icon: Leaf,
      title: 'Eco-Friendly Products',
      description: 'Curated selection of sustainable products with transparent carbon footprint data',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Heart,
      title: 'Planet First',
      description: 'Every purchase contributes to a healthier planet for future generations',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of eco-warriors making conscious shopping choices',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Target,
      title: 'Transparent Impact',
      description: 'Track your carbon footprint and see the difference you are making',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Eco Products', icon: ShoppingBag },
    { value: '50,000+', label: 'Happy Customers', icon: Users },
    { value: '500 Tons', label: 'CO₂ Saved', icon: Leaf },
    { value: '100+', label: 'Eco Brands', icon: Award },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] bg-clip-text text-transparent mb-4">
          About EcoBazaar
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted marketplace for sustainable living. We believe that every purchase is a vote for the kind of world we want to live in.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <Card className="shadow-xl bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] text-white">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Leaf size={100} className="text-white/90" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                To make sustainable shopping accessible, transparent, and rewarding. We connect conscious consumers with eco-friendly brands, providing detailed carbon footprint information for every product. Our goal is to reduce global carbon emissions one purchase at a time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-lg text-center">
              <CardContent className="p-6">
                <stat.icon className="h-12 w-12 mx-auto mb-3 text-[#2E7D32]" />
                <p className="text-3xl font-bold text-[#2E7D32] mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose EcoBazaar?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Commitment */}
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Commitment to Sustainability</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              🌱 <strong>Carbon Transparency:</strong> Every product displays its carbon footprint, calculated from production to delivery.
            </p>
            <p>
              🌱 <strong>Verified Eco Brands:</strong> We partner only with brands that meet strict sustainability criteria.
            </p>
            <p>
              🌱 <strong>Sustainable Packaging:</strong> All our shipments use biodegradable or recyclable packaging materials.
            </p>
            <p>
              🌱 <strong>Carbon Offset Programs:</strong> A portion of every sale goes to environmental restoration projects.
            </p>
            <p>
              🌱 <strong>Education:</strong> We provide resources to help you make informed, eco-conscious decisions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="shadow-xl bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800 mb-3">
            Join the Green Revolution
          </h2>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Together, we can create a sustainable future. Every eco-friendly purchase you make is a step towards a healthier planet. Thank you for being part of our community!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
