import { Suspense } from 'react';
import EnhancedQuoteForm from '@/components/forms/enhanced-quote-form';

export const metadata = {
  title: 'Request a Quote - MK RENTALS',
  description: 'Get a quote for your event equipment rental needs in Takoradi',
};

export default function QuotePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your event and we'll provide competitive pricing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
            <EnhancedQuoteForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
