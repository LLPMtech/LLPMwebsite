import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Life Long Property Management | Commercial Property Austin TX",
    template: "%s | Life Long Property Management",
  },
  description: "Life Long Property Management is a family-owned commercial property management company in Austin, TX. Over 68 properties, 200+ tenants across Central Texas. Retail, office, warehouse and flex spaces available.",
  keywords: ["commercial property management Austin TX", "commercial real estate Austin", "office space for lease Austin", "retail space Austin Texas", "warehouse space Central Texas", "flex space Austin", "Life Long Property Management", "LLPM"],
  authors: [{ name: "Life Long Property Management" }],
  creator: "Life Long Property Management",
  publisher: "Life Long Property Management",
  metadataBase: new URL("https://www.lifelongpropertymanagement.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.lifelongpropertymanagement.com",
    siteName: "Life Long Property Management",
    title: "Life Long Property Management | Commercial Property Austin TX",
    description: "Family-owned commercial property management in Austin, TX. 68+ properties, 200+ tenants. Retail, office, warehouse and flex spaces across Central Texas.",
    images: [{ url: "/logo.png", width: 400, height: 400, alt: "Life Long Property Management Logo" }],
  },
  twitter: {
    card: "summary",
    title: "Life Long Property Management | Commercial Property Austin TX",
    description: "Family-owned commercial property management in Austin, TX. 68+ properties, 200+ tenants across Central Texas.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Life Long Property Management",
  "description": "Family-owned commercial property management company managing 68+ properties and 200+ tenants across Central Texas.",
  "url": "https://www.lifelongpropertymanagement.com",
  "telephone": "+15128926001",
  "email": "pm@lifelongpm.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5716 Hwy 290 West #200",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78735",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2945,
    "longitude": -97.8434,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00",
    },
  ],
  "logo": "https://www.lifelongpropertymanagement.com/logo.png",
  "image": "https://www.lifelongpropertymanagement.com/logo.png",
  "areaServed": ["Austin, TX", "Central Texas", "Liberty Hill, TX", "Georgetown, TX", "San Marcos, TX"],
  "sameAs": ["https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
