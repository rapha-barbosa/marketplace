import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/shared/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketplace de Afiliados",
  description: "Os melhores produtos de afiliados em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} antialiased bg-background text-foreground`}>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
