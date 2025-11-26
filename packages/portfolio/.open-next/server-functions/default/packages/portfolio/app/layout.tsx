import type { Metadata } from "next";
import ThemeProvider from '@/components/ThemeProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
