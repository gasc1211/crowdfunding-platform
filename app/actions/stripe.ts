"use server";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import Stripe from "stripe";
import * as config from "@/config";

const domain = process.env.DOMAIN || "http://localhost:3000";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(stripeSecretKey);

// Crear sesión en la API de stripe para aceptar el pago
export async function createCheckoutSession(values: { amount: number, embedded: boolean }, projectData: Project) {

  const { amount, embedded } = values;
  const { name, description, project_banner_url } = projectData;

  const params: Stripe.Checkout.SessionCreateParams = {
    line_items: [{
      quantity: 1,
      price_data: {
        currency: config.CURRENCY,
        product_data: {
          name: name,
          description: description || "",
          images: [project_banner_url ? project_banner_url : ""]
        },
        unit_amount: formatAmountForStripe(amount, config.CURRENCY)
      },
    }],
    mode: "payment",
    ui_mode: embedded ? "embedded" : "hosted",
    return_url: `${domain}/return?session_id={CHECKOUT_SESSION_ID}`
  };

  const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create(params);

  return session;
}

export async function createPaymentIntent(
  values: { amount: number, projectData: Project },
): Promise<{ client_secret: string, payment_intent_id: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        values.amount,
        config.CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: config.CURRENCY,
      metadata: { ...values.projectData }
    });

  return {
    payment_intent_id: paymentIntent.id,
    client_secret: paymentIntent.client_secret as string,
  };
}