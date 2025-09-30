import s from './CharacterDisplay.module.scss'
import classNames from 'classnames'
import { Character } from 'types'
import { WSIcon } from 'ui-library'
import { CharacterModules } from './CharacterModules'

interface CharacterDisplayProps {
  character: Character
}

export const CharacterDisplay = ({ character }: CharacterDisplayProps) => {
  const c = classNames(s)
  const isDark = character.side === 'DARK'
  const sideIcon = isDark ? 'PropertyIcon--sideDark' : 'PropertyIcon--sideLight'

  return (
    <div className={s.Character}>
      <div className={s.Properties}>
        <div className={s.Property}>
          <div className={c('Property__icon', sideIcon)}></div>
          <div>
            <div className={s.Property__label}>Oldal</div>
            <div className={s.Property__value}>
              {isDark ? 'Sötét' : 'Világos'}
            </div>
          </div>
        </div>

        <div className={s.Property}>
          <div className={c('Property__icon', 'PropertyIcon--power')}>
            <WSIcon name="star" size={34} />
          </div>
          <div>
            <div className={s.Property__label}>Különleges erő</div>
            <div className={s.Property__value}>
              {character.properties.power}
            </div>
          </div>
        </div>
      </div>
      <h1 className={s.Name}>{character.name}</h1>
      <span className={s.Description}>{character.description}</span>
      <CharacterModules />
    </div>
  )
}
