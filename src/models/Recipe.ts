import mongoose, { Schema, Document } from 'mongoose'

interface Step {
  description: string
}

interface Ingredient {
  name: string
  amount: number
  unit: string
}

interface IRecipe extends Document {
  title: string
  description: string
  username: string
  difficulty: number
  duration: number
  calories: number
  image: string
  stars: number
  steps: Step[]
  ingredients: Ingredient[]
}

const RecipeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, required: true
  },
  username: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
    default: 0
  }, 
  duration: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }, 
  image: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  steps: [{
    description: {
      type: String,
      required: true
    }
  }],
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  }]
})

export const Recipe = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema, 'recipes')