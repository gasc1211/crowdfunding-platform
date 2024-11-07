import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import { apfel_regular } from "./ui/fonts";
import Footer from "./ui/components/Footer";
import Navbar from "./ui/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "AgroStart",
  description: "Plataforma de Crowdfunding para el Agro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="en">
        <body className={`${apfel_regular.className} antialiased`}>
        <Navbar /> 
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
