"use client";
import Navbar from "./ui/components/Navbar";

import styles from "./ui/loading.module.css";

export default function Loading() {
  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center">
      <Navbar />
      <span className={styles.loader}></span>
      <h2 className="text-2xl font-bold pt-4"> Cargando...</h2>
    </div>
  );
}