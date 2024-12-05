import * as config from "@/config";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import getStripe from "@/utils/get-stripe";

import z from "zod";
import React, { useState, type ChangeEventHandler } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createPaymentIntent } from "@/app/actions/stripe";
import { StripeError } from "@stripe/stripe-js";
import { newProjectInvestment } from "@/app/api/handler";

function CheckoutForm({ project }: { project: Project }) {

  // Define values for form validation
  const checkoutFormSchema = z.object({
    amount: z.coerce.number()
      .min(50, {
        message: "La cantidad mínima es de L 50.00."
      }),
    cardholderName: z.string()
  });

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      amount: 50
    }
  });

  const [paymentType, setPaymentType] = useState<string>("");
  const [payment, setPayment] = useState<{
    status: "initial" | "processing" | "error"
  }>({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Procesando...</h2>;

      case "requires_action":
        return <h2>Autenticando...</h2>;

      case "succeeded":
        return <h2>Pago Exitoso 🥳</h2>;

      case "error":
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    if (name === "amount" || name === "cardholderName")
      form.setValue(name, value, {
        shouldValidate: true,
        shouldDirty: true
      });

    if (name === "amount") {
      if (parseInt(value) > 0)
        elements?.update({ amount: form.getValues().amount * 100 });
    }
  };

  const handleSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {

    try {
      if (!stripe || !elements)
        return;

      setPayment({ status: "processing" });

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setPayment({ status: "error" });
        setErrorMessage(submitError.message ?? "An unknown error occurred");

        return;
      }

      // Create a PaymentIntent with the specified amount.
      const { client_secret: clientSecret, payment_intent_id: paymentId } = await createPaymentIntent({
        amount: values.amount,
        projectData: project,
      });

      // Update project on database
      await newProjectInvestment(project, values.amount, paymentId);

      // Use your card Element with other Stripe.js APIs
      const { error: confirmError } = await stripe!.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/proyecto/${project.project_id}`,
          payment_method_data: {
            billing_details: {
              name: values.cardholderName,
            },
          },
        },
      });


      if (confirmError) {
        setPayment({ status: "error" });
        setErrorMessage(confirmError.message ?? "An unknown error occurred");
        return;
      }


    } catch (err) {
      const { message } = err as StripeError;
      setPayment({ status: "error" });
      setErrorMessage(message ?? "An unknown error occurred");
    }

  };

  return (
    <Form {...form}>
      <form className="[&>*]:mt-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad a Invertir</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ingresa la cantidad a invertir"
                  {...field}
                  onChange={handleInputChange} />
              </FormControl>
              <FormDescription>
                Ingresa la cantidad de dinero que deseas invertir
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {paymentType === "card" &&
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Titular de la Tarjeta</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Ingresa el nombre del titular"
                    {...field}
                    onChange={handleInputChange} />
                </FormControl>
                <FormDescription>
                  Ingresa el nombre del titular de la tarjeta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />}
        <FormItem>
          <PaymentElement
            options={{ layout: "tabs" }}
            onChange={(e) => {
              setPaymentType(e.value.type)
            }}
          />
        </FormItem>
        <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">
          Invertir Ahora
        </Button>
      </form>
      <PaymentStatus status={payment.status} />
    </Form >
  );
}

export default function ElementsCheckoutForm({ project }: { project: Project }): JSX.Element {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: config.STRIPE_APPEARANCE_OPTIONS,
        currency: 'usd',
        mode: "payment",
        amount: 100,
      }}>
      <CheckoutForm project={project} />
    </Elements>
  );
}