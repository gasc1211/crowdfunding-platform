import localFont from "next/font/local";

export const ortica = localFont({
  src: [
    {
      path: "../fonts/OrticaLinear-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/OrticaLinear-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export const apfel_satt = localFont({
  src: "../fonts/ApfelGrotezk-Satt.woff2",
  display: "swap",
  weight: "400",
});

export const apfel_regular = localFont({
  src: "../fonts/ApfelGrotezk-Regular.woff2",
  display: "swap",
  weight: "400",
});

export const apfel_fett = localFont({
  src: "../fonts/ApfelGrotezk-Fett.woff2",
  display: "swap",
  weight: "500",
});
