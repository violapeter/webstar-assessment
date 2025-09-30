import { Character } from 'types'
import { AbstractRepository } from 'cornerstone'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'

export interface CharacterEditorDomainModel {
  characters: Character[]
  editedCharacter: null | Character
  loading: boolean
}

const DEFAULT_DOMAIN_MODEL = {
  characters: [],
  editedCharacter: null,
  loading: true,
}

class CharacterEditorRepository extends AbstractRepository<CharacterEditorDomainModel> {
  defaultValue = DEFAULT_DOMAIN_MODEL
  gateway = webstarClientGateway

  get charactersPopulated(): boolean {
    return this.value.characters.length > 0
  }

  async loadCharacters(): Promise<void> {
    this.setFieldValue('loading', true)
    if (this.charactersPopulated) {
      return
    }

    const { characters } = await this.gateway.getCharacters()
    this.setValue({ characters, loading: false })
  }

  private copyCharacter({ id, name, ...rest }: Character): Character {
    return {
      id: `${id}-copy`,
      name: `${name} (Másolat)`,
      ...rest,
    }
  }

  duplicateCharacter(id: string): void {
    this.setFieldValue('characters', (prev) =>
      prev.reduce<Character[]>(
        (characters, current) =>
          current.id === id
            ? [...characters, current, this.copyCharacter(current)]
            : [...characters, current],
        [],
      ),
    )
  }

  removeCharacter(id: string): void {
    this.setFieldValue('characters', (prev) =>
      prev.filter((character) => character.id !== id),
    )
  }

  modifyCharacter(id: string) {
    this.setFieldValue(
      'editedCharacter',
      this.value.characters.find((character) => character.id === id)!,
    )
  }

  cancelEdit() {
    this.setFieldValue('editedCharacter', null)
  }

  newCharacter() {
    this.setFieldValue('editedCharacter', {
      id: '',
      name: '',
      description: '',
      side: 'LIGHT',
      properties: {
        power: '',
        midichlorian: 0,
      },
      createdTimestamp: 0,
    })
  }

  editCharacter<T extends keyof Character>(
    field: T,
    value: Character[T],
  ): void {
    this.setFieldValue('editedCharacter', (prev) => {
      return prev ? { ...prev, [field]: value } : null
    })
  }
}

const characterEditorRepository = new CharacterEditorRepository()

export { characterEditorRepository }
