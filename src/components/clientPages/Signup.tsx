'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [errorUsername, setErrorUsername] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorRepeatPassword, setErrorRepeatPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const verifyUsername = (): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/

    if (username.length < 3 || username.length > 25) {
      setErrorUsername('Username debe contener 3 o más caracteres y máximo 25 caracteres')
      return false
    }

    if (!usernameRegex.test(username)) {
      setErrorUsername('El username solo puede contener letras, números y guiones bajos')
      return false
    }

    return true
  }

  const verifyEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setErrorEmail('Debe ingresar un correo electrónico válido')
      return false
    }
    return true
  }

  const verifyPassword = (): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
  
    if (password.length < 8) {
      setErrorPassword('La contraseña debe tener al menos 8 caracteres')
      return false
    }
  
    if (!passwordRegex.test(password)) {
      setErrorPassword('La contraseña debe contener al menos una letra mayúscula, una minúscula y un número')
      return false
    }
  
    return true
  }
  

  const verifyRepeatPassword = (): boolean => {
    if (repeatPassword !== password) {
      setErrorRepeatPassword('Las contraseñas no coinciden')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrorUsername('')
    setErrorEmail('')
    setErrorPassword('')
    setErrorRepeatPassword('')

    const isValidUsername = verifyUsername()
    const isValidEmail = verifyEmail()
    const isValidPassword = verifyPassword()
    const isValidRepeatPassword = verifyRepeatPassword()

    if (isValidUsername && isValidEmail && isValidPassword && isValidRepeatPassword) {
      setLoading(true)

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        })

        if (!res.ok) {
          const response = await res.json()

          if (res.status === 409) {
            if (!response.usernameAvailable) {
              setErrorUsername('Username no disponible')
            }
            if (!response.emailAvailable) {
              setErrorEmail('Correo electrónico no disponible')
            }
          } else {
            console.error('Error del servidor:', response.message)
            alert('Hubo un problema. Intenta nuevamente más tarde.')
          }

          return
        }

        const response = await res.json()
        if (response.message === 'Success') {
          setIsRegistered(true)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
        alert('Error de red. Verifica tu conexión.')
      } finally {
        setLoading(false)
      }

    }
  }

  if (isRegistered === false) {
    return (
      <div className='m-6'>
        <form
          className='flex flex-col gap-4 max-w-72 mx-auto'
          onSubmit={handleSubmit}
        >
          <h2 className='text-center font-semibold text-3xl'>Registrarse</h2>

          <div className='space-y-1'>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder='Ingrese su nombre de usuario'
              value={username}
              onChange={e => setUsername(e.target.value)}
              aria-invalid={!!errorUsername}
              aria-describedby={errorUsername ? "username-error" : undefined}
              maxLength={25}
              minLength={3}
            />
            {errorUsername && (
              <p id="username-error" className="text-sm text-sunsetOrange-500">
                {errorUsername}
              </p>
            )}
          </div>

          <div className='space-y-1'>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder='Ingrese su correo electrónico'
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-invalid={!!errorEmail}
              aria-describedby={errorEmail ? "email-error" : undefined}
              maxLength={320}
            />
            {errorEmail && (
              <p id="email-error" className="text-sm text-sunsetOrange-500">
                {errorEmail}
              </p>
            )}
          </div>

          <div className='space-y-1'>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder='Ingrese su contraseña'
              value={password}
              onChange={e => setPassword(e.target.value)}
              aria-invalid={!!errorPassword}
              aria-describedby={errorPassword ? "password-error" : undefined}
              minLength={8}
            />
            {errorPassword && (
              <p id="password-error" className="text-sm text-sunsetOrange-500">
                {errorPassword}
              </p>
            )}
          </div>

          <div className='space-y-1'>
            <Label htmlFor="password2">Repita contraseña</Label>
            <Input
              id="password2"
              type="password"
              placeholder='Repita su contraseña'
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              aria-invalid={!!errorRepeatPassword}
              aria-describedby={errorRepeatPassword ? "password2-error" : undefined}
              minLength={8}
            />
            {errorRepeatPassword && (
              <p id="password2-error" className="text-sm text-sunsetOrange-500">
                {errorRepeatPassword}
              </p>
            )}
          </div>

          <Button>
            {loading ? (
              <>
                Registrarse
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              'Registrarse'
            )}
          </Button>
        </form>
      </div>
    )
  } else {
    return (
      <div className="max-w-72 flex flex-col gap-5 m-6 items-center mx-auto ">
        <CheckCircle className='w-16 h-16 text-forest-400' />
        <h2 className="text-3xl font-semibold">
          Registro Exitoso
        </h2>
        <div className='text-md text-center space-y-1'>
          <p className='text-lg text-gray-600'>
            Bienvenido a {process.env.NEXT_PUBLIC_PAGE_NAME} {username}
          </p>
          <p className='text-gray-700'>
            Tu cuenta ha sido creada exitosamente.
          </p>
          <p className='text-gray-700'>Ahora puedes acceder a todas las funciones de nuestra plataforma iniciando sesión.</p>
        </div>

        <div className="space-x-4">
          <Button variant="default">
            <Link href={'/login'}>
              Iniciar sesión
            </Link>
          </Button>
          <Button variant="outline">
            <Link href={'/'}>
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}

export default Signup
