import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we could not find the page you are looking for. 
            It might have been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-12 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Need help finding something?
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/products" className="text-primary hover:underline">
              Products
            </Link>
            <Link href="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
            <Link href="/quote" className="text-primary hover:underline">
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
