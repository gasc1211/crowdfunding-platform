// "use client";
// import { loadStripe } from "@stripe/stripe-js";
// import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

// import { createCheckoutSession } from "@/app/actions/stripe";
// import { useEffect, useState } from "react";
// import Stripe from "stripe";

// const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
// console.log(stripePublicKey);
// const stripe = loadStripe(stripePublicKey);

// export default function CheckoutForm(values: { amount: number, embedded: boolean }, project: Project) {

//   const [clientSecret, setClientSecret] = useState<string>("");

//   useEffect(() => {
//     const fetchSession = async () => {
//       const session = await createCheckoutSession(values, project);
//       if (session.client_secret)
//         setClientSecret(session.client_secret);
//     }
//     fetchSession();
//   }, []);

//   return (
//     <>
//       {clientSecret ? <div id="checkout" className="pt-24 pb-4">
//         < EmbeddedCheckoutProvider
//           stripe={stripe}
//           options={{ clientSecret }}
//         >
//           <EmbeddedCheckout />
//         </EmbeddedCheckoutProvider >
//       </div > : null
//       }
//     </>
//   );
// }

export default function CheckoutForm() {
  return <></>;
}


