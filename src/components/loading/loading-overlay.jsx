import Spinner from './spinner';
import { cn } from '@/lib/utils';

export default function LoadingOverlay({ 
  isLoading, 
  message = 'Loading...', 
  className 
}) {
  if (!isLoading) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      "flex items-center justify-center",
      className
    )}>
      <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-8 shadow-lg">
        <Spinner size="xl" />
        {message && (
          <p className="text-sm font-medium text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}
