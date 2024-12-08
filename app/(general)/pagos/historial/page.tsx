'use client';
import { Button } from '@/components/ui/button';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getInvestedProjects } from '@/app/api/handler';
import { useUser } from '@clerk/nextjs';
import { formatAmountForDisplay } from '@/utils/stripe-helpers';



type ProjectWithInvestments = Omit<Project,
  "beneficios" | "description" | "project_banner_url" | "progress" | "investment_goal" | "total_invested">
  & { investments: Omit<Investments, "project_id" | "payment_id">[] }
  & { producer: { users: Pick<Users, "first_name" | "last_name"> } };

export default function Historial() {

  const { isLoaded } = useUser();
  const [projects, setProjects] = useState<ProjectWithInvestments[]>([]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getInvestedProjects();
      console.log(projects);
      setProjects(projects);
    };
    fetchProjects();
  }, [isLoaded]);

  return (
    <div className="mt-24 mx-16 [&>*]:mt-4">
      <h1 className='font-bold text-2xl'>Historial de Inversiones</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha de Inversión</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Productor</TableHead>
            <TableHead>Fecha de Inicio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Esperada de Finalización</TableHead>
            <TableHead>Cantidad Invertida</TableHead>
          </TableRow>
          {
            projects?.map((project) => (
              project.investments.map((investment) => (
                <TableRow key={project.project_id}>
                  <TableCell>{investment.date}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{`${project.producer.users.first_name} ${project.producer.users.last_name}`}</TableCell>
                  <TableCell>{project.start_date}</TableCell>
                  {project.finish_date ?
                    <>
                      <TableCell>Finalizado</TableCell>
                      <TableCell></TableCell>
                    </> :
                    <>
                      <TableCell>En Progreso</TableCell>
                      <TableCell>{project.expected_finish_date}</TableCell>
                    </>
                  }
                  <TableCell>{formatAmountForDisplay(investment.investment_amount as number, 'hnl')}</TableCell>
                  <TableCell>
                    <Button variant="link">
                      <Link href={`/proyecto/${project.project_id}`}>Ver Proyecto</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ))

          }
        </TableHeader>
      </Table>
      <Button>
        <Link href={"/dashboard/profileInversor"}>Volver al Dashboard</Link>
      </Button>
      {/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Pago Exitoso</h1>
        <p className="text-gray-700 mb-2">Proyecto: {projectName}</p>
        <p className="text-gray-700 mb-2">Monto: {amount} USD</p>
        <p className="text-gray-700 mb-4">Aporte: {anonymous ? 'Anónimo' : 'Público'}</p>

        <Button onClick={handleReturn} className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Volver al Dashboard
        </Button>
      </div> */}
    </div>
  );
}