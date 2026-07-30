import { useState } from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import type { AppState } from '../../App';
import { toast } from 'sonner';

type AdminStockProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
};

export default function AdminStock({ appState, updateAppState }: AdminStockProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStock, setNewStock] = useState('');

  const lowStockProducts = appState.products.filter(p => p.stock < 20 && p.stock > 0);
  const outOfStockProducts = appState.products.filter(p => p.stock === 0);

  const handleStockUpdate = (productId: string) => {
    const stock = parseInt(newStock);
    if (isNaN(stock) || stock < 0) {
      toast.error('Please enter a valid stock number');
      return;
    }

    const updatedProducts = appState.products.map(p =>
      p.id === productId ? { ...p, stock } : p
    );

    updateAppState({ products: updatedProducts });
    toast.success('Stock updated successfully!');
    setEditingId(null);
    setNewStock('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Stock Management</h2>

      {/* Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Low Stock ({lowStockProducts.length})
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Out of Stock ({outOfStockProducts.length})
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Products Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appState.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      {editingId === product.id ? (
                        <Input
                          type="number"
                          className="w-20"
                          value={newStock}
                          onChange={(e) => setNewStock(e.target.value)}
                        />
                      ) : (
                        <span className={product.stock === 0 ? 'text-red-600 font-bold' : product.stock < 20 ? 'text-yellow-600 font-semibold' : ''}>
                          {product.stock}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.stock === 0 ? (
                        <Badge className="bg-red-600">Out of Stock</Badge>
                      ) : product.stock < 20 ? (
                        <Badge className="bg-yellow-600">Low Stock</Badge>
                      ) : (
                        <Badge className="bg-green-600">In Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === product.id ? (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleStockUpdate(product.id)}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(product.id);
                            setNewStock(product.stock.toString());
                          }}
                        >
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
