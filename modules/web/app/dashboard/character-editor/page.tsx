import { Page } from 'ui-react'
import { logout } from '@/app/actions'
import { CharacterEditor, CharacterTable } from 'ui-react'

export default function CharacterEditorPage() {
  return (
    <Page background="death_star_inside" onLogout={logout}>
      <CharacterEditor>
        <CharacterTable />
      </CharacterEditor>
    </Page>
  )
}
