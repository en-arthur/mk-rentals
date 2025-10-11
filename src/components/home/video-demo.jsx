'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const videos = [
  { id: 1, src: '/product_videos/video_demo.mp4', title: 'Equipment Showcase' },
  { id: 2, src: '/product_videos/video+1.mp4', title: 'Event Setup' },
  { id: 3, src: '/product_videos/video+2.mp4', title: 'Catering Equipment' },
  { id: 4, src: '/product_videos/video+3.mp4', title: 'Party Essentials' },
  { id: 5, src: '/product_videos/video+4.mp4', title: 'Complete Solutions' }
];

function VideoPlayer({ video }) {
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
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-lg group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        onClick={handleVideoClick}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause Overlay - Reduced opacity */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer transition-opacity group-hover:bg-black/30"
          onClick={togglePlay}
        >
          <Button
            size="lg"
            className="h-16 w-16 rounded-full"
            variant="default"
          >
            <Play className="h-8 w-8 ml-1" />
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
            className="h-12 w-12 rounded-full bg-black/40 hover:bg-black/60"
            variant="secondary"
          >
            <Pause className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function VideoDemo() {
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

        {/* Video Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Main Featured Video */}
          <div className="mb-8">
            <VideoPlayer video={videos[0]} />
          </div>

          {/* Additional Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.slice(1).map((video) => (
              <VideoPlayer key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
