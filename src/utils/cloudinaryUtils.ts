import { v2 as cloudinary } from 'cloudinary'
import { fileToBuffer } from '@/utils/functions'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImageCloudinary = async (img: File, folderName: string) => {

  const imgBuffer = await fileToBuffer(img)

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: folderName,
      transformation: [
        { width: 500, height: 500, crop: 'fill' }
      ]
    }, (err, res) => {
      if (err) {
        reject(err)
        return NextResponse.json({
          message: 'Error al guardar imagen',
          error: true
        }, { status: 400 })
      }

      return resolve(res)
    }).end(imgBuffer)
  })

  return response
}