import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { Recipe } from '@/models/Recipe'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: Request) {
  await getConn()

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({
      message: 'No tienes acceso a esta función, inicia sesión y vuelve a intentarlo',
      error: true
    }, { status: 401 })
  }

  try {
    const recipeData = await Recipe.find(
      { username: session.user.name },
      { username: 0 }
    )

    if (!recipeData) {
      return NextResponse.json(
        {
          message: 'Recetas no encontradas',
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
