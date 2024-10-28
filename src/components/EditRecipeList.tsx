import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Pencil } from "lucide-react"
import StarRating from "./subComponents/StarRating"
import { Button } from "./ui/button"
import { RecipeUI } from "@/types/recipeInterface"

interface EditRecipeListProps {
  recipeList: RecipeUI[]
}

const EditCardList = ({ recipeList } : EditRecipeListProps) => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[minmax(200px,auto)] ">
        {recipeList.map((recipe) => (
          <Link
            href={`/receta/${recipe._id}`}
            key={recipe._id}
          >
            <Card
              className="bg-white/65 overflow-hidden rounded-2xl drop-shadow-lg"
              title={recipe.title}
            >
              <CardHeader className="p-0 relative">
                <Image
                  className="w-full max-h-[200px] object-cover rounded-2xl "
                  width={250}
                  height={250}
                  src={recipe.image_url}
                  alt="Imagen receta"
                />
                <Button
                  size={'icon'}
                  className="absolute rounded-full top-1 right-1 !m-0 h-9 w-9 opacity-85 hover:opacity-100"
                  variant={'destructive'}
                >
                  <Pencil  className="h-5 w-5"/>
                </Button>
              </CardHeader>
              <CardFooter
                className="flex flex-col gap-3 px-2"
              >
                <CardTitle className="text-forest-900 tracking-wide h-5	truncate">
                  {recipe.title}
                </CardTitle>
                <StarRating rating={recipe.stars} />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EditCardList
