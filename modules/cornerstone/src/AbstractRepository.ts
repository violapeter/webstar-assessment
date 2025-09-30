import { Observable } from './Observable'

type Setter<T> = T | ((prevState: T) => T)

export abstract class AbstractRepository<T> {
  private internalValue: Observable<T> | null = null

  abstract readonly defaultValue: T

  public load(callback: (model: T) => void): void {
    this.subscribe(callback)
    this.setValue(this.ensuredInternalValue.value)
  }

  public subscribe(callback: (model: T) => void): void {
    this.ensuredInternalValue.subscribe(callback)
  }

  public get value(): T {
    return this.ensuredInternalValue.value
  }

  public getFieldValue<K extends keyof T>(field: K): T[K] {
    return this.ensuredInternalValue.value[field]
  }

  public setValue(newValue: Partial<T>): void {
    this.ensuredInternalValue.value = {
      ...this.ensuredInternalValue.value,
      ...newValue,
    }
  }

  public setFieldValue<K extends keyof T>(field: K, value: Setter<T[K]>): void {
    const newValue = this.isFunction(value)
      ? value(this.ensuredInternalValue.value[field])
      : value

    this.setValue({
      [field]: newValue,
    } as unknown as Partial<T>)
  }

  private isFunction<T>(setter: Setter<T>): setter is (prevState: T) => T {
    return typeof setter === 'function'
  }

  private get ensuredInternalValue(): Observable<T> {
    if (this.internalValue === null) {
      this.internalValue = new Observable(structuredClone(this.defaultValue))
    }
    return this.internalValue
  }
}
