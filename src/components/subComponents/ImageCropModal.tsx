'use client'

import React, { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X } from 'lucide-react'

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropModal({ croppedImageUrl, setCroppedImageUrl } : any) {
  const [src, setSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setSrc(reader.result as string)
        setIsDialogOpen(true)

        setCrop(undefined)

        setCroppedImageUrl(null)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoaded = useCallback((img: HTMLImageElement) => {
    imageRef.current = img
    const aspect = 1
    setCrop(centerAspectCrop(img.width, img.height, aspect))
  }, [])

  const getCroppedImg = useCallback(() => {
    if (!crop || !imageRef.current) return

    const canvas = document.createElement('canvas')
    const image = imageRef.current
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty')
          return
        }
        const croppedImageUrl = URL.createObjectURL(blob)
        setCroppedImageUrl(croppedImageUrl)
        setIsDialogOpen(false)
      }, 'image/jpeg')
    }
  }, [crop])

  const deleteImage = () => {
    setCroppedImageUrl(null)
    setSrc(null)
    setCrop(undefined)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <>
      <p>Imagen receta</p>

      <div className="border rounded-lg shadow-md p-2 bg-transparent">
        <div>
          {croppedImageUrl && (
            <div className="mb-3 relative">
              <h3 className="text-sm font-semibold mb-2 text-center">
                Vista previa:
              </h3>
              <div className="flex justify-center">
                <div className='relative inline-block'>
                  <Image
                    className="rounded-xl mx-auto"
                    src={croppedImageUrl}
                    width={250}
                    height={250}
                    alt="Imagen recortada"
                  />
                  <Button
                    className="absolute -top-1 -right-1 rounded-full w-auto h-auto p-1"
                    onClick={deleteImage}
                    aria-label="Eliminar imagen"
                    variant={'destructive'}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="">
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-forest-400 file:text-white
              hover:file:bg-forest-500"
              required
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              className="max-w-3xl"
            >
              <DialogHeader>
                <DialogTitle>Edite su imagen</DialogTitle>
                <DialogDescription>
                  Recorte la imagen a su gusto
                </DialogDescription>
              </DialogHeader>
              {src && (
                <div className='mx-auto'>
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCrop(c)}
                    aspect={1}
                    minWidth={100}
                    minHeight={100}
                  >
                    <img
                      ref={imageRef}
                      alt="Crop me"
                      src={src}
                      onLoad={(e) => onImageLoaded(e.currentTarget)}
                    />
                  </ReactCrop>

                  <Button onClick={getCroppedImg} className="mt-4 w-full">
                    Recortar Imagen
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}