"use client";

import type Stripe from "stripe";

// import {
//   EmbeddedCheckout,
//   EmbeddedCheckoutProvider
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import getStripe from "@/utils/get-stripe";
import { Input, Button } from "@headlessui/react";
import { useForm, Form } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface CheckoutFormProps {
  projectData: Project;
  uiMode: Stripe.Checkout.Session.UiMode;
}

const checkoutFormSchema = z.object({
  amount: z.number()
    .min(50, {
      message: "La cantidad mínima es de L 50.00."
    }),
  cardHolderName: z.string()
});

export default function CheckoutForm(props: CheckoutFormProps) {

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      amount: 50
    }
  });

  // const [clientSecret, setClientSecret] = useState<string | null>(null);
  // const handleSubmit = async (values) => { }

  console.log(props);

  return (
    <>
      <Form {...form}>
        <form className="[&>*]:mt-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad a Invertir</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Ingresa la cantidad de dinero que deseas invertir
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Titular de la Tarjeta</FormLabel>
                <FormControl>
                  <Input type="string" {...field} />
                </FormControl>
                <FormDescription>
                  Ingresa el nombre del titular de la tarjeta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">
            Invertir Ahora
          </Button>
        </form>
      </Form >
      {/* {
        clientSecret ? (
          <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }} >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider >
        ) : null
      } */}
    </>
  );
}