import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartVoter | Intelligent Election Portal",
  description: "AI-powered election assistance, live polling maps, and real-time updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The main content of your app */}
        {children}

        {/* Vercel Analytics tracking component */}
        <Analytics />
      </body>
    </html>
  );
}