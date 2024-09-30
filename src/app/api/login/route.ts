import { NextResponse } from 'next/server'
// import { getConn } from '@/utils/db/dbConn'


export async function POST(request: Request) {
  // await getConn()
  const data = await request.json()

  const email = "fabiiisb@hotmail.com"
  const password = "123"

  if (data.email == email && data.password === password) {
    const userData = {
      id: "123",
      username: "fabiiisbtest",
      email: "fabiiisbtest@test",
      image: "asdtest.com/test"
    }

    return NextResponse.json(
      {
        message: 'Success',
        error: false,
        userData : userData
      },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      {
        message: 'Unauthorized',
        error: true
      },
      { status: 401 }
    )
  }


}