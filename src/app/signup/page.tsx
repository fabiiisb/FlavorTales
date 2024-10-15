import Signup from "@/components/clientPages/Signup"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Registro de usuario',
  description: 'Únete para buscar y compartir recetas únicas, crear tus propias colecciones de platos y disfrutar de las mejores recetas.',
  keywords: 'recetas, guardar recetas, cocinar, compartir recetas, crear recetas, comunidad de cocina, mejores recetas',
  openGraph: {
    title: 'Registro de usuario',
    description: 'Regístrate para descubrir, crear y compartir recetas con una comunidad apasionada por la cocina.',
    url: 'https://flavortales.net/signup',
    siteName: 'FlavorTales',
    images: [
      {
        url: 'https://flavortales.net/signup/img/logo1.png',
        width: 400,
        height: 400,
        alt: 'Logo de FlavorTales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FlavorTales',
    title: 'Registro de Usuario',
    description: 'Únete para compartir tus mejores recetas y descubrir nuevos platos.',
    images: [
      {
        url: 'https://flavortales.net/signup/img/logo1.png',
        alt: 'Logo de FlavorTales'
      }
    ]
  }
}

const Page = () => {
  return <Signup />
}

export default Page
