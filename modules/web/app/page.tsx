import { LoginPage, Page } from 'ui-react'
import { login, logout } from '@/app/actions'

export default function Login() {
  return (
    <Page background="space_combat" onLogout={logout}>
      <LoginPage onSuccessfulLogin={login} />
    </Page>
  )
}
