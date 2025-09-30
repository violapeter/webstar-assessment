'use client'
import React from 'react'
import { usePresenter } from 'cornerstone-react'
import { CharacterChooserPresenter } from 'features'
import { CharacterDisplay } from './CharacterDisplay'
import { CharacterSwiper } from './CharacterSwiper'
import s from './CharacterChooser.module.scss'

export const CharacterChooser = () => {
  const [viewModel] = usePresenter(CharacterChooserPresenter)

  return (
    <div className={s.CharacterChooser}>
      {viewModel.loading ? (
        <div className={s.Loading}>Egy pillanat...</div>
      ) : (
        <>
          <CharacterDisplay character={viewModel.currentCharacter} />
          <CharacterSwiper />
        </>
      )}
    </div>
  )
}
