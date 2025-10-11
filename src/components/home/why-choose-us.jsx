import { CheckCircle2, Shield, Truck, Clock, Star, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'Quality Equipment',
    description: 'All items are professionally cleaned and well-maintained for your peace of mind'
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Competitive rates with flexible rental periods to fit your budget'
  },
  {
    icon: Truck,
    title: 'Delivery Available',
    description: 'We deliver and pick up equipment across Takoradi and surrounding areas'
  },
  {
    icon: Clock,
    title: 'Flexible Rentals',
    description: 'Daily, weekend, or weekly rentals - choose what works best for you'
  },
  {
    icon: Star,
    title: 'Excellent Service',
    description: 'Dedicated customer support to help you plan the perfect event'
  },
  {
    icon: CheckCircle2,
    title: 'Wide Selection',
    description: 'From small gatherings to large events, we have everything you need'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose MK Rentals?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your event successful with quality equipment and exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
