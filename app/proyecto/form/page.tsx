'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { createClient } from '@/utils/supabase/client'
import { getUserId } from '@/app/api/handler'
import { UUID } from 'crypto'


export default function CreateProjectForm() {
  const [userId, setUserId] = useState<UUID>();
  const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
  const [project, setProject] = useState<ProjectInsert>({
    description: '',
    expected_finish_date: '',
    investment_goal: 0,
    location: '',
    name: '',
    producer_id: userId,
    progress: 0,
    project_banner_url: '',
    start_date: '',
    total_invested: 0
  });
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchId() {
      try {
        console.log("Fetching user data..."); // Debugging line
        const data = await getUserId();
        console.log("User Id:", data); // Log the fetched data
        setUserId(data.user_id);
        setProject(prev => ({...prev, producer_id: data.user_id}));


      } catch (err) {
        console.error(err); // Log the error
        if (err instanceof Error) {
          setError(err); // Set the error safely
        } else {
          setError(new Error("An unknown error occurred.")); // Fallback
        }
      }
    }

    fetchId();
  }, []);
  if (error) return <div>Error: {error.message}</div>;
  if (!userId) return <div>Loading...</div>;
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProject(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()

      if (error) throw error

      console.log('Project created:', data)
      router.push('/dashboard/inversor') // Redirect to projects list page
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Error creating project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>Fill in the details to create a new project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={project.description ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project_banner_url">Project Banner URL</Label>
            <Input
              id="project_banner_url"
              name="project_banner_url"
              value={project.project_banner_url ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={project.start_date ?? ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected_finish_date">Expected Finish Date</Label>
              <Input
                id="expected_finish_date"
                name="expected_finish_date"
                type="date"
                value={project.expected_finish_date ?? ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={project.progress?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investment_goal">Investment Goal</Label>
              <Input
                id="investment_goal"
                name="investment_goal"
                type="number"
                step="0.01"
                value={project.investment_goal}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_invested">Total Invested</Label>
              <Input
                id="total_invested"
                name="total_invested"
                type="number"
                step="0.01"
                value={project.total_invested}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={project.location ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <CardFooter className="px-0">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}