'use client'
import { HeroInversor } from "@/app/ui/components/Hero";
import Sidebar from "@/app/ui/components/Sidebar";
import InversorDetails from "@/app/ui/components/InversorDetails";
import { useState, useEffect } from "react";
import { getUserData } from "@/app/api/handler";
// import { getUserProjects } from "@/app/api/handler";

export default function ProfileInversor() {
        const [userData, setUserData] = useState<Users | null>(null);
        const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
        // const [projects, setProjects] = useState<Project[]>([]); // State to store projects
      
        useEffect(() => {
          async function fetchData() {
            try {
              console.log("Fetching user data..."); // Debugging line
              const data = await getUserData();
              //console.log("User Data:", data); // Log the fetched data
              setUserData(data);
      
              // Fetch projects for the logged-in user using their user_id
              // const userProjects = await getUserProjects(data.user_id);
      
              // setProjects(userProjects);
      
      
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
            <div className="bg-gray-100">
                <HeroInversor userName = {userData.first_name || 'Guest'}/>
                <br />
                <div className="flex flex-col lg:flex-row justify-between mt-4 items-center">
                        <Sidebar />
                        <InversorDetails />
                </div>
            </div>
    );
}
