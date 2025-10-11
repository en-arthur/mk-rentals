'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, Plus, ShoppingCart, Phone, MapPin } from 'lucide-react';
import { getProductById } from '@/lib/data/products';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/components/ui/toast';
import { validateQuoteForm } from '@/lib/validation';
import ProductSelectorModal from '@/components/products/product-selector-modal';
import { SITE_CONFIG } from '@/lib/constants';
import GhanaPostGPSDialog from '@/components/location/ghana-post-gps-dialog';

export default function EnhancedQuoteForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const product = productId ? getProductById(productId) : null;

  const { cart, clearCart } = useCart();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    startDate: '',
    endDate: '',
    items: '',
    needsDelivery: false,
    message: ''
  });

  // Prefill items field when product is available or cart has items
  useEffect(() => {
    if (cart.length > 0) {
      const cartItems = cart.map((item) => {
        return `${item.name} (×${item.quantity})`;
      }).join('\n');
      
      setFormData(prev => ({
        ...prev,
        items: cartItems
      }));
    } else if (product) {
      const productDetails = `${product.name}\n\nQuantity: 1`;
      setFormData(prev => ({
        ...prev,
        items: productDetails
      }));
    }
  }, [product, cart]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Send quote request to API
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        showToast('Quote request sent successfully!', 'success');

        // Clear cart after successful submission
        if (cart.length > 0) {
          clearCart();
        }

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            eventType: '',
            eventDate: '',
            eventLocation: '',
            guestCount: '',
            startDate: '',
            endDate: '',
            items: '',
            needsDelivery: false,
            message: ''
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to send quote request');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setIsSubmitting(false);
      showToast(error.message || 'Failed to send quote request. Please try calling us directly.', 'error');
    }
  };

  const calculateRentalDays = () => {
    if (!formData.startDate || !formData.endDate) return null;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const rentalDays = calculateRentalDays();

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Quote Request Received!</h3>
            <p className="text-muted-foreground">
              Thank you for your request. We will contact you shortly with pricing and availability.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Selected Items ({cart.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProductSelectorOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-muted-foreground">
                      Quantity: {item.quantity}
                      {item.rentalPeriod && ` • ${item.rentalPeriod.days} day${item.rentalPeriod.days !== 1 ? 's' : ''}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Summary Card (if coming from single product) */}
      {product && cart.length === 0 && (
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Request a Quote</CardTitle>
          <CardDescription>
            Fill out the form below and we will get back to you with pricing and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0249 536993"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Input
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    placeholder="Wedding, Birthday, Corporate, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Event Location</Label>
                  <Input
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    placeholder="Takoradi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Number of Guests</Label>
                  <Input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="50"
                  />
                </div>
              </div>
            </div>

            {/* Rental Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Rental Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Rental Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && (
                    <p className="text-xs text-red-500">{errors.startDate}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Rental End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-xs text-red-500">{errors.endDate}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items Needed *</Label>
                <Textarea
                  id="items"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  placeholder="Please list the items you need (e.g., 10 tables, 50 chairs, 5 chafing dishes)"
                  rows={6}
                  className={errors.items ? 'border-red-500' : ''}
                />
                {errors.items && (
                  <p className="text-xs text-red-500">{errors.items}</p>
                )}
                {cart.length === 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProductSelectorOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Browse Products
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="needsDelivery"
                  name="needsDelivery"
                  checked={formData.needsDelivery}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="needsDelivery" className="cursor-pointer">
                  I need delivery service
                </Label>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special requests or questions?"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Quote Request'
              )}
            </Button>

            {/* Or Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Call Button */}
            <Button 
              type="button" 
              size="lg" 
              variant="outline" 
              className="w-full"
              asChild
            >
              <a href={`tel:${SITE_CONFIG.phones[0]}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call Us: {SITE_CONFIG.phones[0]}
              </a>
            </Button>

            {/* Find Our Location Button */}
            <GhanaPostGPSDialog>
              <Button 
                type="button" 
                size="lg" 
                variant="outline" 
                className="w-full"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Find Our Location
              </Button>
            </GhanaPostGPSDialog>
          </form>
        </CardContent>
      </Card>

      {/* Product Selector Modal */}
      <ProductSelectorModal
        isOpen={isProductSelectorOpen}
        onClose={() => setIsProductSelectorOpen(false)}
      />
    </>
  );
}
