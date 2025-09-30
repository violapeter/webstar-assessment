import {
  CharacterEditorDomainModel,
  characterEditorRepository,
} from './CharacterEditorRepository'
import { AbstractPresenter } from 'cornerstone'
import { Character } from 'types'

export type CharacterDisplay = {
  id: string
  name: string
  side: string
  power: string
  midichlorian: number
}

export type CharacterEditDisplay = Omit<Character, 'createdTimestamp'> & {
  createdTimestamp: string
}

interface CharacterEditorViewModel {
  characters: CharacterDisplay[]
  editedCharacter: null | CharacterEditDisplay
  loading: boolean
  sideSheetOpen: boolean
}

export class CharacterEditorPresenter extends AbstractPresenter<
  CharacterEditorDomainModel,
  CharacterEditorViewModel
> {
  defaultViewModel = {
    characters: [],
    editedCharacter: null,
    loading: true,
    sideSheetOpen: false,
  }
  repository = characterEditorRepository

  private mapCharacter({
    id,
    name,
    side,
    properties: { power, midichlorian },
  }: Character): CharacterDisplay {
    return {
      id,
      name,
      side: side === 'DARK' ? 'Sötét' : 'Világos',
      power,
      midichlorian,
    }
  }

  reduceViewModel({
    characters,
    loading,
    editedCharacter,
  }: CharacterEditorDomainModel): CharacterEditorViewModel {
    return {
      characters: characters.map(this.mapCharacter),
      editedCharacter: editedCharacter
        ? {
            ...editedCharacter,
            createdTimestamp: this.elapsedTime(
              editedCharacter.createdTimestamp,
            ),
          }
        : null,
      sideSheetOpen: editedCharacter !== null,
      loading,
    }
  }

  private elapsedTime(timeStamp: number) {
    const diff = Date.now() - timeStamp

    const sec = Math.floor(diff / 1000)
    const years = Math.floor(sec / (365 * 24 * 3600))
    const hours = Math.floor((sec % (24 * 3600)) / 3600)
    const minutes = Math.floor((sec % 3600) / 60)
    const seconds = sec % 60

    const parts: string[] = []
    if (years) parts.push(`${years} év`)
    if (hours) parts.push(`${hours} óra`)
    if (minutes) parts.push(`${minutes} perc`)
    if (seconds) parts.push(`${seconds} másodperc`)

    if (parts.length === 0) return '0 másodperc'
    if (parts.length === 1) return parts[0]
    return parts.slice(0, -1).join(', ') + ' és ' + parts[parts.length - 1]
  }

  init() {
    void this.loadCharacters()
  }

  async loadCharacters(): Promise<void> {
    await this.repository.loadCharacters()
  }

  copyCharacter(id: string): void {
    this.repository.duplicateCharacter(id)
  }

  modifyCharacter(id: string): void {
    this.repository.modifyCharacter(id)
  }

  removeCharacter(id: string): void {
    this.repository.removeCharacter(id)
  }

  closeSideSheet() {
    this.repository.cancelEdit()
  }

  newCharacter() {
    this.repository.newCharacter()
  }

  editCharacter<T extends keyof Character>(
    field: T,
    value: Character[T],
  ): void {
    this.repository.editCharacter(field, value)
  }
}
