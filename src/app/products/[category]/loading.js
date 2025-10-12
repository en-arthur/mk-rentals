import ProductGridSkeleton from '@/components/loading/product-grid-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-32 mb-6" />

      {/* Category Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-12 w-80 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Products Grid Skeleton */}
      <ProductGridSkeleton count={6} />
    </div>
  );
}
