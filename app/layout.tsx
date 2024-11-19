import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import { apfel_regular } from "./ui/fonts";
import Footer from "./ui/components/Footer";

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
      <html lang="es">
        <body className={`${apfel_regular.className} antialiased`}>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
