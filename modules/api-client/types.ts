import type { Character, User } from 'types'

export type LoginCredentials = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  refreshToken: string
  user: User
}

export type CharactersResponse = { characters: Character[] }

export type SimulationRequest = {
  dark: string
  light: string
}

export type SimulationResponse = {
  simulationId: string
}

export type Endpoint =
  | 'authentication'
  | 'authentication/logout'
  | 'authentication/get-user'
  | 'simulate'
  | 'characters'
