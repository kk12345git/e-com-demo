import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Concierge from "@/components/Concierge";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "ShopClone | Chennai-oda Semma Marketplace",
  description: "Namba Chennai-oda exclusive premium marketplace. Best products, best vibes buddy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="antialiased font-sans">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Concierge />
            <Footer />
            <Toaster />
            <BackToTop />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


