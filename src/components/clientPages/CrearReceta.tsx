'use client'

import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CardTitle } from "@/components/ui/card"
import { Plus, Minus, Loader2 } from 'lucide-react'
import { Ingredient } from '@/types/recipeInterface'
import ImageCropModal from '../subComponents/ImageCropModal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { urlToFile } from '@/utils/functions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

export default function RecipeUploadForm() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [difficulty, setDifficulty] = useState<number>(0)
  const [duration, setDuration] = useState<number>()
  const [calories, setCalories] = useState<number>()
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [steps, setSteps] = useState([{ description: '' }])
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }])
  const [errors, setErrors] = useState<{ difficulty?: string, ingredients: string[] }>({ ingredients: [] })
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [newRecipeId, setNewRecipeId] = useState('')

  const validateForm = () => {
    const newErrors: { difficulty?: string, ingredients: string[] } = { ingredients: [] }

    if (!difficulty) {
      newErrors.difficulty = 'Por favor, selecciona una dificultad.'
    }

    ingredients.forEach((ingredient, index) => {
      if (!ingredient.unit) {
        newErrors.ingredients[index] = 'Por favor, selecciona una unidad de medida.'
      } else {
        newErrors.ingredients[index] = ''
      }
    })

    setErrors(newErrors)

    const hasErrors =
      newErrors.difficulty ||
      newErrors.ingredients.some((error) => error !== '')

    return !hasErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'title':
        setTitle(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'duration':
        setDuration(Number(value))
        break
      case 'calories':
        setCalories(Number(value))
        break
    }
  }

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = { description: value }
    setSteps(newSteps)
  }

  const addStep = () => {
    setSteps(prev => [...prev, { description: '' }])
  }

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients(prev => [...prev, { name: '', amount: '', unit: '' }])
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    const date = new Date().toISOString().replace(/[:.-]/g, '')
    const convertedImg = await urlToFile(croppedImageUrl, `img_receta_${date}`)

    const formData = new FormData()
    formData.append('title', String(title).trim())
    formData.append('description', String(description).trim())
    formData.append('difficulty', String(difficulty))
    formData.append('duration', String(duration))
    formData.append('calories', String(calories))
    formData.append('steps', JSON.stringify(steps))
    formData.append('ingredients', JSON.stringify(ingredients))
    formData.append('image', convertedImg)

    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/crear/receta`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al enviar la receta')
      }

      const result = await response.json()
      setNewRecipeId(result.data)
      setIsOpen(true)
      console.log('Respuesta del servidor: ', result)
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <section className="bg-transparent w-full max-w-2xl mx-auto">
        <CardTitle className='text-2xl mb-3'>Sube tu receta</CardTitle>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <ImageCropModal croppedImageUrl={croppedImageUrl} setCroppedImageUrl={setCroppedImageUrl} />
            </div>
            <div>
              <Label htmlFor="title">Título receta</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={55}
                placeholder="Ingrese el título de la receta"
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                required
                minLength={35}
                maxLength={250}
                placeholder="Ingrese la descripción de la receta"
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Dificultad</Label>
              <Select
                name="difficulty"
                onValueChange={(value) => setDifficulty(Number(value))}
              >
                <SelectTrigger className={`text-muted-foreground ${errors.difficulty ? 'border-sunsetOrange-500' : ''}`}>
                  <SelectValue placeholder="Dificultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Fácil</SelectItem>
                  <SelectItem value="2">Media</SelectItem>
                  <SelectItem value="3">Difícil</SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && <p className="text-sunsetOrange-500 text-sm mt-1">{errors.difficulty}</p>}
            </div>
            <div>
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min={1}
                max={2000}
                value={duration}
                onChange={handleChange}
                required
                placeholder="Ingrese la duración de la receta"
              />
            </div>
            <div>
              <Label htmlFor="calories">Calorías</Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                min={1}
                max={99999}
                value={calories}
                onChange={handleChange}
                required
                placeholder="Ingrese las calorías de la receta"
              />
            </div>
            <div>
              <Label>Pasos</Label>
              {steps.map((step, index) => (
                <div key={index} className="block mt-2 border rounded-lg shadow-md p-2">
                  <div className='flex justify-between items-center mb-2'>
                    <p className='font-semibold text-sm'>
                      {'Paso ' + (index + 1)}
                    </p>
                    <Button
                      className='rounded-full h-6 w-6'
                      type="button"
                      variant="outlined_Destructive"
                      size="icon"
                      onClick={() => removeStep(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Input
                      value={step.description}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder={`Paso ${index + 1}`}
                      required
                    />

                  </div>

                </div>
              ))}
              <Button type="button" variant="outline" className="mt-2" onClick={addStep}>
                <Plus className="h-4 w-4 mr-2" /> Añadir paso
              </Button>
            </div>
            <div>
              <Label>Ingredientes</Label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className='block mt-2 border rounded-lg shadow-md p-2'
                >
                  <div className='flex justify-between mb-2 items-center'>
                    <p className='text-sm font-semibold'>
                      {'Ingrediente ' + (index + 1)}
                    </p>
                    <Button
                      className='rounded-full h-6 w-6'
                      type="button"
                      variant="outlined_Destructive"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row w-full gap-2 ">
                    <Input
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      placeholder="Nombre ingrediente"
                      required
                    />
                    <Input
                      type="number"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', parseFloat(e.target.value))}
                      placeholder="Cantidad"
                      min={1}
                      required
                    />
                    <Select
                      value={ingredient.unit}
                      onValueChange={(value) => handleIngredientChange(index, 'unit', value)}
                    >
                      <SelectTrigger
                        className={`text-muted-foreground ${errors.ingredients[index] ? 'border-sunsetOrange-500' : ''}`}
                      >
                        <SelectValue placeholder="Medida" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gramos">Gramos (g)</SelectItem>
                        <SelectItem value="Miligramos">Miligramos (mg)</SelectItem>
                        <SelectItem value="Kilogramos">Kilogramos (kg)</SelectItem>
                        <SelectItem value="Mililitros">Mililitros (ml)</SelectItem>
                        <SelectItem value="Litros">Litros (L)</SelectItem>
                        <SelectItem value="Tazas">Tazas</SelectItem>
                        <SelectItem value="Cucharadas">Cucharadas (cda)</SelectItem>
                        <SelectItem value="Cucharaditas">Cucharaditas (cdta)</SelectItem>
                        <SelectItem value="Pizca">Pizca</SelectItem>
                        <SelectItem value="Unidad">Unidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.ingredients[index] && (
                    <p className="text-sunsetOrange-500 text-sm mt-1">{errors.ingredients[index]}</p>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" className="mt-2" onClick={addIngredient}>
                <Plus className="h-4 w-4 mr-2" /> Añadir ingrediente
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  Subir receta
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                'Subir receta'
              )}
            </Button>
          </form>
        </div>
      </section>

      <RecipeDialog isOpen={isOpen} id={newRecipeId} />
    </>
  )
}

function RecipeDialog({ isOpen, id }: { isOpen: boolean, id: string }) {
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      router.push(`/receta/${id}`)
    }
  }, [countdown, isOpen, router, id])

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¡Receta Creada Exitosamente! 🎉</DialogTitle>
          <DialogDescription>
            <p className='text-center mt-1'>Tu receta ha sido creada.
            Serás redirigido en:</p>
            <div className='flex justify-center w-full mt-4 '>
              <div
                className='flex justify-center items-center rounded-full border border-muted-foreground/70 p-5 w-20 h-20 bg-forest-100'
              >
                <span className='text-xl text-forest-900 font-semibold '>
                  {countdown}
                </span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='w-full flex flex-col items-center  justify-between gap-3'>
            <p className='text-sm text-muted-foreground'>
              ¿Deseas ir a verla ahora mismo?
            </p>
            <Button
              className='w-full'
              onClick={() => router.push(`/receta/${id}`)}
            >
              Ver Receta
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}