import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-32 mb-6" />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Skeleton */}
        <div>
          <Skeleton className="w-full aspect-square rounded-lg mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-20 w-20 rounded-md" />
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div>
          {/* Category */}
          <Skeleton className="h-4 w-32 mb-4" />
          
          {/* Title */}
          <Skeleton className="h-10 w-3/4 mb-4" />
          
          {/* Description */}
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Quantity Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-48 mb-3" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-10" />
              </div>
            </CardContent>
          </Card>

          {/* Rental Period Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-40 mb-3" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
