'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data/categories';

export default function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          variant={pathname === '/products' ? 'default' : 'outline'}
          size="sm"
        >
          <Link href="/products">All Products</Link>
        </Button>
        {categories.map((category) => {
          const isActive = pathname === `/products/${category.slug}`;
          return (
            <Button
              key={category.id}
              asChild
              variant={isActive ? 'default' : 'outline'}
              size="sm"
            >
              <Link href={`/products/${category.slug}`}>
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
