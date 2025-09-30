import { IoCContainer } from '../IoCContainer'

describe('IoCContainer', () => {
  type Dependencies = {
    serviceA: () => string
    serviceB: { value: number }
  }

  let container: IoCContainer<keyof Dependencies, Dependencies>

  beforeEach(() => {
    container = new IoCContainer<keyof Dependencies, Dependencies>()
  })

  it('should register and retrieve a function', () => {
    const serviceA = () => 'Hello, World!'
    container.register('serviceA', serviceA)

    const retrievedServiceA = container.get('serviceA')
    expect(retrievedServiceA()).toBe('Hello, World!')
  })

  it('should register and retrieve an object', () => {
    const serviceB = { value: 42 }
    container.register('serviceB', serviceB)

    const retrievedServiceB = container.get('serviceB')
    expect(retrievedServiceB.value).toBe(42)
  })

  it('should throw an error if entity not found', () => {
    expect(() =>
      container.get('nonExistentService' as keyof Dependencies),
    ).toThrow('Entity not found: nonExistentService')
  })

  it('should override previously registered service', () => {
    const initialService = () => 'Initial Service'
    const newService = () => 'New Service'

    container.register('serviceA', initialService)
    expect(container.get('serviceA')()).toBe('Initial Service')

    container.register('serviceA', newService)
    expect(container.get('serviceA')()).toBe('New Service')
  })
})
