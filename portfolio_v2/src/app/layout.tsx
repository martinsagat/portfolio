import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://martinsagat.com"),
  title: "Martin Sagat",
  description: "Portfolio of Martin Sagat, Senior Software Engineer.",
  openGraph: {
    title: "Martin Sagat",
    description: "Senior Software Engineer",
    url: "https://martinsagat.com",
    images: [
      {
        url: "/banner.png",
        width: 2560,
        height: 1440,
        alt: "Martin Sagat, Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Sagat",
    description: "Senior Software Engineer",
    images: ["/banner.png"],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("themeMode");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={grotesk.className}>
        <AppBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
