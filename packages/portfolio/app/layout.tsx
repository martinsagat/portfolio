import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ThemeProvider from '@/components/ThemeProvider';
import AskMartinAI from '@/components/AskMartinAI';
import CommandPalette from '@/components/CommandPalette';
import { Inter } from "next/font/google";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-JJVG4JBLHX";

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
    title: "Martin Sagat - Senior Software Engineer",
    description: "Martin Sagat is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
    url: "https://martinsagat.com",
    siteName: "Martin Sagat",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Martin Sagat — Senior Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Sagat - Senior Software Engineer",
    description: "Martin Sagat is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.",
    creator: "@martinsagat",
    images: ["/og"],
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          {children}
          <AskMartinAI />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
