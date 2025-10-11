import { products } from '@/lib/data/products';
import ProductGrid from '@/components/products/product-grid';
import CategoryFilter from '@/components/products/category-filter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'All Products - MK RENTALS',
  description: 'Browse our complete catalog of catering and party equipment rentals in Takoradi',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse our complete selection of quality event equipment. From chafing dishes to tables and chairs, 
          we have everything you need for your next event.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter />

      {/* Products Grid */}
      <ProductGrid products={products} />

      {/* CTA Section */}
      <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Not sure what you need? Request a quote and our team will help you select 
          the perfect equipment for your event.
        </p>
        <Button asChild size="lg">
          <Link href="/quote">Request a Quote</Link>
        </Button>
      </div>
    </div>
  );
}
