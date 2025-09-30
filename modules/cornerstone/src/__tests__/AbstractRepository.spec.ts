import { AbstractRepository } from '../AbstractRepository'

globalThis.structuredClone =
  globalThis.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj)))

describe('AbstractRepository', () => {
  class ConcreteRepository extends AbstractRepository<{ foo: string }> {
    defaultValue = { foo: 'bar' }
  }

  it('should return a value when load did not happen', () => {
    const repository = new ConcreteRepository()
    expect(repository.value).toMatchObject({ foo: 'bar' })
  })

  it("should set field value even if load haven't been called", () => {
    const repository = new ConcreteRepository()
    repository.setFieldValue('foo', 'baz')
    expect(repository.value).toMatchObject({ foo: 'baz' })
  })

  it("should set value even if load haven't been called", () => {
    const repository = new ConcreteRepository()
    repository.setValue({ foo: 'hello world' })
    expect(repository.value).toMatchObject({ foo: 'hello world' })
  })

  it('should return a specific fields value', () => {
    const repository = new ConcreteRepository()
    repository.load(jest.fn)
    expect(repository.getFieldValue('foo')).toEqual('bar')
  })

  it('should call the callback on initial load', () => {
    const callback = jest.fn()
    const repository = new ConcreteRepository()
    repository.load(callback)

    expect(callback).toHaveBeenCalledWith({ foo: 'bar' })
  })

  it('should notify the subscribers when value changes', () => {
    const callback = jest.fn()
    const repository = new ConcreteRepository()
    repository.load(callback)

    repository.setValue({ foo: 'baz' })

    expect(repository.value).toEqual({ foo: 'baz' })
    expect(callback).toHaveBeenCalledWith({ foo: 'baz' })
  })

  it('should work with field update', () => {
    const callback = jest.fn()
    const repository = new ConcreteRepository()
    repository.load(callback)

    repository.setFieldValue('foo', 'baz')

    expect(callback).toHaveBeenCalledWith({ foo: 'baz' })
    expect(repository.value).toEqual({ foo: 'baz' })
  })
})
