"use client";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { getElementsOptions } from "@/app/actions/stripe";

// const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
// const stripe = loadStripe(stripePublicKey);

// const options = getElementsOptions();

export default function PaymentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Elements stripe={stripe} options={options}>
    { children }
    // </Elements>
  )
}