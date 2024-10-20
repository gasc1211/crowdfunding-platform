"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, ChevronRight, User } from "lucide-react"

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

type Project = {
    id: number
    name: string
    progress: number
  }

export default function Dashboard() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

const projects: Project[] = [
    { id: 1, name: "Website Redesign", progress: 75 },
    { id: 2, name: "Mobile App Development", progress: 40 },
    { id: 3, name: "Database Migration", progress: 90 },
    ]

  return (
    <>
    <div className=" bg-gray-100">
    <div className="relative w/screen h-[25vh] overflow-hidden">
                <Image 
                    src="/dashboard-plant2.png"
                    alt="Dashboard plant"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                    />
    </div>
    </div>
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/avatar.png"
                alt="Profile picture"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">John Doe</h2>
            <p className="text-gray-500 mb-4">Software Developer</p>
            <div className="flex gap-4">
              <Button>
                <User className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Ongoing Projects</CardTitle>
            <CardDescription>Your current project progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{project.name}</p>
                    <Progress value={project.progress} className="w-[60%]" />
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                        Details
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
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ChevronRight className="mr-2 h-4 w-4" /> View All Projects
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </>
  )
}