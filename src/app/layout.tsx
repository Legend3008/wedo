import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TravelAgent - Discover Your Next Adventure",
  description: "Explore amazing destinations and book your dream vacation with TravelAgent. Premium travel experiences curated just for you.",
  keywords: ["travel", "vacation", "destinations", "booking", "adventure", "tourism"],
  authors: [{ name: "TravelAgent" }],
  openGraph: {
    title: "TravelAgent - Discover Your Next Adventure",
    description: "Explore amazing destinations and book your dream vacation",
    type: "website",
    locale: "en_US",
    siteName: "TravelAgent",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelAgent - Discover Your Next Adventure",
    description: "Explore amazing destinations and book your dream vacation",
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
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
