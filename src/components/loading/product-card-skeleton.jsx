import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />
      
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        {/* Description Skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
