import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { Recipe } from '@/models/Recipe'
import mongoose from 'mongoose'

interface ParamsProps {
  params: { id: string }
}

export async function GET(request: Request, { params }: ParamsProps) {
  await getConn()
  const { id } = params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      {
        message: 'Receta no encontrada',
        error: true
      },
      { status: 400 }
    )
  }

  try {
    const recipeData = await Recipe.findOne({ _id: id });

    if (!recipeData) {
      return NextResponse.json(
        {
          message: 'Receta no encontrada',
          error: true
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        message: 'Success',
        data: recipeData,
        error: false
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Error en el servidor',
        error: true
      },
      { status: 500 }
    )
  }
}
