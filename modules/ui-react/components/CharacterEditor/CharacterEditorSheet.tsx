import React from 'react'
import {
  WSButton,
  WSInput,
  WSSideSheet,
  WSTextarea,
  WSSelect,
} from 'ui-library'
import { AvatarSelector } from './AvatarSelector'
import s from './CharacterEditorSheet.module.scss'
import { usePresenter } from 'cornerstone-react'
import { Side } from 'types'
import { CharacterEditorPresenter } from 'features'

export const CharacterEditorSheet = ({}) => {
  const [viewModel, presenter] = usePresenter(CharacterEditorPresenter)

  return (
    <WSSideSheet
      open={viewModel.sideSheetOpen}
      onOpenChange={() => presenter.closeSideSheet()}
      header="Karakter szerkesztő"
      className={s.CharacterEditorSheet}
      footer={
        <div className={s.CharacterEditorSheet__actions}>
          <WSButton
            dark
            className={s.CharacterEditorSheet__action}
            variant="secondary"
            onClick={() => presenter.closeSideSheet()}
          >
            Mégsem
          </WSButton>
          <WSButton
            className={s.CharacterEditorSheet__action}
            onClick={() => presenter.closeSideSheet()}
          >
            Mentés
          </WSButton>
        </div>
      }
    >
      {viewModel.sideSheetOpen && (
        <>
          <AvatarSelector
            selected={viewModel.editedCharacter.id}
            onSelected={(id) => presenter.editCharacter('id', id)}
          />
          <div className={s.CharacterEditorSheet__fieldSet}>
            <WSInput
              id="name"
              value={viewModel.editedCharacter.name}
              onChange={(event) =>
                presenter.editCharacter('name', event.target.value)
              }
              label="Név"
              className={s.CharacterEditorSheet__firstColumn}
            />
            <WSSelect
              id="side"
              label="Oldal"
              className={s.CharacterEditorSheet__secondColumn}
              onChange={(event) =>
                presenter.editCharacter(
                  'side',
                  (event.target as HTMLSelectElement).value! as Side,
                )
              }
            >
              <WSSelect.Option
                selected={'LIGHT' === viewModel.editedCharacter.side}
              >
                Világos
              </WSSelect.Option>
              <WSSelect.Option
                selected={'DARK' === viewModel.editedCharacter.side}
              >
                Sötét
              </WSSelect.Option>
            </WSSelect>
          </div>
          <div className={s.CharacterEditorSheet__fieldSet}>
            <WSInput
              id="power"
              value={viewModel.editedCharacter.properties.power}
              label="Különleges erő"
              className={s.CharacterEditorSheet__firstColumn}
              onChange={(event) =>
                presenter.editCharacter('properties', {
                  power: event.target.value,
                  midichlorian:
                    viewModel.editedCharacter.properties.midichlorian,
                })
              }
            />
            <WSInput
              id="midichlorian"
              value={viewModel.editedCharacter.properties.midichlorian.toString()}
              onChange={(event) =>
                presenter.editCharacter('properties', {
                  power: viewModel.editedCharacter.properties.power,
                  midichlorian: parseInt(event.target.value),
                })
              }
              label="Midiklorián"
              className={s.CharacterEditorSheet__secondColumn}
            />
          </div>
          <div className={s.CharacterEditorSheet__fieldSet}>
            <WSTextarea
              id="description"
              value={viewModel.editedCharacter.description}
              label="Leírás"
              onChange={(event) =>
                presenter.editCharacter('description', event.target.value)
              }
            />
          </div>
          <div className={s.CharacterEditorSheet__time}>
            <span className={s.CharacterEditorSheet__label}>
              Karakter létrehozása óta eltelt idő
            </span>
            <span>{viewModel.editedCharacter.createdTimestamp}</span>
          </div>
        </>
      )}
    </WSSideSheet>
  )
}
