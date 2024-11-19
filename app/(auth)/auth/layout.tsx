import Link from "next/link";
import { apfel_fett } from "../../ui/fonts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-secondary">
      <div className="w-dvw md:absolute top-0 left-0 mt-8 md:pl-8 md:mt-4">
        <h1 className={`${apfel_fett.className} text-4xl md:text-2xl text-foreground text-center md:text-left`}>
          <Link href="/">
            AgroStart🌱
          </Link>
        </h1>
      </div>
      {children}
    </div>
  );
}