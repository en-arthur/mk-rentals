'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/data/categories';
import { cn } from '@/lib/utils';

export default function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse Our Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for your event, from cooking equipment to elegant table settings
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link href={`/products/${category.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full overflow-hidden">
        {/* Category Image */}
        <div className="relative h-48 w-full bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <Image
            src={category.image}
            alt={category.name}
            fill
            className={cn(
              "object-cover group-hover:scale-105 transition-transform duration-300",
              imageLoading ? "opacity-0" : "opacity-100"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoading(false)}
          />
        </div>
                
                <CardContent className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  {/* Product Count & Arrow */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {category.productCount} items
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
        </CardContent>
      </Card>
    </Link>
  );
}
