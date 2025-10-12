import FormSkeleton from '@/components/loading/form-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header Skeleton */}
      <div className="mb-8 text-center">
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-[500px] mx-auto" />
      </div>

      <div className="max-w-3xl mx-auto">
        <FormSkeleton fields={10} />
      </div>
    </div>
  );
}
