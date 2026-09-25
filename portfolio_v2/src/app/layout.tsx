import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { GithubTiles } from "@/components/GithubTiles";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martin Sagat",
  description: "Portfolio of Martin Sagat, software engineer.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("themeMode");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={grotesk.className}>
        <GithubTiles />
        <AppBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
