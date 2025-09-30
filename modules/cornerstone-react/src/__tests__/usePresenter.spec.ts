import { renderHook } from '@testing-library/react'
import { usePresenter } from '../usePresenter'
import { AbstractPresenter } from 'cornerstone'

const mockTest = jest.fn()

class TestPresenter extends AbstractPresenter<object, { id: number }> {
  defaultViewModel = { id: 0 }
  repository = {
    load: jest.fn(),
  } as any

  testMethod() {
    return mockTest()
  }
}

describe('usePresenter', () => {
  it('should initialize with default ViewModel', () => {
    const { result } = renderHook(() => usePresenter(TestPresenter))
    const [viewModel] = result.current

    expect(viewModel).toEqual({ id: 0 })
  })

  it('should access the presenter methods', () => {
    const { result } = renderHook(() => usePresenter(TestPresenter))
    const [, presenter] = result.current

    presenter.testMethod()

    expect(mockTest).toHaveBeenCalled()
  })

  it('should access the viewModel', () => {
    const { result } = renderHook(() => usePresenter(TestPresenter))
    const [viewModel] = result.current

    expect(viewModel.id).toBe(0)
  })
})
