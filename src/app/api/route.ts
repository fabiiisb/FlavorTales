import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { Recipe } from '@/models/Recipe'

export async function GET() {
  await getConn()

  try {
    const recipeData = await Recipe.aggregate([
      { $sample: { size: 15 } },
      {
        $project: {
          title: 1,
          duration: 1,
          difficulty: 1,
          image: 1,
          stars: 1,
          ingredients: {
            $map: {
              input: "$ingredients",
              as: "ingredient",
              in: "$$ingredient.name"
            }
          }
        }
      }
    ])

    return NextResponse.json(
      {
        message: "Success",
        data: recipeData,
        error: false
      },
      { status: 200 }
    )

  } catch (err) {

    return NextResponse.json(
      {
        message: "Error",
        error: false
      },
      { status: 400 }
    )
  }

}