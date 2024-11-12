'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Confirmacion() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amount = searchParams.get('amount') || '0'
  const projectName = searchParams.get('projectName') || 'Proyecto no especificado'
  const anonymous = searchParams.get('anonymous') === 'true'
  const paymentMethod = searchParams.get('paymentMethod') || 'No especificado'
  const cardNumber = searchParams.get('cardNumber') || 'XXXX'

  const handleReturn = () => {
    router.push('/dashboard/profileInversor')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-600">
            <Check className="inline-block mr-2" size={24} />
            Pago Exitoso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Resumen de la transacción</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Proyecto:</span>
                <span className="font-medium">{projectName}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Monto:</span>
                <span className="font-medium">${parseFloat(amount).toFixed(2)} USD</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Tipo de aporte:</span>
                <span className="font-medium">{anonymous ? 'Anónimo' : 'Público'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Método de pago:</span>
                <span className="font-medium">{paymentMethod}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Tarjeta:</span>
                <span className="font-medium">XXXX-XXXX-XXXX-{cardNumber.slice(-4)}</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Se ha enviado un recibo detallado a tu correo electrónico.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReturn} className="w-full">
            Volver al Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}