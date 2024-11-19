"use server";
import Stripe from "stripe";

const domain = process.env.DOMAIN || "http://localhost:3000";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
console.log(stripeSecretKey);
const stripe = new Stripe(stripeSecretKey); 

// Crear sesión en la API de stripe para aceptar el pago
export async function createCheckoutSession() {

  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: "price_1QMXmhP3RNnuO2MEP4Sh4f89",
      quantity: 1,
    }],
    mode: "payment",
    ui_mode: "embedded",
    return_url: `${domain}/return?session_id={CHECKOUT_SESSION_ID}`
  });

  return {clientSecret: session.client_secret};
}