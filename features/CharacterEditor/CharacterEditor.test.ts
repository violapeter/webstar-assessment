import { characterEditorRepository } from './CharacterEditorRepository'
import { CharacterEditorPresenter } from './CharacterEditorPresenter'
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
    createdTimestamp: 1234567890000,
    description: 'A young Jedi Knight',
  },
  {
    id: 'vader',
    name: 'Darth Vader',
    side: 'DARK',
    properties: { power: 'Dark Force', midichlorian: 27700 },
    createdTimestamp: 1234567891000,
    description: 'A Sith Lord',
  },
  {
    id: 'yoda',
    name: 'Master Yoda',
    side: 'LIGHT',
    properties: { power: 'Wisdom', midichlorian: 17700 },
    createdTimestamp: 1234567892000,
    description: 'A wise Jedi Master',
  },
]

describe('CharacterEditorRepository', () => {
  beforeEach(() => {
    characterEditorRepository.setValue({
      characters: [],
      editedCharacter: null,
      loading: true,
    })
    jest.clearAllMocks()
  })

  describe('loadCharacters', () => {
    it('should load characters from gateway when not populated', async () => {
      ;(webstarClientGateway.getCharacters as jest.Mock).mockResolvedValue({
        characters: mockCharacters,
      })

      await characterEditorRepository.loadCharacters()

      expect(webstarClientGateway.getCharacters).toHaveBeenCalledTimes(1)
      expect(characterEditorRepository.value.characters).toEqual(mockCharacters)
      expect(characterEditorRepository.value.loading).toBe(false)
    })

    it('should not load characters again if already populated', async () => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })

      await characterEditorRepository.loadCharacters()

      expect(webstarClientGateway.getCharacters).not.toHaveBeenCalled()
    })

    it('should set loading to true when starting to load', async () => {
      ;(webstarClientGateway.getCharacters as jest.Mock).mockResolvedValue({
        characters: mockCharacters,
      })

      characterEditorRepository.setValue({
        characters: [],
        editedCharacter: null,
        loading: false,
      })

      const loadPromise = characterEditorRepository.loadCharacters()
      expect(characterEditorRepository.value.loading).toBe(true)

      await loadPromise
    })
  })

  describe('duplicateCharacter', () => {
    beforeEach(() => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })
    })

    it('should duplicate a character with correct modifications', () => {
      characterEditorRepository.duplicateCharacter('luke')

      const characters = characterEditorRepository.value.characters
      expect(characters).toHaveLength(4)

      const lukeIndex = characters.findIndex(c => c.id === 'luke')
      const duplicatedLuke = characters[lukeIndex + 1]

      expect(duplicatedLuke.id).toBe('luke-copy')
      expect(duplicatedLuke.name).toBe('Luke Skywalker (Másolat)')
      expect(duplicatedLuke.side).toBe('LIGHT')
      expect(duplicatedLuke.properties).toEqual({ power: 'Force', midichlorian: 14500 })
      expect(duplicatedLuke.description).toBe('A young Jedi Knight')
    })

    it('should maintain character order when duplicating', () => {
      characterEditorRepository.duplicateCharacter('vader')

      const characters = characterEditorRepository.value.characters
      expect(characters[0].id).toBe('luke')
      expect(characters[1].id).toBe('vader')
      expect(characters[2].id).toBe('vader-copy')
      expect(characters[3].id).toBe('yoda')
    })

    it('should handle non-existent character gracefully', () => {
      const originalCharacters = [...characterEditorRepository.value.characters]

      characterEditorRepository.duplicateCharacter('non-existent')

      expect(characterEditorRepository.value.characters).toEqual(originalCharacters)
    })
  })

  describe('removeCharacter', () => {
    beforeEach(() => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })
    })

    it('should remove character by id', () => {
      characterEditorRepository.removeCharacter('vader')

      const characters = characterEditorRepository.value.characters
      expect(characters).toHaveLength(2)
      expect(characters.find(c => c.id === 'vader')).toBeUndefined()
      expect(characters.find(c => c.id === 'luke')).toBeDefined()
      expect(characters.find(c => c.id === 'yoda')).toBeDefined()
    })

    it('should handle removing non-existent character', () => {
      const originalLength = characterEditorRepository.value.characters.length

      characterEditorRepository.removeCharacter('non-existent')

      expect(characterEditorRepository.value.characters).toHaveLength(originalLength)
    })
  })

  describe('modifyCharacter', () => {
    beforeEach(() => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })
    })

    it('should set editedCharacter to the character with given id', () => {
      characterEditorRepository.modifyCharacter('yoda')

      expect(characterEditorRepository.value.editedCharacter).toEqual(mockCharacters[2])
    })

    it('should find and set the correct character', () => {
      characterEditorRepository.modifyCharacter('vader')

      expect(characterEditorRepository.value.editedCharacter?.id).toBe('vader')
      expect(characterEditorRepository.value.editedCharacter?.name).toBe('Darth Vader')
    })
  })

  describe('cancelEdit', () => {
    it('should clear editedCharacter', () => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: mockCharacters[0],
        loading: false,
      })

      characterEditorRepository.cancelEdit()

      expect(characterEditorRepository.value.editedCharacter).toBe(null)
    })
  })

  describe('newCharacter', () => {
    it('should set editedCharacter to a new empty character', () => {
      characterEditorRepository.newCharacter()

      const editedCharacter = characterEditorRepository.value.editedCharacter
      expect(editedCharacter).toEqual({
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
    })
  })

  describe('charactersPopulated getter', () => {
    it('should return false when no characters', () => {
      expect(characterEditorRepository.charactersPopulated).toBe(false)
    })

    it('should return true when characters exist', () => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })

      expect(characterEditorRepository.charactersPopulated).toBe(true)
    })
  })
})

describe('CharacterEditorPresenter', () => {
  let presenter: CharacterEditorPresenter
  let viewModel: any

  beforeEach(() => {
    jest.clearAllMocks()
    characterEditorRepository.setValue({
      characters: [],
      editedCharacter: null,
      loading: true,
    })

    presenter = new CharacterEditorPresenter()
    presenter.load((data) => {
      viewModel = data
    })
  })

  describe('reduceViewModel', () => {
    it('should return default state when no characters', () => {
      characterEditorRepository.setValue({
        characters: [],
        editedCharacter: null,
        loading: true,
      })

      expect(viewModel.characters).toEqual([])
      expect(viewModel.editedCharacter).toBe(null)
      expect(viewModel.loading).toBe(true)
      expect(viewModel.sideSheetOpen).toBe(false)
    })

    it('should map characters correctly', () => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })

      expect(viewModel.characters).toHaveLength(3)
      expect(viewModel.characters[0]).toEqual({
        id: 'luke',
        name: 'Luke Skywalker',
        side: 'Világos',
        power: 'Force',
        midichlorian: 14500,
      })
      expect(viewModel.characters[1]).toEqual({
        id: 'vader',
        name: 'Darth Vader',
        side: 'Sötét',
        power: 'Dark Force',
        midichlorian: 27700,
      })
    })

    it('should set sideSheetOpen to true when editing a character', () => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: mockCharacters[0],
        loading: false,
      })

      expect(viewModel.sideSheetOpen).toBe(true)
    })

    it('should format elapsed time correctly for edited character', () => {
      const mockNow = 1234567890000 + 365 * 24 * 3600 * 1000 + 2 * 3600 * 1000 + 30 * 60 * 1000 + 45 * 1000
      jest.spyOn(Date, 'now').mockReturnValue(mockNow)

      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: mockCharacters[0],
        loading: false,
      })

      expect(viewModel.editedCharacter.createdTimestamp).toBe('1 év, 2 óra, 30 perc és 45 másodperc')

      jest.restoreAllMocks()
    })
  })

  describe('elapsedTime method', () => {
    let originalDateNow: typeof Date.now

    beforeEach(() => {
      originalDateNow = Date.now
    })

    afterEach(() => {
      Date.now = originalDateNow
    })

    it('should format time with years, hours, minutes and seconds', () => {
      const now = 1234567890000 + 365 * 24 * 3600 * 1000 + 2 * 3600 * 1000 + 30 * 60 * 1000 + 45 * 1000
      Date.now = jest.fn(() => now)

      const result = (presenter as any).elapsedTime(1234567890000)
      expect(result).toBe('1 év, 2 óra, 30 perc és 45 másodperc')
    })

    it('should handle only seconds', () => {
      const now = 1234567890000 + 30 * 1000
      Date.now = jest.fn(() => now)

      const result = (presenter as any).elapsedTime(1234567890000)
      expect(result).toBe('30 másodperc')
    })

    it('should handle zero time difference', () => {
      const now = 1234567890000
      Date.now = jest.fn(() => now)

      const result = (presenter as any).elapsedTime(1234567890000)
      expect(result).toBe('0 másodperc')
    })

    it('should handle only one unit', () => {
      const now = 1234567890000 + 5 * 60 * 1000
      Date.now = jest.fn(() => now)

      const result = (presenter as any).elapsedTime(1234567890000)
      expect(result).toBe('5 perc')
    })
  })

  describe('presenter methods', () => {
    beforeEach(() => {
      characterEditorRepository.setValue({
        characters: mockCharacters,
        editedCharacter: null,
        loading: false,
      })
    })

    it('should call repository loadCharacters', async () => {
      const spy = jest.spyOn(characterEditorRepository, 'loadCharacters')
      ;(webstarClientGateway.getCharacters as jest.Mock).mockResolvedValue({
        characters: mockCharacters,
      })

      await presenter.loadCharacters()

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call repository duplicateCharacter', () => {
      const spy = jest.spyOn(characterEditorRepository, 'duplicateCharacter')

      presenter.copyCharacter('luke')

      expect(spy).toHaveBeenCalledWith('luke')
    })

    it('should call repository modifyCharacter', () => {
      const spy = jest.spyOn(characterEditorRepository, 'modifyCharacter')

      presenter.modifyCharacter('vader')

      expect(spy).toHaveBeenCalledWith('vader')
    })

    it('should call repository removeCharacter', () => {
      const spy = jest.spyOn(characterEditorRepository, 'removeCharacter')

      presenter.removeCharacter('yoda')

      expect(spy).toHaveBeenCalledWith('yoda')
    })

    it('should call repository cancelEdit', () => {
      const spy = jest.spyOn(characterEditorRepository, 'cancelEdit')

      presenter.closeSideSheet()

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should call repository newCharacter', () => {
      const spy = jest.spyOn(characterEditorRepository, 'newCharacter')

      presenter.newCharacter()

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

  describe('defaultViewModel', () => {
    it('should have correct default view model', () => {
      expect(presenter.defaultViewModel).toEqual({
        characters: [],
        editedCharacter: null,
        loading: true,
        sideSheetOpen: false,
      })
    })
  })
})