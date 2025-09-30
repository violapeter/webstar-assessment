import { WebStarApiClient } from '../index'
import type {
  LoginCredentials,
  LoginResponse,
  CharactersResponse,
  SimulationResponse,
} from '../types'

global.fetch = jest.fn() as jest.Mock

describe('WebStarApiClient', () => {
  let client: WebStarApiClient
  const mockApiRoot = 'https://api.example.com/'
  const mockApplicantId = 'test-applicant-id'
  const mockBearerToken = 'test-bearer-token'

  beforeEach(() => {
    client = new WebStarApiClient(mockApiRoot, mockApplicantId)
    ;(fetch as jest.Mock).mockClear()
  })

  describe('constructor', () => {
    it('should create an instance with correct parameters', () => {
      expect(client).toBeInstanceOf(WebStarApiClient)
    })
  })

  describe('auth.login', () => {
    it('should make a login request with correct credentials', async () => {
      const mockCredentials: LoginCredentials = {
        username: 'test@example.com',
        password: 'password123',
      }

      const mockResponse: LoginResponse = {
        token: 'access-token',
        refreshToken: 'refresh-token',
        user: {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const result = await client.auth.login(mockCredentials)

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/authentication/',
        {
          method: 'POST',
          body: JSON.stringify(mockCredentials),
          headers: {
            'Content-Type': 'application/json',
            'Applicant-Id': mockApplicantId,
          },
        },
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle login errors', async () => {
      const mockCredentials: LoginCredentials = {
        username: 'invalid@example.com',
        password: 'wrongpassword',
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ error: 'Invalid credentials' }),
      })

      const result = await client.auth.login(mockCredentials)

      expect(result).toEqual({ error: 'Invalid credentials' })
    })
  })

  describe('characters.get', () => {
    it('should fetch characters successfully', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ token: mockBearerToken }),
      })
      await client.auth.login({
        username: 'test@example.com',
        password: 'password',
      })

      const mockCharacters: CharactersResponse = {
        characters: [
          {
            id: '1',
            name: 'Luke Skywalker',
            side: 'LIGHT',
            properties: {
              power: 'Force',
              midichlorian: 14500,
            },
            createdTimestamp: 1234567890,
            description: 'A Jedi Knight',
          },
          {
            id: '2',
            name: 'Darth Vader',
            side: 'DARK',
            properties: {
              power: 'Force',
              midichlorian: 27700,
            },
            createdTimestamp: 1234567891,
            description: 'Sith Lord',
          },
        ],
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockCharacters),
      })

      const result = await client.characters.get()

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/characters/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Applicant-Id': mockApplicantId,
            'Application-Authorization': `Bearer ${mockBearerToken}`,
          },
        },
      )
      expect(result).toEqual(mockCharacters)
    })

    it('should handle characters fetch errors', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ token: mockBearerToken }),
      })
      await client.auth.login({
        username: 'test@example.com',
        password: 'password',
      })
      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue({ error: 'Failed to fetch characters' }),
      })

      const result = await client.characters.get()

      expect(result).toEqual({ error: 'Failed to fetch characters' })
    })
  })

  describe('combat.simulate', () => {
    it('should start simulation successfully', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ token: mockBearerToken }),
      })
      await client.auth.login({
        username: 'test@example.com',
        password: 'password',
      })

      const mockSimulationResponse: SimulationResponse = {
        simulationId: 'sim-12345',
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockSimulationResponse),
      })

      const result = await client.combat.simulate({
        dark: 'vader',
        light: 'leia',
      })

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/simulate/',
        {
          method: 'POST',
          body: JSON.stringify({
            dark: 'vader',
            light: 'leia',
          }),
          headers: {
            'Content-Type': 'application/json',
            'Applicant-Id': mockApplicantId,
            'Application-Authorization': `Bearer ${mockBearerToken}`,
          },
        },
      )
      expect(result).toEqual(mockSimulationResponse)
    })

    it('should handle simulation errors', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ token: mockBearerToken }),
      })
      await client.auth.login({
        username: 'test@example.com',
        password: 'password',
      })
      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({ error: 'CharacterChooser failed' }),
      })

      const result = await client.combat.simulate({
        dark: 'vader',
        light: 'yoda',
      })

      expect(result).toEqual({ error: 'CharacterChooser failed' })
    })
  })

  describe('request method', () => {
    it('should include custom headers in requests', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ token: mockBearerToken }),
      })
      await client.auth.login({
        username: 'test@example.com',
        password: 'password',
      })

      const mockResponse = { success: true }
      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      await client.characters.get()

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Applicant-Id': mockApplicantId,
            'Application-Authorization': `Bearer ${mockBearerToken}`,
          }),
        }),
      )
    })

    it('should allow additional request options', async () => {
      const mockResponse = { success: true }
      ;(fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const privateRequest = (client as any).request.bind(client)

      await privateRequest('https://api.example.com/test', {
        method: 'POST',
        headers: {
          'Custom-Header': 'custom-value',
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Applicant-Id': mockApplicantId,
            'Custom-Header': 'custom-value',
          }),
        }),
      )
    })
  })
})
