
"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  finishDate: z.date(),
  investmentGoal: z.number().min(1, {
    message: "La cantidad debe ser mayor a cero."
  }),
  image: z.any(),
});

export default function ProjectForm() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: Date(),
    finishDate: Date(),
    investmentGoal: 0,
    image: null,
  });

  const handleInputChange = (event: unknown) => {
    const e = event as React.ChangeEvent<HTMLInputElement>;
    setFormData({
      ...formData,
      [e.target.name]: e.target.name == "image" ? e.target.files![0] : e.target.value
    });
  };

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
  });

  return (
    <div className="w-dvw flex">
      <div className="gap-4 mx-4 w-auto">
        <Form {...form}>
          <form onChange={handleInputChange}>
            <section className="rounded-sm border border-gray-199 shadow-sm p-4 [&>*]:my-2">
              <h1 className="font-bold text-xl">Nueva Campaña</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Proyecto</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormDescription>Ingresa el nombre de tu proyecto</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descripción" {...field} />
                    </FormControl>
                    <FormDescription>Describe en qué consiste tu proyecto</FormDescription>
                  </FormItem>
                )}
              />
              <div className="md:flex md:[&>*]:mr-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Inicio</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Ingresa la fecha de inicio del proyecto</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="finishDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Terminación</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Ingresa la fecha de finalización del proyecto</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Portada</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormDescription>Sube una imágen que describa tu proyecto</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="investmentGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta de Recaudación</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormDescription>Ingresa la cantidad de dinero que necesitas para hacerlo realidad</FormDescription>
                  </FormItem>
                )}
              />
              <Button className="my-4">Crear Proyecto</Button>
            </section>
          </form>
        </Form>
      </div>
      <div className="w-1/2">
        {formData.image &&
          <Image
            className="w-full h-1/3 object-cover rounded-md"
            src={URL.createObjectURL(formData.image)}
            alt="Project Profile Photo"
            width={500} height={100}
          />
        }
        <h1 className="font-bold text-2xl my-2" >{formData.name}</h1>
        <p>{formData.description}</p>
      </div>
    </div >
  );
}
