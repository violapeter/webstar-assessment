import { AbstractRepository } from './AbstractRepository'

export abstract class AbstractPresenter<DomainModel, ViewModel> {
  abstract defaultViewModel: ViewModel

  abstract repository: AbstractRepository<DomainModel>

  subscribeToRepository<T>(repository: AbstractRepository<T>) {
    repository.subscribe(() =>
      this.load(() => this.reduceViewModel(this.repository.value)),
    )
  }

  load(callback: (viewModel: ViewModel) => void): void {
    this.repository.load((domainModel) => {
      callback(this.reduceViewModel(domainModel))
    })

    this.init()
  }

  reduceViewModel(domainModel: DomainModel): ViewModel {
    return domainModel as unknown as ViewModel
  }

  init() {}
}
