import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- THIS IS THE MAGIC LINE YOU WERE MISSING

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Voter Portal",
  description: "A Smart Election Awareness App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}