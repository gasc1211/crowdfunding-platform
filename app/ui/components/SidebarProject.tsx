'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileImageUpload from "./ProfileImageUpload";
import { calculateAge } from "@/app/api/edad";
import { useEffect, useState } from "react";
import { getUserByProjectId } from "@/app/api/handler";

type SidebarProjectProps = {
  producerId: string | null;
};



export default function SidebarProject({ producerId }: SidebarProjectProps) {
  const [userData, setUserData] = useState<Users | null>(null);
  const [error, setError] = useState<Error | null>(null); // Updated type to Error | null

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching user data..."); // Debugging line
        const data = await getUserByProjectId(producerId!);
        //console.log("User Data:", data); // Log the fetched data
        setUserData(data);

        // Fetch projects for the logged-in user using their user_id


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
  }, [producerId]);
  if (error) return <div>Error: {error.message}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <Card className="w-full lg:w-5/4 mr-4 md:mb-0 mb-4 h-auto">
      <CardHeader className="text-center">
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div key={userData.auth_id} className="flex flex-col items-center">
          <ProfileImageUpload profileId={producerId!} type="projectUserId"/>
          <h2 className="text-2xl font-bold mb-2 text-center">{userData.first_name}</h2>
          <p className="text-gray-500 mb-4 text-center">Edad: {calculateAge(new Date(userData.birth_date!))} Años</p>
          <br />
          <p className="text-center">{userData.email}</p>
          <br />
          <div className="flex flex-col gap-4 w-full">
            <Button className="w-full">
              <div><Link href={'/dashboard/inversor'}>Ver Proyectos</Link></div>
            </Button>
            <Button className="w-full">
              <div> Ver Proyectos Completados </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}