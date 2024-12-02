'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

interface FormData {
  profile_picture: File | null
  banner_picture: File | null
  biography: string
  location: string
}

export default function CrearPerfilProductor() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    profile_picture: null,
    banner_picture: null,
    biography: '',
    location: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [previewProfilePicture, setPreviewProfilePicture] = useState<string | null>(null)
  const [previewBannerPicture, setPreviewBannerPicture] = useState<string | null>(null)
  const profilePictureInputRef = useRef<HTMLInputElement>(null)
  const bannerPictureInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: 'profile' | 'banner') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (imageType === 'profile') {
          setFormData({ ...formData, profile_picture: file })
          setPreviewProfilePicture(reader.result as string)
        } else {
          setFormData({ ...formData, banner_picture: file })
          setPreviewBannerPicture(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.profile_picture) newErrors.profile_picture = 'La foto de perfil es requerida.'
    if (!formData.banner_picture) newErrors.banner_picture = 'La foto de banner es requerida.'
    if (formData.biography.length < 10) newErrors.biography = 'La biografía debe tener al menos 10 caracteres.'
    if (formData.location.length < 2) newErrors.location = 'La ubicación debe tener al menos 2 caracteres.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const supabase = createClient()
      let profilePictureUrl = null
      let bannerPictureUrl = null

      if (formData.profile_picture) {
        const { data: profileData, error: profileError } = await supabase.storage
          .from('profile-images')
          .upload(`profile_${Date.now()}.jpg`, formData.profile_picture)

        if (profileError) throw profileError
        const { data: { publicUrl: profilePublicUrl } } = supabase.storage.from('profile-images').getPublicUrl(profileData.path)
        profilePictureUrl = profilePublicUrl
      }

      if (formData.banner_picture) {
        const { data: bannerData, error: bannerError } = await supabase.storage
          .from('profile-images')
          .upload(`banner_${Date.now()}.jpg`, formData.banner_picture)

        if (bannerError) throw bannerError
        const { data: { publicUrl: bannerPublicUrl } } = supabase.storage.from('profile-images').getPublicUrl(bannerData.path)
        bannerPictureUrl = bannerPublicUrl
      }

      const { error } = await supabase.from('producer').insert([
        {
          profile_picture: profilePictureUrl,
          banner_picture: bannerPictureUrl,
          biography: formData.biography,
          location: formData.location,
        },
      ])

      if (error) throw error
      alert('Perfil creado exitosamente')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creando perfil:', error)
      alert('Hubo un problema al crear el perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear Perfil de Productor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2">
            {previewProfilePicture ? (
              <Image src={previewProfilePicture} alt="Vista previa de perfil" width={128} height={128} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => profilePictureInputRef.current?.click()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Subir foto de perfil
          </button>
          <input
            ref={profilePictureInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'profile')}
            className="hidden"
            aria-label="Subir foto de perfil"
          />
          {errors.profile_picture && (
            <p className="mt-1 text-sm text-red-600">{errors.profile_picture}</p>
          )}
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="w-full h-32 bg-gray-200 mb-2 overflow-hidden">
            {previewBannerPicture ? (
              <Image src={previewBannerPicture} alt="Vista previa de banner" width={500} height={128} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => bannerPictureInputRef.current?.click()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Subir foto de banner
          </button>
          <input
            ref={bannerPictureInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'banner')}
            className="hidden"
            aria-label="Subir foto de banner"
          />
          {errors.banner_picture && (
            <p className="mt-1 text-sm text-red-600">{errors.banner_picture}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="biography" className="mb-1 font-medium text-gray-700">
            Biografía
          </label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
          {errors.biography && (
            <p className="mt-1 text-sm text-red-600">{errors.biography}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="mb-1 font-medium text-gray-700">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Crear Perfil'}
        </button>
      </form>
    </div>
  )
}