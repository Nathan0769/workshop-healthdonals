import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthDonald",
  description: "HealthDonald - Healthy fast food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "h-full bg-white"
        )}
      >
        <div className="relative m-auto flex max-h-full min-h-full max-w-md flex-col gap-2 border-x py-4">
          <Header />
          <div className="flex-1 overflow-y-auto pt-2">{children}</div>
        </div>
      </body>
    </html>
  );
}
