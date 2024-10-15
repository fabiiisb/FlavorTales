import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { User } from '@/models/User'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  await getConn()
  const data = await request.json()
  const { email, password } = data
  const normalizedEmail = email.toLowerCase()

  try {
    const userData = await User.findOne({ email: normalizedEmail })

    if (!userData) return unauthorizedResponse()

    const hashedPassword = userData.password
    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (!isMatch) return unauthorizedResponse()

    const sessionData = {
      id: userData._id,
      username: userData.username,
      email: userData.email,
      image: userData.image
    }

    return NextResponse.json({
      message: 'Success',
      error: false,
      userData: sessionData
    }, { status: 200 })

  } catch (err) {
    return NextResponse.json({
      message: 'Internal Server Error',
      error: true
    }, { status: 500 })
  }
}

const unauthorizedResponse = () => {
  return NextResponse.json(
    {
      message: 'Unauthorized',
      error: true
    },
    { status: 401 }
  )
}