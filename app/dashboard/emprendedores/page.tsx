"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
/* import { calculateAge } from "@/app/api/edad" */
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getUserData, getUserProjects } from "@/app/api/handler"
import { Database } from "@/database.types"


export default function Dashboard() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'] | null>(null);
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    const [projects, setProjects] = useState<Project[]>([]); // State to store projects

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching user data..."); // Debugging line
        const data = await getUserData();
        console.log("User Data:", data); // Log the fetched data
        setUserData(data);

         // Fetch projects for the logged-in user using their user_id
         const userProjects = await getUserProjects(data.user_id);
         setProjects(userProjects);
 
    
      } catch (err) {
        console.error(err); // Log the error
        if (err instanceof Error) {
            setError(err); // Set the error safely
        } else {
            setError(new Error("An unknown error occurred.")); // Fallback
        }
    }
    }

    fetchData();
  }, []);
  if (error) return <div>Error: {error.message}</div>;
  if (!userData) return <div>Loading...</div>;
 

  return (
    <>
    <div className="mx-auto">
      <div className="relative h-[20vh] overflow-hidden m-5">
        <Image 
          src="/dashboard-plant2.png"
          alt="Dashboard plant"
          fill
          className="object-cover rounded-xl"
          sizes="100vw"
          priority
        />
        {}
        <div  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
          <h1 className="text-white text-4xl font-bold text-center px-4">Bienvenido a tu Dashboard {userData?.first_name}</h1>
        </div>
      </div>
    </div>
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <Card className="w-full lg:w-1/3">
          <CardHeader className="text-center">
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
              <div key={userData.auth_id} className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4 mx-auto">
                  <Image
                    src="/avatar.png"
                    alt="Profile picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              <h2 className="text-2xl font-bold mb-2 text-center">{userData.first_name}</h2>
              <p className="text-gray-500 mb-4 text-center">Edad: 33 Años</p>
              <br />
              <p className="text-center">{userData.email}</p>
              <br />
              <div className="flex flex-col gap-4 w-full">
                <Button className="w-full">
                  <div> Crear Nuevo Proyecto </div>
                </Button>
                <Button className="w-full">
                  <div> Ver Proyectos Completados </div>
                </Button>
                </div>
              </div>
          </CardContent>
        </Card>
        <Card className="w-full lg:w-3/5">
          <CardHeader>
            <CardTitle>Proyectos en Desarrollo</CardTitle>
            <CardDescription>El Progreso de los Proyyectos Actuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-14">
              {projects.map((project) => (
                <div key={project.project_id} className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <div className="w-full md:w-1/3">
                    <p className="text-sm font-medium leading-none mb-2">Progreso</p>
                    <Progress value={project.progress} className="w-full" />
                  </div>
                  <div className="flex justify-start">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                          Más Detalles
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{selectedProject?.name}</AlertDialogTitle>
                          <AlertDialogDescription>
                            Project progress: {selectedProject?.progress}%
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <p className="py-4">
                          This is where you would display more detailed information about the selected project,
                          such as team members, deadlines, and specific tasks.
                        </p>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Close</AlertDialogCancel>
                          <AlertDialogAction>View Full Details</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <br />
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ChevronRight className="mr-2 h-4 w-4" /> Ver todos los Proyectos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </>
  )
}