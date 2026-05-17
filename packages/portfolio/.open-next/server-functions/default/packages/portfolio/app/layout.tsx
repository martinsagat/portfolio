import type { Metadata, Viewport } from "next";
import ThemeProvider from '@/components/ThemeProvider';
import AskMartinAI from '@/components/AskMartinAI';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://martinsagat.com'),
  title: "Martin Sagat - Software Engineer",
  description: "Martin Sagat is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
  keywords: ["software engineer", "web developer", "full stack developer", "React", "TypeScript"],
  authors: [{ name: "Martin Sagat" }],
  openGraph: {
    title: "Martin Sagat - Software Engineer",
    description: "Martin Sagat is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
    url: "https://martinsagat.com",
    siteName: "Martin Sagat",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Sagat - Software Engineer",
    description: "Martin Sagat is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
    creator: "@martinsagat",
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Martin Sagat',
  url: 'https://martinsagat.com',
  jobTitle: 'Senior Software Engineer',
  sameAs: [
    'https://github.com/martinsagat',
    'https://www.linkedin.com/in/martinsagat',
    'https://twitter.com/martinsagat',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          {children}
          <AskMartinAI />
        </ThemeProvider>
      </body>
    </html>
  );
}
