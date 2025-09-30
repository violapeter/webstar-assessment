'use client'
import React from 'react'
import { usePresenter } from 'cornerstone-react'
import { LoginFormPresenter } from 'features'
import { MouseEventHandler } from 'react'
import { WSButton, WSInput, WSFeedbackPanel } from 'ui-library'
import s from './LoginPage.module.scss'

interface LoginPageProps {
  onSuccessfulLogin: () => void
}

export const LoginPage = ({ onSuccessfulLogin }: LoginPageProps) => {
  const [viewModel, presenter] = usePresenter(LoginFormPresenter)

  const handleLogin: MouseEventHandler = async (event) => {
    event.preventDefault()
    if (await presenter.onLogin()) {
      onSuccessfulLogin()
    }
  }

  return (
    <div className={s.Wrapper}>
      <h1 className={s.Title}>
        <span className={s.Title__webstar}>Webstar</span>
        <span className={s.Title__frontend}>Frontend</span>
      </h1>

      <form className={s.Form}>
        {viewModel.error && (
          <WSFeedbackPanel>{viewModel.error}</WSFeedbackPanel>
        )}
        <fieldset className={s.Form__fieldset}>
          <label className={s.Form__label} htmlFor="username">
            Felhasználónév
          </label>
          <WSInput
            align="center"
            type="text"
            id="username"
            placeholder="mail@example.com"
            value={viewModel.email}
            onChange={(event) => presenter.onEmailChange(event.target.value)}
            onFocus={() => presenter.onEmailFocus()}
            onBlur={() => presenter.onEmailBlur()}
            invalid={!!viewModel.emailError}
            error={viewModel.emailError}
            variant="dark"
          />
        </fieldset>
        <fieldset className={s.Form__fieldset}>
          <label className={s.Form__label} htmlFor="password">
            Jelszó
          </label>
          <WSInput
            align="center"
            type="password"
            id="password"
            placeholder="Jelszó"
            value={viewModel.password}
            onChange={(event) => presenter.onPasswordChange(event.target.value)}
            onFocus={() => presenter.onPasswordFocus()}
            onBlur={() => presenter.onPasswordBlur()}
            invalid={!!viewModel.passwordError}
            error={viewModel.passwordError}
            variant="dark"
          />
        </fieldset>

        <WSButton onClick={handleLogin} disabled={viewModel.loading}>
          {viewModel.loading ? 'Egy pillanat...' : 'Belépés'}
        </WSButton>
      </form>
    </div>
  )
}
