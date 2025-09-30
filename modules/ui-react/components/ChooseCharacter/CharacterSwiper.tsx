import { usePresenter } from 'cornerstone-react'
import { CharacterChooserPresenter } from 'features'
import { WSIcon } from 'ui-library'
import s from './CharacterSwiper.module.scss'

export const CharacterSwiper = () => {
  const [viewModel, presenter] = usePresenter(CharacterChooserPresenter)

  return (
    <div className={s.CharacterSwiper}>
      <div className={s.CharacterSwiper__pageControls}>
        <div className={s.CharacterSwiper__pageList}>
          {new Array(viewModel.charactersCount)
            .fill(undefined)
            .map((_, index) => (
              <button
                className={[
                  s.CharacterSwiper__page,
                  index === viewModel.currentCharacterIndex &&
                    s['CharacterSwiper__page--active'],
                ].join(' ')}
                key={`character-page-${index}`}
                onClick={() => presenter.jumpToCharacter(index)}
              />
            ))}
        </div>
        <div className={s.CharacterSwiper__pagers}>
          <button
            className={s.CharacterSwiper__prevButton}
            onClick={() => presenter.previousCharacter()}
          >
            <WSIcon size={40} name="chevron" />
          </button>
          <button
            className={s.CharacterSwiper__nextButton}
            onClick={() => presenter.nextCharacter()}
          >
            <WSIcon size={40} name="chevronRight" />
          </button>
        </div>
      </div>
      {viewModel.currentCharacterImageUrl && (
        <div className={s.CharacterSwiper__imageWrapper}>
          <img
            src={viewModel.currentCharacterImageUrl}
            alt={viewModel.currentCharacter?.name}
          />
        </div>
      )}
    </div>
  )
}
