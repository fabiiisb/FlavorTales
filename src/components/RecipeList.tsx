import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import testImg from "@/img/test.jpg";
import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";
import StarRating from "./subComponents/StarRating";
import difficultyToText from "@/utils/recipeDifficulty";

interface Recipes {
  id: number;
  title: string;
  user: string;
  stars: number;
  minutes: number;
  difficulty: number;
  ingredients: string[];
}

interface CardListProps {
  recipes: Recipes[];
}

const CardList = ({ recipes }: CardListProps) => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[minmax(200px,auto)] ">
        {recipes.map((recipe) => (
          <Link
            href={`/receta/${recipe.id}`}
            key={recipe.id}
          >
            <Card
              className="bg-white/65 overflow-hidden rounded-2xl drop-shadow-lg"
              title={recipe.title}
            >
              <CardHeader className="p-0 relative group">
                <Image
                  className="w-full max-h-[200px] object-cover rounded-2xl "
                  src={testImg}
                  alt="Imagen receta"
                />
                <div
                  className="scroll-container backdrop-blur-sm bg-gradient-to-r from-black/70 absolute p-2 pl-4 !m-0 w-full h-full opacity-0 group-hover:opacity-100 rounded-2xl overflow-auto text-white transition-opacity duration-300 "
                >
                  <p className="mb-1">Ingredientes:</p>
                  <ul className="list-disc list-outside pl-5 space-y-1 marker:text-[#ed5c4c]">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardHeader>
              <CardFooter
                className="flex flex-col gap-3 px-2"
              >
                <CardTitle className="text-forest-900 tracking-wide h-5	truncate">
                  {recipe.title}
                </CardTitle>

                <div className="flex flex-col items-start gap-1">
                  <Badge
                    className="flex gap-1"
                    variant={'forest'}
                  >
                    <Clock className="w-4 h-4" />
                    {recipe.minutes} min
                  </Badge>
                  <Badge
                    className="flex gap-1"
                    variant={'forest'}
                  >
                    <ChefHat className="w-4 h-4" />
                    {difficultyToText(recipe.difficulty)}
                  </Badge>
                </div>
                <StarRating rating={recipe.stars} />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardList;
