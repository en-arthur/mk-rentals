import { products, getProductsByCategory } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import ProductGrid from '@/components/products/product-grid';
import CategoryFilter from '@/components/products/category-filter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = categories.find((cat) => cat.slug === resolvedParams.category);
  
  if (!category) {
    return {
      title: 'Category Not Found - MK RENTALS',
    };
  }

  return {
    title: `${category.name} - MK RENTALS`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = categories.find((cat) => cat.slug === resolvedParams.category);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(resolvedParams.category);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{category.icon}</span>
          <h1 className="text-4xl font-bold">{category.name}</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {category.description}
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter />

      {/* Products Grid */}
      <ProductGrid products={categoryProducts} />

      {/* CTA Section */}
      <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Rent?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Request a quote for these items and we will get back to you with pricing and availability.
        </p>
        <Button asChild size="lg">
          <Link href="/quote">Request a Quote</Link>
        </Button>
      </div>
    </div>
  );
}
