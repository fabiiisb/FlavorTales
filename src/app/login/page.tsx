'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Loader2 } from "lucide-react"
import { AlertBad } from '@/components/subComponents/Alerts'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setEmailError('')
    setPasswordError('')
    setLoading(false)
    setError(false)

    const validEmail = checkEmail()
    const validPassword = checkPassword()

    if (validPassword && validEmail) {
      setLoading(true)
      setError(false)

      const responseNextAuth = await signIn('credentials',
        {
          email: email,
          password: password,
          redirect: false
        }
      )
 
      if (responseNextAuth?.error !== null) {
        if (responseNextAuth?.error === "Unauthorized") {
          return (
            setErrorMessage('Correo electrónico o contraseña no válidos'),
            setError(true),
            setLoading(false)
          )
        } else {
          return (
            setErrorMessage('Error del servidor'),
            setError(true),
            setLoading(false)
          )
        }
      }
      else {
        callbackUrl()
      }
    }
  }

  const checkEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

    if (email === "") {
      setEmailError('El correo electrónico no puede estar vacío')
      return false
    } else if (!emailRegex.test(email)) {
      setEmailError('Introduce una dirección de correo electrónico válida')
      return false
    }
    return true

  }

  const checkPassword = () => {
    if (password === "") {
      setPasswordError('La contraseña no puede estar vacía')
      return false
    }
    return true
  }

  const callbackUrl = async () => {
    const urlActual = window.location.href
    const parametros = new URLSearchParams(new URL(urlActual).search)
    const callbackUrl = parametros.get('callbackUrl')

    if (callbackUrl) {
      const urlCallback = '/' + new URL(callbackUrl).pathname.split('/').slice(1).join('/')

      router.refresh()
      router.push(urlCallback)
    } else {
      router.refresh()
      router.push('/')
    }
  }

  return (
    <div className='m-6 '>
      <form
        className='flex flex-col gap-4 max-w-72 mx-auto'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className='text-center font-semibold text-3xl'>Iniciar Sesión</h2>
        <div className='space-y-1'>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder='Ingresa tu correo electrónico'
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : undefined}
          />
          {emailError && (
            <p id="email-error" className="text-sm text-sunsetOrange-500">
              {emailError}
            </p>
          )}
        </div>

        <div className='space-y-1'>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError && (
            <p id="password-error" className="text-sm text-sunsetOrange-500">
              {passwordError}
            </p>
          )}
        </div>

        {error === true &&
          <AlertBad message={errorMessage || 'Contraseña o correo electrónico no válido'} />
        }

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              Iniciar Sesión
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </form>
    </div>
  )
}

export default Page
