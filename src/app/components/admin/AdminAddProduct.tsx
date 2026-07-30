import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { AppState, Product } from '../../App';
import { toast } from 'sonner';

type AdminAddProductProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function AdminAddProduct({ appState, updateAppState }: AdminAddProductProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [co2, setCo2] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const categories = ['Clothing', 'Accessories', 'Bags', 'Electronics', 'Kitchen', 'Sports', 'Beauty', 'Stationery', 'Footwear'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !brand || !price || !co2 || !description || !stock || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      brand,
      price: parseFloat(price),
      co2: parseFloat(co2),
      description,
      stock: parseInt(stock),
      color: color.split(',').map(c => c.trim()).filter(c => c),
      category,
      image: imageUrl || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400`,
      rating: 4.5,
      reviews: [],
    };

    updateAppState({ products: [...appState.products, newProduct] });
    toast.success('Product added successfully!');

    // Reset form
    setName('');
    setBrand('');
    setPrice('');
    setCo2('');
    setDescription('');
    setStock('');
    setColor('');
    setCategory('');
    setImageUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-[#69F0AE]" />
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Eco-Friendly T-Shirt"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    placeholder="EcoWear"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="co2">CO₂ Value (kg) *</Label>
                  <Input
                    id="co2"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={co2}
                    onChange={(e) => setCo2(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="100"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Colors (comma-separated)</Label>
                  <Input
                    id="color"
                    placeholder="White, Green, Blue"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the product and its eco-friendly features..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use default image
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#69F0AE] text-black hover:bg-[#4CAF50]">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
