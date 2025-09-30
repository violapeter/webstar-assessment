import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const credentials = await request.json()
  const cookieStore = await cookies()

  const user = {
    email: credentials.username,
    firstName: 'Pilóta',
    lastName: 'Felvételiző',
  }

  cookieStore.set({
    name: 'user',
    value: JSON.stringify(user),
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
  })

  return NextResponse.json({
    token: 'eyJhbGci..........4kZo',
    refreshToken: 'kaf5FAc2..........9Fjx',
    user,
  })
}
