import s from './CharacterModules.module.scss'
import { WSButton } from 'ui-library'
import Link from 'next/link'
import { Routes } from 'web/app/Routes'

export const CharacterModules = () => {
  return (
    <div>
      <h3 className={s.Title}>Modules</h3>
      <div className={s.Module}>
        <h4 className={s.Module__title}>CRUD kezelés</h4>
        <div>
          <p className={s.Module__description}>Karakterszerkesztő megnyitása</p>
          <Link className={s.Module__actions} href={Routes.characterEditor}>
            <WSButton variant="secondary">Karakterek szerkesztése</WSButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
