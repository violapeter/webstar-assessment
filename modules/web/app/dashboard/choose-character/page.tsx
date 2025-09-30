import React from 'react'
import { Page, CharacterChooser } from 'ui-react'
import { logout } from '@/app/actions'

export default function CharacterChooserPage() {
  return (
    <Page background="death_star_inside" onLogout={logout}>
      <CharacterChooser />
    </Page>
  )
}
