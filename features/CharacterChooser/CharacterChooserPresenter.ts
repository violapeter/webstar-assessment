import { Character } from 'types'
import {
  CharacterChooserDomainModel,
  characterChooserRepository,
} from './CharacterChooserRepository'
import { AbstractPresenter } from 'cornerstone'

interface CharacterChooserViewModel {
  currentCharacter: Character | null
  loading: boolean
  charactersCount: number
  currentCharacterIndex: number
  currentCharacterImageUrl: string
}

export class CharacterChooserPresenter extends AbstractPresenter<
  CharacterChooserDomainModel,
  CharacterChooserViewModel
> {
  defaultViewModel = {
    currentCharacter: null,
    loading: true,
    charactersCount: 0,
    currentCharacterIndex: 0,
    currentCharacterImageUrl: '',
  }
  repository = characterChooserRepository

  reduceViewModel({
    characters,
    currentActive,
  }: CharacterChooserDomainModel): CharacterChooserViewModel {
    const currentCharacter = characters[currentActive]

    return {
      currentCharacter: characters[currentActive],
      currentCharacterIndex: currentActive,
      loading: characters.length === 0,
      charactersCount: characters.length,
      currentCharacterImageUrl: currentCharacter?.id
        ? `/images/characters/${currentCharacter?.id}.png`
        : '',
    }
  }

  init() {
    void this.loadCharacters()
  }

  async loadCharacters(): Promise<void> {
    await this.repository.loadCharacters()
  }

  jumpToCharacter(index: number) {
    this.repository.jumpToCharacter(index)
  }

  nextCharacter(): void {
    this.repository.nextCharacter()
  }
  previousCharacter(): void {
    this.repository.previousCharacter()
  }
}
