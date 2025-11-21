import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ErrorBoundary } from "@/components/error-boundary";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "TravelAgent - Discover Your Next Adventure",
    template: "%s | TravelAgent"
  },
  description: "Explore amazing destinations and book your dream vacation with TravelAgent. Premium travel experiences curated just for you.",
  keywords: ["travel", "vacation", "destinations", "booking", "adventure", "tourism", "travel agency", "holiday packages"],
  authors: [{ name: "TravelAgent", url: "https://travelagent.com" }],
  creator: "TravelAgent",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "TravelAgent - Discover Your Next Adventure",
    description: "Explore amazing destinations and book your dream vacation",
    type: "website",
    locale: "en_US",
    siteName: "TravelAgent",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelAgent - Discover Your Next Adventure",
    description: "Explore amazing destinations and book your dream vacation",
    creator: "@travelagent",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <Navigation />
          </Suspense>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
