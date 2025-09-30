import { AbstractRepository } from 'cornerstone'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'

type InputState = {
  value: string
  touched: boolean
  error: string | null
  dirty: boolean
}

export interface LoginFormDomainModel {
  email: InputState
  password: InputState
  error: string | null
  loading: boolean
}

const DEFAULT_INPUT = {
  value: '',
  touched: false,
  error: null,
  dirty: false,
}

const DEFAULT_DOMAIN_MODEL = {
  email: DEFAULT_INPUT,
  password: DEFAULT_INPUT,
  error: null,
  loading: false,
}

export class LoginFormRepository extends AbstractRepository<LoginFormDomainModel> {
  defaultValue = DEFAULT_DOMAIN_MODEL
  gateway = webstarClientGateway

  isValidEmail(email: string): boolean {
    const EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[A-Za-z]{2,}$/
    return EMAIL_REGEX.test(email)
  }

  private setFieldOf<K extends keyof InputState>(
    field: 'email' | 'password',
    key: K,
    value: InputState[K],
  ): void {
    this.setFieldValue(field, (prev) => ({ ...prev, [key]: value }))
  }

  setEmailField<K extends keyof InputState>(
    key: K,
    value: InputState[K],
  ): void {
    this.setFieldOf('email', key, value)
  }

  setPasswordField<K extends keyof InputState>(
    key: K,
    value: InputState[K],
  ): void {
    this.setFieldOf('password', key, value)
  }

  validateEmail(): void {
    if (this.value.email.value === '') {
      this.setEmailField('error', 'Nem adtad meg az email címedet.')
      return
    }

    if (!this.isValidEmail(this.value.email.value)) {
      this.setEmailField(
        'error',
        'Az email címet nem megfelelő formátumban adtad meg.',
      )
      return
    }

    this.setEmailField('error', null)
  }

  validatePassword(): void {
    if (this.value.password.value === '') {
      this.setPasswordField('error', 'Nem adtad meg a jelszavadat.')
      return
    }

    this.setPasswordField('error', null)
  }

  get hasError(): boolean {
    const { email, password, error } = this.value
    return error !== null || email.error !== null || password.error !== null
  }

  async login(): Promise<boolean> {
    this.validateEmail()
    this.validatePassword()

    if (this.hasError) {
      return false
    }

    try {
      this.setFieldValue('loading', true)
      await this.gateway.login({
        username: this.value.email.value,
        password: this.value.password.value,
      })
      this.setValue(this.defaultValue)
      return true
    } catch (error) {
      this.setFieldValue('error', 'Hiba történt a bejelentkezés során.')
      return false
    } finally {
      this.setFieldValue('loading', false)
    }
  }
}

const loginFormRepository = new LoginFormRepository()

export { loginFormRepository }
