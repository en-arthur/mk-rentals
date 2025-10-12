import Spinner from './spinner';
import { cn } from '@/lib/utils';

export default function InlineLoader({ 
  message = 'Loading...', 
  className,
  size = 'sm' 
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Spinner size={size} />
      {message && (
        <span className="text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );
}
