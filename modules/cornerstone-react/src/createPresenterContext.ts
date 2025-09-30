import {
  PropsWithChildren,
  createContext,
  createElement,
  useEffect,
  useState,
} from 'react'
import { AbstractPresenter } from 'cornerstone'
import { Constructor, ViewModel } from './types'

interface ContextValue<ViewModel, Presenter, Provided> {
  viewModel: ViewModel
  presenter: Presenter
  props: Provided
}

export interface PresenterSettings<ViewModel, Presenter, Props> {
  onChange?: (value: ContextValue<ViewModel, Presenter, Props>) => void
  onInit?: (value: ContextValue<ViewModel, Presenter, Props>) => void
  defaultViewModel?: Partial<ViewModel>
}

export function createPresenterContext<
  Presenter extends AbstractPresenter<any, any>,
  ContextProps extends object = Record<string, any>,
>(
  PresenterConstructor: Constructor<Presenter>,
  settings?: PresenterSettings<ViewModel<Presenter>, Presenter, ContextProps>,
) {
  type VM = ViewModel<Presenter>
  type ContextType = {
    viewModel: VM
    presenter: Presenter
  } & ContextProps

  const Context = createContext<ContextType | undefined>(undefined)

  const ContextProvider = (
    props: PropsWithChildren<
      ContextProps & PresenterSettings<VM, Presenter, ContextProps>
    >,
  ) => {
    const presenter = new PresenterConstructor()

    const getDefaultViewModel = () => ({
      ...presenter.defaultViewModel,
      ...settings?.defaultViewModel,
      ...props?.defaultViewModel,
    })

    const [viewModel, setViewModel] = useState<VM>(getDefaultViewModel)

    useEffect(() => {
      presenter.load((loadedViewModel: VM) => {
        setViewModel(loadedViewModel)
        settings?.onChange?.({ viewModel: loadedViewModel, presenter, props })
        props?.onChange?.({ viewModel: loadedViewModel, presenter, props })
      })

      settings?.onInit?.({ viewModel, presenter, props })
    }, [])

    return createElement(Context.Provider, {
      value: {
        viewModel,
        presenter,
        ...props,
      },
      ...props,
    })
  }

  return [Context, ContextProvider] as const
}
