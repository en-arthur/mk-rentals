'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ProductCard({ product }) {
  const primaryImage = product.images?.[0];
  const [imageLoading, setImageLoading] = useState(true);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {primaryImage ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                imageLoading ? "opacity-0" : "opacity-100"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setImageLoading(false)}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl">{getCategoryIcon(product.category)}</div>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/item/${product.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function getCategoryIcon(category) {
  const icons = {
    'chafing-dishes': '🍲',
    'cookware': '🍳',
    'tables-chairs': '🪑',
    'ice-chests': '🧊',
    'accessories': '🎉'
  };
  return icons[category] || '📦';
}
