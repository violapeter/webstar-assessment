import { AbstractPresenter } from 'cornerstone'
import { useEffect, useState } from 'react'
import { Constructor, Modifier, ViewModel } from './types'

export function usePresenter<
  Presenter extends AbstractPresenter<object, any>,
  Args = object,
>(
  PresenterConstructor: Constructor<Presenter>,
  defaultViewModel?: ViewModel<Presenter>,
  onStateChange?: Modifier<Presenter, [Args]>,
) {
  const presenter = new PresenterConstructor()

  const [viewModel, setViewModel] = useState<ViewModel<Presenter>>(
    defaultViewModel ?? presenter.defaultViewModel,
  )

  useEffect(() => {
    presenter.load((data) => {
      setViewModel(data)
      onStateChange?.(presenter)
    })
  }, [])

  return [viewModel, presenter] as const
}
