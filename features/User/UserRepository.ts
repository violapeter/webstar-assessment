import { User } from 'types'
import { AbstractRepository } from 'cornerstone'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'

export interface UserDomainModel {
  user: User | null
  loading: boolean
}

class UserRepository extends AbstractRepository<UserDomainModel> {
  defaultValue = {
    user: null,
    loading: true,
  }

  gateway = webstarClientGateway

  async fetchUser(): Promise<void> {
    const user = await this.gateway.getUser()
    this.setValue({ user, loading: false })
  }

  async logout(): Promise<void> {
    this.setFieldValue('loading', true)
    await this.gateway.logout()
    this.setValue({ user: null, loading: false })
  }
}

const userRepository = new UserRepository()

export { userRepository }
