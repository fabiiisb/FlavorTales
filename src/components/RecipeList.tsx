import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import testImg from "@/img/test.jpg";
import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";
import StarRating from "./subComponents/StarRating";

const CardList = () => {
  const recipes = [
    {
      id: 1,
      title: "Pizza Margarita",
      user: "Fabian Barrientos",
      stars: 1,
      minutes: 30,
      difficulty: "Fácil",
    },
    {
      id: 2,
      title: "Tacos al Pastor",
      user: "Maria González",
      stars: 1.5,
      minutes: 45,
      difficulty: "Medio",
    },
    {
      id: 3,
      title: "Sopa de Tomate",
      user: "Luis Martínez",
      stars: 0.5,
      minutes: 25,
      difficulty: "Fácil",
    },
    {
      id: 4,
      title: "Ensalada César",
      user: "Ana Pérez",
      stars: 4.5,
      minutes: 20,
      difficulty: "Fácil",
    },
    {
      id: 5,
      title: "Brownies de Chocolate",
      user: "Carlos Rodríguez",
      stars: 5,
      minutes: 50,
      difficulty: "Dificil",
    },
  ];

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[minmax(200px,auto)]">
        {recipes.map((recipe) => (
          <Link
            href={`/receta/${recipe.id}`}
            key={recipe.id}
          >
            <Card
              className="bg-forest-50 overflow-hidden rounded-md border border-forest-100"
              title={recipe.title}
            >
              <CardHeader className="p-0">
                <Image
                  className="w-full max-h-[200px] object-cover rounded-md"
                  src={testImg}
                  alt="test"
                />
              </CardHeader>
              <CardFooter
                className="flex flex-col gap-3"
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
                    {recipe.difficulty}
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
