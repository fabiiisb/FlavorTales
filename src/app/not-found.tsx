import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChefHat, Home, Search,  } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-49px)] p-6">
      <ChefHat className="w-24 h-24 text-forest-500 mb-8" />
      <h1 className="text-4xl font-bold mb-4 text-center">¡Oops! Esta receta se ha quemado</h1>
      <p className="text-lg mb-8 text-center">Parece que la página que buscas no está en nuestro libro de recetas.</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button asChild className="bg-forest-500 hover:bg-forest-600 text-white">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Volver a la cocina
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-forest-500 text-forest-500 hover:bg-forest-100">
          <Link href="/buscar">
            <Search className="mr-2 h-4 w-4" /> Buscar recetas
          </Link>
        </Button>
      </div>
    </div>
  )
}