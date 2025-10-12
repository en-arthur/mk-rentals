'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, isUpdating } = useCart();
  const { showToast } = useToast();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const calculateRentalPeriod = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return {
      startDate,
      endDate,
      days: diffDays,
    };
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const rentalPeriod = calculateRentalPeriod();
      addToCart(product, quantity, rentalPeriod);
      showToast(`${product.name} (×${quantity}) added to cart`, 'success');
    } finally {
      // Wait for cart update to complete
      setTimeout(() => setIsAddingToCart(false), 400);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <Card>
        <CardContent className="p-6">
          <Label className="text-base font-semibold mb-3 block">
            How many do you need?
          </Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center font-semibold"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rental Period Selector */}
      <Card>
        <CardContent className="p-6">
          <Label className="text-base font-semibold mb-3 block">
            Rental Period (Optional)
          </Label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm">From</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm">To</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {startDate && endDate && (
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Duration:</span>
                <span className="font-semibold">
                  {calculateRentalPeriod()?.days} day{calculateRentalPeriod()?.days !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          size="lg" 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={isAddingToCart || isUpdating}
        >
          {isAddingToCart || isUpdating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Adding to Cart...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Quote Cart
            </>
          )}
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href={`/quote?productId=${product.id}`}>
            <Package className="mr-2 h-5 w-5" />
            Request Quote Directly
          </Link>
        </Button>
      </div>
    </div>
  );
}
