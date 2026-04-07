import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharshith.vercel.app"),
  title: "Dharshith.vercel.app",
  description:
    "Production-grade portfolio for Dharshith: full stack engineering, distributed systems, and AI application architecture.",
  keywords: [
    "Dharshith",
    "Full Stack Engineer",
    "AI Systems",
    "Distributed Architect",
    "Next.js Portfolio"
  ],
  openGraph: {
    title: "Dharshith.vercel.app",
    description:
      "Full Stack Engineer • AI Systems Builder • Distributed Architect",
    url: "https://dharshith.vercel.app",
    siteName: "Dharshith.vercel.app",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharshith.vercel.app",
    description: "Real-time systems • AI apps • scalable backends"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${space.variable} bg-base text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
