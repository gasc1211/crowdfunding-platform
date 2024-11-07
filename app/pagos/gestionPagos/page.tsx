'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Confirmacion() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = searchParams.get('amount');
  const projectName = searchParams.get('projectName');
  const anonymous = searchParams.get('anonymous') === 'true';

  const handleReturn = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Pago Exitoso</h1>
        <p className="text-gray-700 mb-2">Proyecto: {projectName}</p>
        <p className="text-gray-700 mb-2">Monto: {amount} USD</p>
        <p className="text-gray-700 mb-4">Aporte: {anonymous ? 'Anónimo' : 'Público'}</p>

        <Button onClick={handleReturn} className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Volver al Dashboard
        </Button>
      </div>
    </div>
  );
}