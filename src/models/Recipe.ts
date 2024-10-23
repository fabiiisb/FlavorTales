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
  image_url: string
  image_id: string
  stars: number
  steps: Step[]
  ingredients: Ingredient[]
}

const RecipeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 55
  },
  description: {
    type: String,
    required: true,
    min: 35,
    max: 250
  },
  username: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  }, 
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 2000
  },
  calories: {
    type: Number,
    required: true,
    min: 1,
    max: 99999
  }, 
  image_url: {
    type: String,
    required: true
  },
  image_id: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 5
  },
  steps: [{
    description: {
      type: String,
      required: true,
      min: 3,
      max: 450
    }
  }],
  ingredients: [{
    name: {
      type: String,
      required: true,
      min: 2,
      max: 40
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
      max: 9999
    },
    unit: {
      type: String,
      required: true,
      enum: [
        'Gramos',
        'Miligramos',
        'Kilogramos', 
        'Mililitros', 
        'Litros', 
        'Tazas', 
        'Cucharadas', 
        'Cucharaditas', 
        'Pizca', 
        'Unidad'
      ],
    }
  }]
})

export const Recipe = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema, 'recipes')