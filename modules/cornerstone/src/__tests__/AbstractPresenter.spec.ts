import { AbstractPresenter } from '../AbstractPresenter'
import { AbstractRepository } from '../AbstractRepository'

class TestPresenter extends AbstractPresenter<DomainModel, ViewModel> {
  defaultViewModel = {} as ViewModel
  repository = {
    load: jest.fn(),
  } as unknown as AbstractRepository<DomainModel>
}

interface DomainModel {
  id: number
}

interface ViewModel {
  id: number
}

describe('AbstractPresenter', () => {
  let presenter: TestPresenter

  beforeEach(() => {
    presenter = new TestPresenter()
  })

  it('should call callback with reduced ViewModel', () => {
    const mockDomainModel = { id: 1 }
    const callback = jest.fn()

    presenter.repository.load = jest.fn((callback) => callback(mockDomainModel))

    presenter.load(callback)

    expect(callback).toHaveBeenCalledWith(mockDomainModel)
  })
})
