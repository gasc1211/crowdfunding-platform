"use client";
import Link from "next/link";
import Navbar from "./ui/components/Navbar";

export default function Error() {
  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center">
      <Navbar />
      <span className="text-8xl">😞</span>
      <h2 className="text-2xl font-bold pt-4"> Lo siento, parece que algo ha salido mal...</h2>
      <button className="mt-4 p-2 text-xl font-bold border rounded-md hover:bg-primary hover:text-primary-foreground"><Link href="/">Regresar a la Página Principal</Link></button>
    </div>
  );
}