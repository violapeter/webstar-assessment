import { render, screen, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createPresenterContext } from '../createPresenterContext'
import { AbstractPresenter, AbstractRepository } from 'cornerstone'
import { useContext } from 'react'

globalThis.structuredClone =
  globalThis.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj)))

class TestRepository extends AbstractRepository<{ id: number }> {
  defaultValue = { id: 0 }
}

const testRepository = new TestRepository()

class TestPresenter extends AbstractPresenter<object, { id: number }> {
  defaultViewModel = { id: 0 }
  repository = testRepository
  changeNumber(number: number) {
    this.repository.setValue({ id: number })
  }
}

describe('createPresenterContext', () => {
  it('should provide default ViewModel and Presenter', () => {
    const [Context, ContextProvider] = createPresenterContext(TestPresenter)

    const TestComponent = () => {
      const { viewModel, presenter } = useContext(Context)

      return (
        <div>
          <span data-testid="viewModel">{viewModel.id}</span>
          <span data-testid="presenter">{presenter.constructor.name}</span>
        </div>
      )
    }

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>,
    )

    expect(screen.getByTestId('viewModel')).toHaveTextContent('0')
    expect(screen.getByTestId('presenter')).toHaveTextContent('TestPresenter')
  })

  it('should update ViewModel on presenter load', async () => {
    const [Context, ContextProvider] = createPresenterContext(TestPresenter)

    const TestComponent = () => {
      const context = useContext(Context)
      if (!context) return null

      return (
        <span
          data-testid="viewModel"
          onClick={() => context.presenter.changeNumber(1)}
        >
          {context.viewModel.id}
        </span>
      )
    }

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>,
    )

    const viewModelEl = screen.getByTestId('viewModel')

    act(() => {
      fireEvent.click(viewModelEl)
    })

    expect(viewModelEl).toHaveTextContent('1')
  })
})
