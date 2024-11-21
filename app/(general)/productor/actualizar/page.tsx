'use client'

import { useState, FormEvent } from 'react'
/* import { useRouter } from 'next/navigation' */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

type Producer = {
  biography: string | null
  location: string | null
  profile_banner_url: string | null
  profile_image_url: string | null
  user_id: string | null
}

export default function EditProducer() {
  /* const router = useRouter() */
  const [producer, setProducer] = useState<Producer>({
    biography: '',
    location: '',
    profile_banner_url: '',
    profile_image_url: '',
    user_id: null, // This won't be editable
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProducer(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Here you would typically send a PUT or PATCH request to your API
    // For example:
    // await fetch('/api/producer', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(producer),
    // })
    console.log('Producer data to be updated:', producer)
    // After successful update, you might want to redirect:
    // router.push('/producer/profile')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil de Productor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="biography">Biografía</Label>
                <Textarea
                  id="biography"
                  name="biography"
                  value={producer.biography || ''}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Residencia</Label>
                <Input
                  id="location"
                  name="location"
                  value={producer.location || ''}
                  onChange={handleChange}
                  placeholder="Where are you based?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile_banner_url">Banner de Perfil</Label>
                <Input
                  id="profile_banner_url"
                  name="profile_banner_url"
                  value={producer.profile_banner_url || ''}
                  onChange={handleChange}
                  placeholder="URL for your profile banner"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile_image_url">Imagen de Perfil</Label>
                <Input
                  id="profile_image_url"
                  name="profile_image_url"
                  value={producer.profile_image_url || ''}
                  onChange={handleChange}
                  placeholder="URL for your profile image"
                />
              </div>
              <div className='flex flex-row justify-around'>
                <Button type="submit">Actualizar Perfil</Button>
                <Button><Link href="/dashboard/emprendedores">Regresar</Link></Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}