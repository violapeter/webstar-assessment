import { AbstractPresenter } from 'cornerstone'
import { UserDomainModel, userRepository } from './UserRepository'

interface UserViewModel {
  name: string
  loading: boolean
  loggedIn: boolean
}

const DEFAULT_VIEW_MODEL: UserViewModel = {
  name: '',
  loading: true,
  loggedIn: false,
}

export class UserPresenter extends AbstractPresenter<
  UserDomainModel,
  UserViewModel
> {
  defaultViewModel = DEFAULT_VIEW_MODEL

  repository = userRepository

  reduceViewModel({ user, loading }: UserDomainModel): UserViewModel {
    return {
      loggedIn: !!user,
      name: `${user?.lastName} ${user?.firstName}`,
      loading,
    }
  }

  async fetchUser(): Promise<void> {
    await this.repository.fetchUser()
  }

  async logout(): Promise<void> {
    await this.repository.logout()
  }

  init() {
    void this.fetchUser()
  }
}
