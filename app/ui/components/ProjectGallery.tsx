'use client'

import { useState } from 'react'
import Image from 'next/image'

// Sample image data - replace with your actual image data
const images = [
  { id: 1, src: '/farm.jpg', alt: 'Image 1' },
  { id: 2, src: '/hortaliza.webp', alt: 'Image 2' },
  { id: 3, src: '/productor.webp', alt: 'Image 3' },
  { id: 4, src: '/placeholder.svg?height=150&width=150', alt: 'Image 4' },
  { id: 5, src: '/placeholder.svg?height=150&width=150', alt: 'Image 5' },
  { id: 6, src: '/placeholder.svg?height=150&width=150', alt: 'Image 6' },
]

export default function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Selected Image Display */}
        <div className="md:w-3/4">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image
              src={selectedImage.src.replace('150', '600')}
              alt={selectedImage.alt}
              fill // Replaces layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        {/* Thumbnail List */}
        <div className="md:w-1/4">
          <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
            {images.map((image) => (
              <button
                key={image.id}
                className={`relative aspect-square w-full overflow-hidden rounded-md ${
                  selectedImage.id === image.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill // Replaces layout="fill"
                  className="object-cover transition-transform hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
