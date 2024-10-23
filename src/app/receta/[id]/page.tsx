import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, Gauge, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import StarRating from "@/components/subComponents/StarRating"
import difficultyToText from "@/utils/recipeDifficulty"
import { Error404, Error500 } from "@/components/ErrorResponses"
import { Recipe, RecipeProps } from "@/types/recipeInterface"

const Page = async ({ params }: RecipeProps) => {
  let data

  const getRecipe = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/receta/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    })

    return res.json()
  }

  try {
    data = await getRecipe()
  } catch (err) {
    return (<Error500 />)
  }

  if (data.message === "Receta no encontrada") {
    return (<Error404 />)
  }

  const recipeData: Recipe = data.data

  return (
    <div className="p-6 px-6 lg:px-10 xl:px-32 ">
      <div className="flex  flex-col-reverse sm:flex-row">
        <section className="flex-1 ">
          <h2 className="text-4xl font-semibold tracking-tighter mb-1.5">
            {recipeData.title}
          </h2>

          <Link href={'/'} className="inline-flex items-center text-muted-foreground hover:underline decoration-forest-500">
            <User className="h-5 w-5 text-black/70" />
            {recipeData.username}
          </Link>

          <p className="mt-4 whitespace-break-spaces	break-words">
            {recipeData.description}
          </p>
          <div className="flex mt-6 gap-10">

            <div className="flex flex-col gap-2 ">
              <p className="flex items-center text-forest-50 bg-forest-400 max-w-52 p-1 px-2 rounded-xl shadow-md">
                <Gauge
                  className="text-sunsetOrange-500  h-5 w-5 mr-2 drop-shadow-[0px_1px_3px_rgba(255,255,255,1)]"
                />
                Dificultad:&nbsp;
                <span className="font-semibold">
                  {difficultyToText(recipeData.difficulty)}
                </span>
              </p>
              <p className="flex items-center text-forest-50 bg-forest-400 max-w-52 p-1 px-2 rounded-xl shadow-md">
                <Clock
                  className="text-sunsetOrange-500 h-5 w-5 mr-2 drop-shadow-[0px_1px_3px_rgba(255,255,255,1)]"
                />
                Duración:&nbsp;
                <span className="font-semibold">
                  {recipeData.duration} min
                </span>
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl text-sunsetOrange-500 font-semibold border-b border-muted-foreground ">{recipeData.calories}</p>
              <p className="">Calorias</p>
            </div>

          </div>

          <div className="mt-6">
            <StarRating rating={recipeData.stars} size={22} />
          </div>
        </section>
        <section className="flex-1 flex justify-center mb-5 sm:mb-0 sm:pl-6">
          <Image
            className="aspect-square sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl"
            src={recipeData.image_url}
            width={500}
            height={500}
            alt="Imagen receta"
          />
        </section>
      </div>

      <section className="flex flex-col-reverse sm:flex-row mt-10  sm:justify-normal">
        <div className="flex-1 mt-10 sm:mt-0">
          <h2 className="mb-3 font-semibold">Receta</h2>
          <ol className="flex flex-col gap-2 list-decimal pl-5 list-outside">
            {recipeData.steps.map((step) => (
              <li
                className="min-h-6"
                key={step._id}
              >
                {step.description}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex sm:justify-center flex-1 sm:pl-6 ">
          <div>
            <h2 className="mb-3 font-semibold">Ingredientes</h2>
            <ul className="flex flex-col gap-2 ">
              {recipeData.ingredients.map((ingredient) => (
                <li
                  className="flex items-center space-x-2 min-h-6"
                  key={ingredient._id}
                >
                  <Checkbox id={ingredient._id} />
                  <Label
                    className="space-x-1"
                    htmlFor={ingredient._id}
                  >
                    <span className="text-forest-500 font-semibold">{ingredient.amount} {ingredient.unit}</span>
                    <span>/</span>
                    <span>{ingredient.name}</span>
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
