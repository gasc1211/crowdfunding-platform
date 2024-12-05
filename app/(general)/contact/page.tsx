import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envíanos Un Mensaje</CardTitle>
            <CardDescription>Llena la Forma que Acontinuación se Presenta y Nos Contactaremos Contigo a la Brevedad Posible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tú Nombre" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Tú email" required />
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Tu Mensaje" required />
              </div>
              <Button type="submit" className="w-full">Enviar Mensaje</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>También Puedes Usar La Siguiente Información Para Comunicarte Con Nosotros:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-muted-foreground" />
              <span>Ciudad Universitaria, Boulevard Morazán, Tegucigalpa, Honduras</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground" />
              <span>+504 2222-2222</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground" />
              <span>+504 9999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-muted-foreground" />
              <span>contacto@agrosmart.com</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}