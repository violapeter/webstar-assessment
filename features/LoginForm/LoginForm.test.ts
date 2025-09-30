import { loginFormRepository } from './LoginFormRepository'
import { LoginFormPresenter, LoginFormViewModel } from './LoginFormPresenter'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'

jest.mock('../Gateways/WebstarClientGateway', () => ({
  webstarClientGateway: {
    login: jest.fn(),
  },
}))

describe('LoginForm functionality', () => {
  let viewModel: LoginFormViewModel
  let presenter: LoginFormPresenter

  beforeEach(() => {
    loginFormRepository.setValue({
      email: { value: '', touched: false, error: null, dirty: false },
      password: { value: '', touched: false, error: null, dirty: false },
      error: null,
      loading: false,
    })

    presenter = new LoginFormPresenter()
    presenter.load((data) => {
      viewModel = data
    })
  })

  it('should set the email correctly', () => {
    presenter.onEmailChange('jabba@crimelords.me')
    expect(viewModel.email).toBe('jabba@crimelords.me')
  })

  it('should correctly validate the email when we set it', () => {
    presenter.onEmailChange('jabba@crimelords')
    presenter.onEmailBlur()
    expect(viewModel.emailError).toBe(
      'Az email címet nem megfelelő formátumban adtad meg.',
    )
  })

  it("should correctly validate the email when it's not given", () => {
    presenter.onEmailChange('')
    presenter.onEmailBlur()
    expect(viewModel.emailError).toBe('Nem adtad meg az email címedet.')
  })

  it('should set error when password is not given', () => {
    presenter.onPasswordChange('')
    presenter.onPasswordBlur()
    expect(viewModel.passwordError).toBe('Nem adtad meg a jelszavadat.')
  })

  it('should send the login credentials when click the button and handle the loading state', async () => {
    webstarClientGateway.login = jest.fn().mockResolvedValue({})
    presenter.onEmailChange('benkenobi@jeditemple.org')
    presenter.onPasswordChange('n0ttheDroids')
    await presenter.onLogin()
    expect(webstarClientGateway.login).toHaveBeenCalledWith({
      username: 'benkenobi@jeditemple.org',
      password: 'n0ttheDroids',
    })
  })
})
