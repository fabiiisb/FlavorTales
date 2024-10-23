import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { Recipe } from '@/models/Recipe'
import { uploadImageCloudinary } from '@/utils/cloudinaryUtils'
import { CloudinaryResponse } from '@/types/cloudinaryInterface'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  await getConn()
  const formData = await request.formData()
  const session = await getServerSession(authOptions)

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const difficulty = parseInt(formData.get('difficulty') as string)
  const duration = parseInt(formData.get('duration') as string)
  const calories = parseInt(formData.get('calories') as string)
  const steps = JSON.parse(formData.get('steps') as string)
  const ingredients = JSON.parse(formData.get('ingredients') as string)
  const image = formData.get('image') as File
  let imgSecureUrl
  let imgPublicId

  if (!session) {
    return NextResponse.json({
      message: 'No tienes acceso a esta función, inicia sesión y vuelve a intentarlo',
      error: true
    }, { status: 401 })
  }

  try {
    const responseImg = await uploadImageCloudinary(image, 'RecipeImageFolder') as CloudinaryResponse

    imgSecureUrl = responseImg.secure_url
    imgPublicId = responseImg.public_id

  } catch {
    return NextResponse.json({
      message: 'Error al guardar la imagen',
      error: true
    }, { status: 400 })
  }

  try {
    const recipeData = await Recipe.create(
      {
        title,
        description,
        username: session.user.name,
        difficulty,
        duration,
        calories,
        image_url: imgSecureUrl,
        image_id: imgPublicId,
        steps,
        ingredients
      }
    )

    if (!recipeData) {
      return NextResponse.json({
        message: 'Error guardando la receta',
        error: true
      }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Success',
      error: false,
      data: recipeData._id
    }, { status: 200 })

  } catch (err) {
    return NextResponse.json({
      message: 'Internal Server Error',
      error: true
    }, { status: 500 })
  }
}
