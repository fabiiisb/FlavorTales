import Landing from "@/components/Landing";
import CardList from "@/components/RecipeList";

export default function Home() {
  const recipes = [
    {
      id: 1,
      title: "Pizza Margarita",
      user: "Fabian Barrientos",
      stars: 1,
      minutes: 30,
      difficulty: 1,
      ingredients: ["Tomate", "Queso Mozzarella", "Albahaca", "Masa para pizza", "oregano", "gluten", "harina", "test" , "test" ,"test"]
    },
    {
      id: 2,
      title: "Tacos al Pastor",
      user: "Maria González",
      stars: 1.5,
      minutes: 45,
      difficulty: 2,
      ingredients: ["Tortillas de maíz", "Carne de cerdo", "Piña", "Cilantro"]
    },
    {
      id: 3,
      title: "Sopa de Tomate",
      user: "Luis Martínez",
      stars: 0.5,
      minutes: 25,
      difficulty: 1,
      ingredients: ["Tomates", "Cebolla", "Ajo", "Caldo de vegetales"]
    },
    {
      id: 4,
      title: "Ensalada César",
      user: "Ana Pérez",
      stars: 4.5,
      minutes: 20,
      difficulty: 1,
      ingredients: ["Lechuga romana", "Crutones", "Parmesano", "Aderezo César"]
    },
    {
      id: 5,
      title: "Brownies de Chocolate",
      user: "Carlos Rodríguez",
      stars: 5,
      minutes: 50,
      difficulty: 3,
      ingredients: ["Chocolate", "Harina", "Huevos", "Azúcar", "Mantequilla"]
    },
  ];

  return (
    <>
      <Landing />
      <div className="p-3">

        <CardList recipes={recipes}/>
      </div>
    </>
  );
}
