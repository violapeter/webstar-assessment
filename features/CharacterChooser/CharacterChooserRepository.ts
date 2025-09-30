import { Character } from 'types'
import { AbstractRepository } from 'cornerstone'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'

export interface CharacterChooserDomainModel {
  characters: Character[]
  currentActive: number
}

const DEFAULT_DOMAIN_MODEL = {
  characters: [],
  currentActive: 0,
}

class CharacterChooserRepository extends AbstractRepository<CharacterChooserDomainModel> {
  defaultValue = DEFAULT_DOMAIN_MODEL
  gateway = webstarClientGateway

  get charactersPopulated(): boolean {
    return this.value.characters.length > 0
  }

  private get count(): number {
    return this.value.characters.length
  }

  private get lastIndex(): number {
    return this.count - 1
  }

  private get isLastActive(): boolean {
    return this.value.currentActive === this.lastIndex
  }

  private get current(): number {
    return this.value.currentActive
  }

  async loadCharacters(): Promise<void> {
    if (this.charactersPopulated) {
      return
    }

    const { characters } = await this.gateway.getCharacters()
    this.setFieldValue('characters', characters)
  }

  nextCharacter(): void {
    this.setFieldValue(
      'currentActive',
      this.isLastActive ? 0 : this.current + 1,
    )
  }
  previousCharacter(): void {
    this.setFieldValue(
      'currentActive',
      this.current === 0 ? this.lastIndex : this.current - 1,
    )
  }

  jumpToCharacter(index: number): void {
    this.setFieldValue('currentActive', index)
  }
}

const characterChooserRepository = new CharacterChooserRepository()

export { characterChooserRepository }
