import { NextResponse } from 'next/server'
import { getConn } from '@/utils/db/dbConn'
import { User } from '@/models/User'

export async function POST(request: Request) {
  await getConn()
  const data = await request.json()
  const { email, username } = data

  try {
    const checkUsername = await User.findOne(
      { username: username }
    ).select('username -_id')
    const checkEmail = await User.findOne(
      { email: email }
    ).select('email -_id')

    return NextResponse.json(
      {
        usernameAvailable: checkUsername === null,
        emailAvailable: checkEmail === null
      },
      { status: 200 }
    )

  } catch (err) {
    return NextResponse.json({
      message: 'Internal Server Error',
      error: true
    }, { status: 500 });
  }
}