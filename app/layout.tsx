import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./ui/components/Navbar";
import { geistMono, geistSans } from "./ui/fonts";
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
