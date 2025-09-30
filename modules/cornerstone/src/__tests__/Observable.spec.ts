import { Observable } from '../Observable'

describe('Observable', () => {
  it('should properly return the value', () => {
    const observable = new Observable({ foo: 'bar' })

    expect(observable.value).toEqual({ foo: 'bar' })
  })

  it('should handle the subscriptions when the value changes', () => {
    const callback = jest.fn()

    const observable = new Observable({ foo: 'bar' })

    observable.subscribe(callback)

    observable.value = { foo: 'baz' }

    expect(observable.value).toEqual({ foo: 'baz' })
    expect(callback).toHaveBeenCalledWith({ foo: 'baz' })
  })

  it('should handle the subscriptions when sub-value changes', () => {
    const callback = jest.fn()

    const observable = new Observable({ foo: 'bar' })

    observable.subscribe(callback)

    observable.value.foo = 'baz'

    expect(observable.value).toEqual({ foo: 'baz' })
    expect(callback).not.toHaveBeenCalledWith({ foo: 'baz' })
  })
})
