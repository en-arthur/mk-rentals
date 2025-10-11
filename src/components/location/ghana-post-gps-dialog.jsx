'use client';

import { MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SITE_CONFIG } from '@/lib/constants';

export default function GhanaPostGPSDialog({ children, buttonVariant = 'default', buttonSize = 'default', buttonClassName = '' }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
            <MapPin className="mr-2 h-4 w-4" />
            Find Our Location
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Find Us Using Ghana Post GPS
          </DialogTitle>
          <DialogDescription>
            Follow these simple steps to locate us
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* GPS Address Highlight */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Our GPS Address</p>
            <p className="text-2xl font-bold text-primary">{SITE_CONFIG.gpsAddress}</p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Download GhanaPost GPS App</p>
                <p className="text-xs text-muted-foreground mt-1">Available on Google Play Store (Android) or App Store (iOS)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Open the App</p>
                <p className="text-xs text-muted-foreground mt-1">Enable location services on your phone</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Search for Our Address</p>
                <p className="text-xs text-muted-foreground mt-1">Enter <span className="font-semibold">{SITE_CONFIG.gpsAddress}</span> in the search bar</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Get Directions</p>
                <p className="text-xs text-muted-foreground mt-1">The app will show our exact location and provide navigation</p>
              </div>
            </div>
          </div>

          {/* Download Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              asChild
            >
              <a 
                href="https://play.google.com/store/apps/details?id=com.ghanapostgps.ghanapost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-1 h-4 w-4" />
                Android
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              asChild
            >
              <a 
                href="https://apps.apple.com/app/ghanapostgps/id1335591466"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-1 h-4 w-4" />
                iOS
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
