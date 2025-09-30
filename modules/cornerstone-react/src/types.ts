import { AbstractPresenter } from 'cornerstone'

export type Constructor<T> = new () => T

export type ViewModel<Presenter> =
  Presenter extends AbstractPresenter<object, infer VM> ? VM : never

export type DomainModel<Presenter> =
  Presenter extends AbstractPresenter<infer DM, object> ? DM : never

export type Modifier<Presenter, Args, Returns = void> = (
  presenter: Presenter,
  ...args: Args[]
) => Returns
