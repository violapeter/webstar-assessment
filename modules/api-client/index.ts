import {
  CharactersResponse,
  Endpoint,
  LoginCredentials,
  LoginResponse,
  SimulationRequest,
  SimulationResponse,
} from './types'
import { User } from 'types'

export type { CharactersResponse, LoginResponse }

export class WebStarApiClient {
  private bearerToken: string | null = null

  constructor(
    private apiRoot: string,
    private applicantId: string,
  ) {}

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Applicant-Id': this.applicantId,
        ...(this.bearerToken
          ? {
              'Application-Authorization': `Bearer ${this.bearerToken}`,
            }
          : {}),
        ...options?.headers,
      },
    })

    return (await response.json()) as T
  }

  private async post<T>(
    endpoint: Endpoint,
    params?: Record<string, any>,
  ): Promise<T> {
    return this.request<T>(`${this.apiRoot}${endpoint}/`, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  private async get<T>(
    endpoint: Endpoint,
    params?: Record<string, any>,
  ): Promise<T> {
    const searchParams = new URLSearchParams(params).toString()
    const url = `${this.apiRoot}${endpoint}/`
    return this.request<T>(searchParams ? `${url}?${searchParams}` : url)
  }

  public get auth() {
    return {
      login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await this.post<LoginResponse>(
          'authentication',
          credentials,
        )

        this.bearerToken = response.token
        return response
      },
      logout: async (): Promise<void> => {
        await this.post('authentication/logout')
      },
      getUser: async (): Promise<User> => {
        return this.get('authentication/get-user')
      },
    }
  }

  public get characters() {
    return {
      get: async (): Promise<CharactersResponse> => this.get('characters'),
    }
  }

  public get combat() {
    return {
      simulate: (characters: SimulationRequest): Promise<SimulationResponse> =>
        this.post('simulate', characters),
    }
  }
}
