'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Our Equipment in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how our quality equipment can transform your event
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-2xl group">
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleVideoClick}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/product_videos/video_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity group-hover:bg-black/50"
                onClick={togglePlay}
              >
                <Button
                  size="lg"
                  className="h-20 w-20 rounded-full"
                  variant="default"
                >
                  <Play className="h-10 w-10 ml-1" />
                </Button>
              </div>
            )}

            {/* Pause Button (shows when playing) */}
            {isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={togglePlay}
              >
                <Button
                  size="lg"
                  className="h-16 w-16 rounded-full bg-black/60 hover:bg-black/80"
                  variant="secondary"
                >
                  <Pause className="h-8 w-8" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
