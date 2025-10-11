'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';
import { getProductById } from '@/lib/data/products';
import { formatPrice } from '@/lib/format-currency';

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const product = productId ? getProductById(productId) : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  // Prefill items field when product is available
  useEffect(() => {
    if (product) {
      const productDetails = `${product.name}\n\nPricing:\n- Daily Rate: ${formatPrice(product.pricing.daily)}\n- Weekend Rate: ${formatPrice(product.pricing.weekend || 0)}\n- Weekly Rate: ${formatPrice(product.pricing.weekly)}\n\nQuantity: 1`;
      setFormData(prev => ({
        ...prev,
        items: productDetails
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

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
  };

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
      {/* Product Summary Card */}
      {product && (
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Daily:</span>{' '}
                    <span className="font-semibold text-primary">
                      {formatPrice(product.pricing.daily)}
                    </span>
                  </div>
                  {product.pricing.weekend && (
                    <div>
                      <span className="text-muted-foreground">Weekend:</span>{' '}
                      <span className="font-semibold">
                        {formatPrice(product.pricing.weekend)}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Weekly:</span>{' '}
                    <span className="font-semibold">
                      {formatPrice(product.pricing.weekly)}
                    </span>
                  </div>
                </div>
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
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="0249 536993"
                />
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
                required
                placeholder="john@example.com"
              />
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Rental End Date *</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="items">Items Needed *</Label>
              <Textarea
                id="items"
                name="items"
                value={formData.items}
                onChange={handleChange}
                required
                placeholder="Please list the items you need (e.g., 10 tables, 50 chairs, 5 chafing dishes)"
                rows={4}
              />
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
        </form>
      </CardContent>
    </Card>
    </>
  );
}
