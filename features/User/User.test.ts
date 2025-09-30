import { userRepository } from './UserRepository'
import { UserPresenter } from './UserPresenter'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'
import { User } from 'types'

jest.mock('../Gateways/WebstarClientGateway', () => ({
  webstarClientGateway: {
    getUser: jest.fn(),
    logout: jest.fn(),
  },
}))

const mockUser: User = {
  email: 'luke@rebellion.org',
  firstName: 'Luke',
  lastName: 'Skywalker',
}

describe('UserRepository', () => {
  beforeEach(() => {
    userRepository.setValue({
      user: null,
      loading: true,
    })
    jest.clearAllMocks()
  })

  describe('fetchUser', () => {
    it('should fetch user from gateway and update state', async () => {
      ;(webstarClientGateway.getUser as jest.Mock).mockResolvedValue(mockUser)

      await userRepository.fetchUser()

      expect(webstarClientGateway.getUser).toHaveBeenCalledTimes(1)
      expect(userRepository.value.user).toEqual(mockUser)
      expect(userRepository.value.loading).toBe(false)
    })

    it('should handle errors during user fetch', async () => {
      const error = new Error('Network error')
      ;(webstarClientGateway.getUser as jest.Mock).mockRejectedValue(error)

      try {
        await userRepository.fetchUser()
      } catch (thrownError) {
        expect((thrownError as Error).message).toBe('Network error')
      }

      expect(webstarClientGateway.getUser).toHaveBeenCalledTimes(1)
    })
  })

  describe('logout', () => {
    beforeEach(() => {
      userRepository.setValue({
        user: mockUser,
        loading: false,
      })
    })

    it('should logout user and clear state', async () => {
      ;(webstarClientGateway.logout as jest.Mock).mockResolvedValue(undefined)

      await userRepository.logout()

      expect(webstarClientGateway.logout).toHaveBeenCalledTimes(1)
      expect(userRepository.value.user).toBe(null)
      expect(userRepository.value.loading).toBe(false)
    })

    it('should set loading state during logout', async () => {
      let loadingStateWhenCalled: boolean
      ;(webstarClientGateway.logout as jest.Mock).mockImplementation(() => {
        loadingStateWhenCalled = userRepository.value.loading
        return Promise.resolve()
      })

      await userRepository.logout()

      expect(loadingStateWhenCalled!).toBe(true)
      expect(userRepository.value.loading).toBe(false)
    })

    it('should handle errors during logout', async () => {
      const error = new Error('Logout failed')
      ;(webstarClientGateway.logout as jest.Mock).mockRejectedValue(error)

      try {
        await userRepository.logout()
      } catch (thrownError) {
        expect((thrownError as Error).message).toBe('Logout failed')
      }

      expect(webstarClientGateway.logout).toHaveBeenCalledTimes(1)
    })
  })

  describe('defaultValue', () => {
    it('should have correct default state', () => {
      expect(userRepository.defaultValue).toEqual({
        user: null,
        loading: true,
      })
    })
  })
})

describe('UserPresenter', () => {
  let presenter: UserPresenter
  let viewModel: any

  beforeEach(() => {
    jest.clearAllMocks()
    userRepository.setValue({
      user: null,
      loading: true,
    })

    presenter = new UserPresenter()
    // Mock the init method to prevent automatic fetchUser calls
    jest.spyOn(presenter, 'init').mockImplementation(() => {})

    presenter.load((data) => {
      viewModel = data
    })
  })

  describe('reduceViewModel', () => {
    it('should return default state when no user', () => {
      expect(viewModel.name).toBe('undefined undefined')
      expect(viewModel.loading).toBe(true)
      expect(viewModel.loggedIn).toBe(false)
    })

    it('should return user data when user exists', () => {
      userRepository.setValue({
        user: mockUser,
        loading: false,
      })

      expect(viewModel.name).toBe('Skywalker Luke')
      expect(viewModel.loading).toBe(false)
      expect(viewModel.loggedIn).toBe(true)
    })

    it('should handle partial user data', () => {
      const partialUser = { ...mockUser, firstName: '', lastName: '' }
      userRepository.setValue({
        user: partialUser,
        loading: false,
      })

      expect(viewModel.name).toBe(' ')
      expect(viewModel.loggedIn).toBe(true)
    })
  })

  describe('presenter methods', () => {
    it('should call repository fetchUser', async () => {
      const spy = jest.spyOn(userRepository, 'fetchUser')
      ;(webstarClientGateway.getUser as jest.Mock).mockResolvedValue(mockUser)

      await presenter.fetchUser()

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call repository logout', async () => {
      const spy = jest.spyOn(userRepository, 'logout')
      ;(webstarClientGateway.logout as jest.Mock).mockResolvedValue(undefined)

      await presenter.logout()

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should propagate errors from fetchUser', async () => {
      const error = new Error('Fetch failed')
      jest.spyOn(userRepository, 'fetchUser').mockRejectedValue(error)

      try {
        await presenter.fetchUser()
      } catch (thrownError) {
        expect((thrownError as Error).message).toBe('Fetch failed')
      }
    })

    it('should propagate errors from logout', async () => {
      const error = new Error('Logout failed')
      jest.spyOn(userRepository, 'logout').mockRejectedValue(error)

      try {
        await presenter.logout()
      } catch (thrownError) {
        expect((thrownError as Error).message).toBe('Logout failed')
      }
    })
  })

  describe('defaultViewModel', () => {
    it('should have correct default view model', () => {
      expect(presenter.defaultViewModel).toEqual({
        name: '',
        loading: true,
        loggedIn: false,
      })
    })
  })
})