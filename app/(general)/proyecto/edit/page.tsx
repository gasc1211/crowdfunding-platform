'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'
import { deleteBannerImage, deleteImage, getProject, getProjectCategory, getUrls, insertImageUrls, updateProjectCategory } from '@/app/api/handler'
import { getCategories } from '@/app/api/handler'
import { updateProject } from '@/app/api/handler'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';



export default function EditProject() {
  const supabase = createClient()
  const [project, setProject] = useState<ProjectUpdate>()
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [images, setImages] = useState<ProjectImagesUpdate[]>([])
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const { toast } = useToast()
  const searchParams = useSearchParams();
  const [project_id, setProject_id] = useState<ProjectUpdate['project_id']>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const router = useRouter();
  /* const [projectCategories, setProjectCategories] = useState<ProjectCategoriesUpdate[]>(); */

  useEffect(() => {
    async function fetchId() {
      const idProject = searchParams.get('projectId');
      console.log('projectId:', idProject)
      if (idProject) {
        try {
          const parsedId = JSON.parse(idProject);
          setProject_id(parsedId);
          const proyecto = getProject(parsedId)
          console.log('parsedid: ', parsedId)
          console.log('proyecto: ', proyecto)

        } catch (err) {
          console.error('Failed to parse project:', err);
        }
      } else {
        console.error('No project data found in query');
      }

    }
    fetchId()
  }, [searchParams]);
  console.log('parsedid project_id: ', project_id)

  // Fetching initial data for project and categories
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('dentro de data: ', project_id)
        if (project_id) {
          console.log("hola")
          const [userProject, allCategories, imagesProject, projectCategory] = await Promise.all([
            getProject(project_id),
            getCategories(),
            getUrls(project_id),
            getProjectCategory(project_id)
          ]);
          setProject(userProject as Project);
          setCategories(allCategories);
          setImages(imagesProject);

          // Pre-select the project's categories
          if (projectCategory && Array.isArray(projectCategory)) {
            const categoryIds = projectCategory
              .map(cat => cat.category_id)
              .filter((id): id is string => id !== undefined); // Remove undefined values
            setSelectedCategories(categoryIds);
          }
          else console.log("hola pendejo ha")
        }

      } catch (err) {
        console.error('Fetch error:', err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [project_id]);

  console.log("project fetchet: ", project)



  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!project) return;

    const { name, value } = e.target;

    const totalInvested = project.total_invested ?? 0; // Default to 0 if undefined
    const investmentGoal = project.investment_goal ?? 1; // Avoid division by 0, use 1 as a safe fallback

    setProject({
      ...project,
      [name]: value,
      progress: Math.min((totalInvested / investmentGoal) * 100, 100),
    });
  }


  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 6); // Limit to 6 files
      setImagesFiles(selectedFiles);
    }
  };

  function handleCategoryChange(categoryId: string) {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerFile(e.target.files[0]);
    }
  };

  async function handleRemoveImage(imageId: string, imageUrl: string | null) {
    try {
      // Delete image from Supabase Storage
      if (imageUrl) {
        deleteImage(imageId, imageUrl)
      }

      // Update state
      setImages(images.filter(img => img.image_id !== imageId));
      toast({
        title: "Image Removed",
        description: "The image has been successfully removed.",
      });
    } catch (err) {
      console.error('Error removing image:', err);
      toast({
        title: "Error",
        description: "Failed to remove the image. Please try again.",
        variant: "destructive",
      });
    }
  }

  async function handleRemoveBannerImage(projectId: string, imageUrl: string | null) {
    try {
      // Delete image from Supabase Storage
      if (imageUrl) {
        console.log('projectId banner: ', projectId)
        deleteBannerImage(projectId, imageUrl);
      }

      // Update state
      setProject((prevProject) => ({
        ...prevProject,
        bannerImage: null, // Assuming `bannerImage` holds the image URL
      }));
    } catch (err) {
      console.error('Error removing image:', err);
      toast({
        title: "Error",
        description: "Failed to remove the image. Please try again.",
        variant: "destructive",
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!project) return

    try {

      if (bannerFile) {
        // Reemplazar espacios y caracteres especiales en el nombre del archivo
        // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
        const sanitizedFileName = bannerFile.name
          .normalize("NFD") // Descompone caracteres acentuados
          .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
          .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
          .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos

        // Sube la imagen al bucket de Supabase
        const { error: uploadError } = await supabase.storage
          .from("Images_Projects")
          .upload(`banners/${sanitizedFileName}`, bannerFile);

        if (uploadError) {
          console.error("Error al subir la imagen:", uploadError.message);
          setLoading(false);
          return;
        }

        // Obtener la URL pública de la imagen
        const { data: urlData } = supabase.storage
          .from("Images_Projects")
          .getPublicUrl(`banners/${sanitizedFileName}`);

        const projectBannerUrl = urlData?.publicUrl || "";
        console.log("project Banner Url: ", projectBannerUrl);

        if (!projectBannerUrl) {
          console.error("Error: No se pudo obtener la URL de la imagen");
          setLoading(false);
          return;
        }
        project.project_banner_url = projectBannerUrl;
      }

      // Update `projects` table
      updateProject(project);

      // Update `project_categories` table
      updateProjectCategory(project.project_id!, selectedCategories)



      // Upload images and insert their URLs
      if (imagesFiles.length > 0) {
        const uploadedImageUrls: string[] = [];
        for (const image of imagesFiles) {
          const sanitizedImageName = image.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9._-]/g, "");

          const { error: imageError } = await supabase.storage
            .from("Images_Projects")
            .upload(`projectImages/${sanitizedImageName}`, image);

          if (imageError) throw new Error(`Error uploading image ${image.name}`);

          const { data: imageUrlData } = supabase.storage
            .from("Images_Projects")
            .getPublicUrl(`projectImages/${sanitizedImageName}`);

          if (imageUrlData?.publicUrl) {
            uploadedImageUrls.push(imageUrlData.publicUrl);
          }
        }

        // Send uploaded image URLs to the server
        await insertImageUrls(uploadedImageUrls, project.project_id!);
      }


      console.log('Project data:', project)
      console.log('Selected categories:', selectedCategories)

      router.push(`/proyecto?project=${encodeURIComponent(JSON.stringify(project))}`);

      toast({
        title: "Success",
        description: "Project updated successfully!",
      })
    } catch (err) {
      console.error('Error updating project:', err)
      toast({
        title: "Error",
        description: "Failed to update the project. Please try again.",
        variant: "destructive",
      })
    }
  }

  function getFileNameFromUrl(url: string) {
    const fileNameWithExtension = url.split('/').pop(); // Extract the last part of the URL
    if (!fileNameWithExtension) return ''; // Handle cases where `pop()` returns undefined
    return fileNameWithExtension.split('.')[0]; // Remove the file extension
  }

  if (error) return <div>Error: {error.message}</div>;
  if (loading || !project) return <div>Loading...</div>

  return (
    <div className="container max-w-2xl mx-auto p-4">

      <Card>
        <CardHeader>
          <CardTitle>Editar Proyecto: {project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className='font-bold'>Nombre del Proyecto</Label>
                <Input
                  id="name"
                  name="name"
                  value={project.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description" className='font-bold'>Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={project.description || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="beneficios" className='font-bold'>Beneficios</Label>
                <Textarea
                  id="beneficios"
                  name="beneficios"
                  value={project.beneficios || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="investment_goal" className='font-bold'>Meta de Inversión</Label>
                <Input
                  id="investment_goal"
                  name="investment_goal"
                  type="number"
                  value={project.investment_goal}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="progress" className='font-bold'>Progress (%)</Label>
                <Input
                  id="progress"
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={project.progress!}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="location" className='font-bold'>Ubicación del Proyecto</Label>
                <Input
                  id="location"
                  name="location"
                  value={project.location || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="start_date" className='font-bold'>Fecha de Comienzo de Proyecto</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={project.start_date || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="expected_finish_date" className='font-bold'>Fecha de Finalización Estimada</Label>
                <Input
                  id="expected_finish_date"
                  name="expected_finish_date"
                  type="date"
                  value={project.expected_finish_date || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label className='font-bold'>Categorias</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map(category => (
                  <div key={category.category_id} className="flex items-center m-1 space-x-2">
                    <Checkbox
                      id={`category-${category.category_id}`}
                      checked={selectedCategories.includes(category.category_id)}
                      onCheckedChange={() => handleCategoryChange(category.category_id)}
                    />
                    <Label htmlFor={`category-${category.category_id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className='font-bold'>Banner del Proyecto</Label>
              <div className="space-y-2 mt-2">
                {project.project_banner_url ? (
                  // If there is a banner image
                  <div key={project.project_banner_url} className="flex items-center space-x-2">
                    <Input value={getFileNameFromUrl(project.project_banner_url) || ''} readOnly className="flex-grow" />
                    <Button type="button" variant="destructive" onClick={() => handleRemoveBannerImage(project_id!, project.project_banner_url!)}>
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  // If there is no banner image
                  <div className="space-y-2">
                    <Label htmlFor="project_banner_url" className='font-bold'>Subir Imagen</Label>
                    <Input
                      id="project_banner_url"
                      name="project_banner_url"
                      type="file"
                      multiple
                      className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label className='font-bold'>Imágenes Del Proyecto</Label>
              <div className="space-y-2 mt-2">
                {images.map(image => (
                  <div key={image.image_id} className="flex items-center space-x-2">
                    <Input value={getFileNameFromUrl(image.image_url!) || ''} readOnly className="flex-grow" />
                    <Button type="button" variant="destructive" onClick={() => handleRemoveImage(image.image_id!, image.image_url!)}>Eliminar</Button>
                  </div>
                ))}
                <br />
                <div className="space-y-2">
                  <Label htmlFor="images" className='font-bold'>Subir Imágenes del Proyecto (Máximo 6 en Total)</Label>
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    onChange={handleImagesChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">Actualizar Proyecto</Button>
          </form>
          <br />
          <Button className="w-full">
            <Link href={{
              pathname: "/dashboard/inversor",
              query: { userId: JSON.stringify(project.producer_id) }, // Serialize project object
            }}>
              Ver Todos Los Proyectos
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}