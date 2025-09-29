import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobSearch - Find Your Dream Job",
  description: "Search and discover job opportunities with our comprehensive job search platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: '#f9fafb', color: '#111827' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#f9fafb', color: '#111827', minHeight: '100vh' }}
      >
        <Navigation />
        <main className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
