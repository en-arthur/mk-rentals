'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Helper function to check if file is a video
function isVideo(src) {
  return src?.toLowerCase().endsWith('.mp4') || 
         src?.toLowerCase().endsWith('.webm') || 
         src?.toLowerCase().endsWith('.mov');
}

export default function ProductImageGallery({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [thumbnailsLoading, setThumbnailsLoading] = useState({});

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setImageLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setImageLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setImageLoading(true);
    setCurrentIndex(index);
  };

  const currentMedia = images[currentIndex];
  const isCurrentVideo = isVideo(currentMedia);

  return (
    <div className="space-y-4">
      {/* Main Image/Video */}
      <Card className="overflow-hidden">
        <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10">
          {imageLoading && !isCurrentVideo && (
            <div className="absolute inset-0 bg-muted animate-pulse z-10" />
          )}
          {isCurrentVideo ? (
            <video
              src={currentMedia}
              controls
              muted
              className="w-full h-full object-cover"
              onLoadedData={() => setImageLoading(false)}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={currentMedia}
              alt={`${productName} - Image ${currentIndex + 1}`}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                imageLoading ? "opacity-0" : "opacity-100"
              )}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => setImageLoading(false)}
            />
          )}
          
          {/* Navigation Arrows - Only show if multiple images */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Thumbnail Navigation - Only show if multiple images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((media, index) => {
            const isThumbVideo = isVideo(media);
            return (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                {isThumbVideo ? (
                  <>
                    <video
                      src={media}
                      className="w-full h-full object-cover"
                      muted
                    />
                    {/* Video Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </>
                ) : (
                  <>
                    {thumbnailsLoading[index] !== false && (
                      <div className="absolute inset-0 bg-muted animate-pulse" />
                    )}
                    <Image
                      src={media}
                      alt={`${productName} thumbnail ${index + 1}`}
                      fill
                      className={cn(
                        "object-cover transition-opacity duration-200",
                        thumbnailsLoading[index] !== false ? "opacity-0" : "opacity-100"
                      )}
                      sizes="(max-width: 768px) 25vw, 12vw"
                      onLoad={() => setThumbnailsLoading(prev => ({ ...prev, [index]: false }))}
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
