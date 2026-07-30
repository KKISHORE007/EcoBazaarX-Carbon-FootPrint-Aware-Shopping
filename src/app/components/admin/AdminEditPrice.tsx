import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import type { AppState } from '../../App';
import { toast } from 'sonner';

type AdminEditPriceProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function AdminEditPrice({ appState, updateAppState }: AdminEditPriceProps) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [newPrice, setNewPrice] = useState<number[]>([0]);

  const selectedProduct = appState.products.find(p => p.id === selectedProductId);

  const handlePriceUpdate = () => {
    if (!selectedProductId) {
      toast.error('Please select a product');
      return;
    }

    const updatedProducts = appState.products.map(p =>
      p.id === selectedProductId ? { ...p, price: newPrice[0] } : p
    );

    updateAppState({ products: updatedProducts });
    toast.success('Price updated successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Edit Product Prices</h2>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[#69F0AE]" />
            Update Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Select Product</Label>
            <Select value={selectedProductId} onValueChange={(id) => {
              setSelectedProductId(id);
              const product = appState.products.find(p => p.id === id);
              if (product) setNewPrice([product.price]);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a product" />
              </SelectTrigger>
              <SelectContent>
                {appState.products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - ₹{product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProduct && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-20 w-20 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-600">{selectedProduct.brand}</p>
                    <p className="text-sm text-gray-600">Current Price: ₹{selectedProduct.price}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>New Price: ₹{newPrice[0]}</Label>
                <Slider
                  min={0}
                  max={10000}
                  step={10}
                  value={newPrice}
                  onValueChange={setNewPrice}
                  className="mt-4"
                />
              </div>

              <div>
                <Label>Or Enter Exact Price</Label>
                <Input
                  type="number"
                  value={newPrice[0]}
                  onChange={(e) => setNewPrice([parseFloat(e.target.value) || 0])}
                />
              </div>

              <Button onClick={handlePriceUpdate} className="w-full bg-[#69F0AE] text-black hover:bg-[#4CAF50]">
                Update Price
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
