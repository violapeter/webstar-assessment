import { AbstractPresenter } from 'cornerstone'
import {
  LoginFormDomainModel,
  loginFormRepository,
} from './LoginFormRepository'

export interface LoginFormViewModel {
  email: string
  password: string
  emailError: null | string
  passwordError: null | string
  loading: boolean
  error: null | string
}

export class LoginFormPresenter extends AbstractPresenter<
  LoginFormDomainModel,
  LoginFormViewModel
> {
  defaultViewModel = {
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
    error: null,
    loading: false,
  }
  repository = loginFormRepository

  reduceViewModel({
    email,
    password,
    loading,
    error,
  }: LoginFormDomainModel): LoginFormViewModel {
    return {
      email: email.value,
      password: password.value,
      emailError: email.error,
      passwordError: password.error,
      error,
      loading,
    }
  }

  onEmailBlur() {
    this.repository.validateEmail()
  }

  onPasswordBlur() {
    this.repository.validatePassword()
  }

  onEmailFocus() {
    this.repository.setEmailField('touched', true)
  }

  onPasswordFocus() {
    this.repository.setPasswordField('touched', true)
  }

  onEmailChange(value: string): void {
    this.repository.setEmailField('value', value)
    this.repository.validateEmail()
  }

  onPasswordChange(value: string): void {
    this.repository.setPasswordField('value', value)
    this.repository.validatePassword()
  }

  async onLogin(): Promise<boolean> {
    return this.repository.login()
  }
}
