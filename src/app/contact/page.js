import ContactForm from '@/components/forms/contact-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import GhanaPostGPSDialog from '@/components/location/ghana-post-gps-dialog';

export const metadata = {
  title: 'Contact Us - MK RENTALS',
  description: 'Get in touch with MK RENTALS for your event equipment rental needs in Takoradi',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions? We would love to hear from you. Send us a message or visit our showroom.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {/* Contact Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">{SITE_CONFIG.fullAddress}</p>
                    <GhanaPostGPSDialog>
                      <Button variant="link" className="px-0 mt-2">
                        <Navigation className="mr-2 h-4 w-4" />
                        Find Our Location
                      </Button>
                    </GhanaPostGPSDialog>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-2">Phone Numbers</p>
                    <div className="space-y-1">
                      {SITE_CONFIG.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="block text-sm text-primary hover:underline"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Business Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-2">Business Hours</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Monday - Saturday: {SITE_CONFIG.hours.weekday}</p>
                      <p>Sunday: {SITE_CONFIG.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* GPS Location Section */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-12">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-3">Find Us Using Ghana Post GPS</h2>
                <p className="text-muted-foreground text-lg">
                  Navigate directly to our showroom with the official Ghana Post GPS app
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Our GPS Address</p>
                <p className="text-4xl font-bold text-primary mb-1">{SITE_CONFIG.gpsAddress}</p>
                <p className="text-sm text-muted-foreground">{SITE_CONFIG.location}</p>
              </div>

              <GhanaPostGPSDialog>
                <Button size="lg" className="text-lg px-8 py-6">
                  <Navigation className="mr-2 h-6 w-6" />
                  View Step-by-Step Instructions
                </Button>
              </GhanaPostGPSDialog>

              <p className="text-sm text-muted-foreground">
                The GhanaPost GPS app is free to download from Google Play Store or Apple App Store
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
