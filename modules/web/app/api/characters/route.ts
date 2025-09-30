import { NextResponse } from 'next/server'

import characters from './characters.json'

export async function GET() {
  return NextResponse.json(characters)
}
