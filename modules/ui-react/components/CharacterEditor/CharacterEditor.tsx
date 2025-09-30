'use client'
import React from 'react'
import s from './CharacterEditor.module.scss'
import { WSButton, WSIconButton } from 'ui-library'
import Link from 'next/link'
import { Routes } from 'web/app/Routes'
import { usePresenter } from 'cornerstone-react'
import { CharacterEditorPresenter } from 'features'

export const CharacterEditor = ({ children }: React.PropsWithChildren) => {
  const [_, presenter] = usePresenter(CharacterEditorPresenter)

  return (
    <div className={s.CharacterEditor}>
      <header className={s.CharacterEditor__header}>
        <Link href={Routes.chooseCharacter}>
          <WSIconButton
            iconSize={40}
            icon="chevron"
            ariaLabel="Vissza a karakter választóhoz"
            className={s.CharacterEditor__backButton}
          />
        </Link>
        <h1 className={s.CharacterEditor__title}>Karakterek szerkesztése</h1>
        <WSButton
          variant="secondary"
          className={s.CharacterEditor__newCharacter}
          onClick={() => presenter.newCharacter()}
        >
          Új Karakter hozzáadása
        </WSButton>
      </header>
      <div className={s.CharacterEditor__content}>{children}</div>
    </div>
  )
}
