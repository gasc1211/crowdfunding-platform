'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUrls } from '@/app/api/handler';

type GalleryProps = {
  projectId: string | null;
};

type ProjectImage = {
  image_id: string; // Ensure this matches your database schema
  image_url: string;
};

export default function ProjectGallery({ projectId }: GalleryProps) {
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setError(new Error("Invalid project ID."));
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const data = await getUrls(projectId!);
        setProjectImages(data);
        console.log('data: ', data)
        // Set the first image as the selected one if available
        if (data.length > 0) {
          setSelectedImage(data[0]);
        }
      } catch (err) {
        console.error(err);
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
  }, [projectId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!projectImages || projectImages.length === 0)
    return <div className='text-primary m-10 text-2xl'>Animate y Sube Imagenes para este Proyecto</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 ml-5 text-primary">Galeria de Imagenes</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Selected Image Display */}
        <div className="md:w-3/4">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage.image_url.replace('150', '600')}
                alt="Selected Image"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Thumbnail List */}
        <div className="md:w-1/4">
          <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
            {projectImages.map((image) => (
              <button
                key={image.image_id}
                className={`relative aspect-square w-full overflow-hidden rounded-md ${
                  selectedImage?.image_id === image.image_id
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.image_url}
                  alt={`Thumbnail ${image.image_id}`}
                  fill
                  className="object-cover transition-transform hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
