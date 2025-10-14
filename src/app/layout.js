import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/contexts/cart-context";
import { ToastProvider } from "@/components/ui/toast";
import { SITE_CONFIG } from "@/lib/constants";

// Montserrat for headings - bold, modern, clean
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Open Sans for body text - readable, professional
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'party rentals takoradi',
    'catering equipment rental ghana',
    'tables chairs rental',
    'chafing dishes rental',
    'event equipment takoradi',
    'wedding equipment rental',
    'party supplies ghana',
    'MK Rentals',
    'event rentals western region',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/mk-r-logo.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/mk-r-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/mk-r-logo.png',
    apple: '/mk-r-logo.png',
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
};

export default function RootLayout({ children }) {
  // Structured data for local business
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.fullAddress,
      addressLocality: 'Takoradi',
      addressRegion: 'Western Region',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.lat,
      longitude: SITE_CONFIG.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.tiktok,
    ].filter(Boolean),
    priceRange: 'GHS',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}
      >
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
