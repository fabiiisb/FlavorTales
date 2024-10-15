import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { User } from '@/models/User'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  await getConn()
  const data = await request.json()
  const { username, email, password } = data
  const normalizedEmail = email.toLowerCase()
  const salt = 12
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
  
  if (!username || !email || !password) {
    return NextResponse.json(
      {
        message: 'Todos los campos son obligatorios',
        error: true
      },
      { status: 400 } 
    )
  }

  if (!usernameRegex.test(username) || username.length < 3 || username.length > 25) {
    return NextResponse.json(
      {
        message: 'Username debe contener 3 o más caracteres y máximo 25 caracteres y solo puede contener letras, números y guiones bajos',
        error: true
      },
      { status: 400 } 
    )
  }

  if (!passwordRegex.test(password) || password.length < 8) {
    return NextResponse.json(
      {
        message: 'La contraseña debe contener mínimo 8 caracteres y al menos una letra mayúscula, una minúscula y un número',
        error: true
      },
      { status: 400 } 
    )
  }

  try {
    const availability = await checkAvailability(username, normalizedEmail)

    if (availability.usernameAvailable && availability.emailAvailable) {
      const hashedPassword = await bcrypt.hash(password, salt)

      const userData = await User.create(
        {
          username: username,
          email: normalizedEmail,
          password: hashedPassword
        }
      )

      if (!userData) throw new Error('Error al registrar usuario')
      
      return NextResponse.json(
        {
          message: 'Success',
          error: false
        },
        { status: 200 }
      )

    } else {
      return NextResponse.json(
        {
          message: 'Availability conflict',
          usernameAvailable: availability.usernameAvailable,
          emailAvailable: availability.emailAvailable,
          error: true
        },
        { status: 409 }
      )
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      {
        message: 'Error interno del servidor',
        error: true
      },
      { status: 500 }
    )
  }
}

const checkAvailability = async (username: string, email: string) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/check-availability`, options)
    const data = await response.json()

    return {
      usernameAvailable: data.usernameAvailable,
      emailAvailable: data.emailAvailable,
    }
  } catch (err) {
    console.error('Error en la solicitud de verificación:', err)
    throw new Error('Error en la verificación de disponibilidad')
  }
}
