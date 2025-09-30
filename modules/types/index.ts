export type Side = 'DARK' | 'LIGHT'

export type Character = {
  id: string
  name: string
  side: Side
  properties: {
    power: string
    midichlorian: number
  }
  createdTimestamp: number
  description: string
}

export type User = {
  email: string
  firstName: string
  lastName: string
}
