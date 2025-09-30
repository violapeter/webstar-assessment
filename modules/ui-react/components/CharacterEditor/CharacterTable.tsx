'use client'
import React from 'react'
import { usePresenter } from 'cornerstone-react'
import { WSTable } from 'ui-library'
import { CharacterEditorPresenter } from 'features'
import { CharacterEditorSheet } from './CharacterEditorSheet'
import classNames from 'classnames'
import s from './CharacterTable.module.scss'

const c = classNames(s)

export const CharacterTable = () => {
  const [viewModel, presenter] = usePresenter(CharacterEditorPresenter)

  return (
    <>
      <WSTable className={s.CharacterTable}>
        <WSTable.Head>
          <WSTable.Row>
            <WSTable.Header>Név</WSTable.Header>
            <WSTable.Header>Oldal</WSTable.Header>
            <WSTable.Header>Különleges erő</WSTable.Header>
            <WSTable.Header>Midiklorián</WSTable.Header>
            <WSTable.Header>&nbsp;</WSTable.Header>
          </WSTable.Row>
        </WSTable.Head>
        <WSTable.Body>
          {viewModel.characters.map(
            ({ id, name, side, power, midichlorian }) => (
              <WSTable.Row key={id} className={s.CharacterTable__row}>
                <WSTable.Cell>{name}</WSTable.Cell>
                <WSTable.Cell>{side}</WSTable.Cell>
                <WSTable.Cell>{power}</WSTable.Cell>
                <WSTable.Cell>{midichlorian}</WSTable.Cell>
                <WSTable.Cell>
                  <div className={s.CharacterTable__actions}>
                    <button
                      className={c('CharacterTable__action')}
                      onClick={() => presenter.copyCharacter(id)}
                    >
                      Másolás
                    </button>
                    <button
                      onClick={() => presenter.modifyCharacter(id)}
                      className={c(
                        'CharacterTable__action',
                        'CharacterTable__action--modify',
                      )}
                    >
                      Módosítás
                    </button>
                    <button
                      onClick={() => presenter.removeCharacter(id)}
                      className={c(
                        'CharacterTable__action',
                        'CharacterTable__action--remove',
                      )}
                    >
                      Törlés
                    </button>
                  </div>
                </WSTable.Cell>
              </WSTable.Row>
            ),
          )}
        </WSTable.Body>
      </WSTable>
      <CharacterEditorSheet />
    </>
  )
}
