import type { Metadata } from "next";
import ThemeProvider from '@/components/ThemeProvider';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
