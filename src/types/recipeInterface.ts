export interface RecipeProps {
  params: { id: string }
}

export interface Step {
  _id: string;
  description: string;
}

export interface Ingredient {
  _id: string;
  amount: number;
  name: string;
  unit: string;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  username: string;
  difficulty: number;
  duration: number;
  calories: number;
  stars: number;
  steps: Step[];
  ingredients: Ingredient[];
  image: string;
}