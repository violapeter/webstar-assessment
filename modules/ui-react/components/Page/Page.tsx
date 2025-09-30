'use client'
import React from 'react'
import { WSIcon } from 'ui-library'
import { PageBackground } from './PageBackground'
import { usePresenter } from 'cornerstone-react'
import { UserPresenter } from 'features'
import { BackgroundId } from 'web/hooks/useAvatar'
import s from './Page.module.scss'

interface PageProps {
  background: BackgroundId
  onLogout: () => void
}

export const Page = ({
  children,
  background = 'space_combat',
  onLogout,
}: React.PropsWithChildren<PageProps>) => {
  const [viewModel, presenter] = usePresenter(UserPresenter)

  async function handleLogout() {
    await presenter.logout()
    onLogout()
  }

  return (
    <PageBackground className={s.Page} background={background}>
      {viewModel.loggedIn && (
        <header className={s.Page__header}>
          <div className={s.Page__user}>
            <WSIcon name="user" />
            {viewModel.name}
          </div>
          <span className={s.Page__logout} onClick={handleLogout}>
            Űrhajó elhagyása
            <WSIcon name="logout" />
          </span>
        </header>
      )}
      <main className={s.Page__main}>{children}</main>
      <footer className={s.Page__footer}>
        Webstar csoport Kft. - &copy; Minden jog fenntartva
      </footer>
    </PageBackground>
  )
}
