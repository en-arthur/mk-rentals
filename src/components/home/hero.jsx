'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/product_images/thumnail1.png"
          className="w-full h-full object-cover"
        >
          <source src="/product_videos/long_video_background.mp4" type="video/mp4" />
        </video>
        {/* Light overlay for text readability - optional, can be removed if not needed */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6 text-white">
            <span className="text-primary">★</span>
            <span className="ml-2">Your Trusted Event Equipment Partner</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
            Premium Event Equipment
            <span className="block text-primary mt-2">For Every Occasion</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Quality catering and party equipment rentals for your events in Takoradi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              <Link href="/quote">Request Quote</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-medium">Call us:</span>
              <a href={`tel:${SITE_CONFIG.phones[0]}`} className="text-primary hover:underline">
                {SITE_CONFIG.phones[0]}
              </a>
            </div>
            <div className="hidden sm:block text-white/60">•</div>
            <div className="text-white/90">
              📍 {SITE_CONFIG.location}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
