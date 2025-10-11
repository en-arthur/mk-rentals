import { products, getProductById } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProductActions from '@/components/products/product-actions';
import ProductImageGallery from '@/components/products/product-image-gallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package } from 'lucide-react';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);
  
  if (!product) {
    return {
      title: 'Product Not Found - MK RENTALS',
    };
  }

  return {
    title: `${product.name} - MK RENTALS`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  const category = categories.find((cat) => cat.id === product.category);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <div>
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <Link 
              href={`/products/${product.category}`}
              className="text-sm text-primary hover:underline"
            >
              {category?.name}
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {product.longDescription || product.description}
          </p>

          {/* Product Actions */}
          <ProductActions product={product} />

          {/* Additional Info */}
          <div className="mt-6">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/contact">Contact Us for More Info</Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
