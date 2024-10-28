import EditCardList from "@/components/EditRecipeList"
import { Error500 } from "@/components/ErrorResponses"
import { Button } from "@/components/ui/button"
import { headers } from "next/headers"
import Link from "next/link"
import { RecipeUI } from "@/types/recipeInterface"

const page = async () => {
  let fetchData

  const fetchUserRecipes = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/mis-recetas`, {
      method: 'GET',
      headers: headers(),
      cache: 'no-cache'
    })

    return res.json()
  }

  try {
    fetchData = await fetchUserRecipes()
  } catch (err) {
    return <Error500 />
  }

  const recipeData: RecipeUI[] = fetchData.data

  return (
    <div className='m-6'>
      <h3 className="font-semibold tracking-tight text-2xl mb-3">
        Tus recetas
      </h3>

      <section>
        {recipeData.length === 0 ?
          (
            <div className="text-center mt-6">
              <p className="text-xl font-bold mb-2">
                Aún no tienes recetas guardadas.
              </p>
              <p className="text-base text-muted-foreground">
                ¿Te gustaría crear nuevas recetas y darles un toque personal?
              </p>
              <Link href={'/crear/receta'}>
                <Button className="px-6 py-3 mt-4">
                  Crear Receta
                </Button>
              </Link>
            </div>
          )
          :
          (
            <EditCardList recipeList={recipeData} />
          )
        }
      </section>

    </div>
  )
}

export default page