import { characterChooserRepository } from './CharacterChooserRepository'
import { CharacterChooserPresenter } from './CharacterChooserPresenter'
import { webstarClientGateway } from '../Gateways/WebstarClientGateway'
import { Character } from 'types'

jest.mock('../Gateways/WebstarClientGateway', () => ({
  webstarClientGateway: {
    getCharacters: jest.fn(),
  },
}))

const mockCharacters: Character[] = [
  {
    id: 'luke',
    name: 'Luke Skywalker',
    side: 'LIGHT',
    properties: { power: 'Force', midichlorian: 14500 },
    createdTimestamp: 1234567890,
    description: 'A young Jedi Knight',
  },
  {
    id: 'vader',
    name: 'Darth Vader',
    side: 'DARK',
    properties: { power: 'Dark Force', midichlorian: 27700 },
    createdTimestamp: 1234567891,
    description: 'A Sith Lord',
  },
  {
    id: 'yoda',
    name: 'Master Yoda',
    side: 'LIGHT',
    properties: { power: 'Wisdom', midichlorian: 17700 },
    createdTimestamp: 1234567892,
    description: 'A wise Jedi Master',
  },
]

describe('CharacterChooserRepository', () => {
  beforeEach(() => {
    characterChooserRepository.setValue({
      characters: [],
      currentActive: 0,
    })
    jest.clearAllMocks()
  })

  describe('loadCharacters', () => {
    it('should load characters from gateway when not populated', async () => {
      ;(webstarClientGateway.getCharacters as jest.Mock).mockResolvedValue({
        characters: mockCharacters,
      })

      await characterChooserRepository.loadCharacters()

      expect(webstarClientGateway.getCharacters).toHaveBeenCalledTimes(1)
      expect(characterChooserRepository.value.characters).toEqual(
        mockCharacters,
      )
    })

    it('should not load characters again if already populated', async () => {
      characterChooserRepository.setValue({
        characters: mockCharacters,
        currentActive: 0,
      })

      await characterChooserRepository.loadCharacters()

      expect(webstarClientGateway.getCharacters).not.toHaveBeenCalled()
    })
  })

  describe('navigation methods', () => {
    beforeEach(() => {
      characterChooserRepository.setValue({
        characters: mockCharacters,
        currentActive: 0,
      })
    })

    describe('nextCharacter', () => {
      it('should move to next character', () => {
        characterChooserRepository.nextCharacter()
        expect(characterChooserRepository.value.currentActive).toBe(1)
      })

      it('should wrap to first character when at last', () => {
        characterChooserRepository.setValue({
          characters: mockCharacters,
          currentActive: 2,
        })

        characterChooserRepository.nextCharacter()
        expect(characterChooserRepository.value.currentActive).toBe(0)
      })
    })

    describe('previousCharacter', () => {
      it('should move to previous character', () => {
        characterChooserRepository.setValue({
          characters: mockCharacters,
          currentActive: 1,
        })

        characterChooserRepository.previousCharacter()
        expect(characterChooserRepository.value.currentActive).toBe(0)
      })

      it('should wrap to last character when at first', () => {
        characterChooserRepository.previousCharacter()
        expect(characterChooserRepository.value.currentActive).toBe(2)
      })
    })

    describe('jumpToCharacter', () => {
      it('should jump to specified character index', () => {
        characterChooserRepository.jumpToCharacter(2)
        expect(characterChooserRepository.value.currentActive).toBe(2)
      })
    })
  })

  describe('charactersPopulated getter', () => {
    it('should return false when no characters', () => {
      expect(characterChooserRepository.charactersPopulated).toBe(false)
    })

    it('should return true when characters exist', () => {
      characterChooserRepository.setValue({
        characters: mockCharacters,
        currentActive: 0,
      })
      expect(characterChooserRepository.charactersPopulated).toBe(true)
    })
  })
})

describe('CharacterChooserPresenter', () => {
  let presenter: CharacterChooserPresenter
  let viewModel: any

  beforeEach(() => {
    jest.clearAllMocks()
    characterChooserRepository.setValue({
      characters: [],
      currentActive: 0,
    })

    presenter = new CharacterChooserPresenter()
    presenter.load((data) => {
      viewModel = data
    })
  })

  describe('reduceViewModel', () => {
    it('should return default state when no characters', () => {
      characterChooserRepository.setValue({
        characters: [],
        currentActive: 0,
      })

      expect(viewModel.currentCharacter).toBeUndefined()
      expect(viewModel.loading).toBe(true)
      expect(viewModel.charactersCount).toBe(0)
      expect(viewModel.currentCharacterIndex).toBe(0)
      expect(viewModel.currentCharacterImageUrl).toBe('')
    })

    it('should return character data when characters exist', () => {
      characterChooserRepository.setValue({
        characters: mockCharacters,
        currentActive: 1,
      })

      expect(viewModel.currentCharacter).toEqual(mockCharacters[1])
      expect(viewModel.loading).toBe(false)
      expect(viewModel.charactersCount).toBe(3)
      expect(viewModel.currentCharacterIndex).toBe(1)
      expect(viewModel.currentCharacterImageUrl).toBe(
        '/images/characters/vader.png',
      )
    })
  })

  describe('presenter methods', () => {
    beforeEach(() => {
      characterChooserRepository.setValue({
        characters: mockCharacters,
        currentActive: 0,
      })
    })

    it('should call repository nextCharacter', () => {
      const spy = jest.spyOn(characterChooserRepository, 'nextCharacter')
      presenter.nextCharacter()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call repository previousCharacter', () => {
      const spy = jest.spyOn(characterChooserRepository, 'previousCharacter')
      presenter.previousCharacter()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call repository jumpToCharacter with correct index', () => {
      const spy = jest.spyOn(characterChooserRepository, 'jumpToCharacter')
      presenter.jumpToCharacter(2)
      expect(spy).toHaveBeenCalledWith(2)
    })

    it('should call repository loadCharacters', async () => {
      const spy = jest.spyOn(characterChooserRepository, 'loadCharacters')
      await presenter.loadCharacters()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('init', () => {
    it('should call loadCharacters', () => {
      const spy = jest.spyOn(presenter, 'loadCharacters')
      presenter.init()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
