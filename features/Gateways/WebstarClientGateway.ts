import { WebStarApiClient } from 'api-client'
import type { CharactersResponse, LoginResponse } from 'api-client'
import { User } from 'types'

type LoginCredentials = {
  username: string
  password: string
}

export class WebstarClientGateway {
  constructor(private apiClient: WebStarApiClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.apiClient.auth.login(credentials)
  }

  async logout(): Promise<void> {
    return this.apiClient.auth.logout()
  }

  async getUser(): Promise<User> {
    return this.apiClient.auth.getUser()
  }

  async getCharacters(): Promise<CharactersResponse> {
    return this.apiClient.characters.get()
  }
}

const webstarApiClient = new WebStarApiClient(
  process.env.NEXT_PUBLIC_API_ROOT_URL || '',
  process.env.NEXT_PUBLIC_APPLICANT_ID!,
)

export const webstarClientGateway = new WebstarClientGateway(webstarApiClient)
