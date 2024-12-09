import Navbar from "@/app/ui/components/Navbar";

import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="z-auto">
        {<Navbar />}
      </div>
      {children}
    </div>
  );
}
