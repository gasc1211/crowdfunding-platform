"use client";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

import { createCheckoutSession } from "@/app/api/stripe";
import { useEffect, useState } from "react";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
console.log(stripePublicKey);
const stripe = loadStripe(stripePublicKey);

export default function CheckoutForm() {

  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchSession = async () => {
      const session = await createCheckoutSession();
      setOptions(session);
    }
    fetchSession();
  }, []);

  return (
    <div id="checkout" className="pt-24 pb-4">
      <EmbeddedCheckoutProvider
        stripe={stripe}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

