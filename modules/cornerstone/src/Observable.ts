type CallbackFunction<T, U = unknown> = (value: T) => U

export class Observable<T> {
  private internalValue: T

  private observers: Array<CallbackFunction<T>> = []

  constructor(initialValue: T) {
    this.internalValue = initialValue
  }

  set value(newValue: T) {
    this.internalValue = newValue
    this.notify()
  }

  get value() {
    return this.internalValue
  }

  subscribe(callback: CallbackFunction<T>) {
    this.observers.push(callback)
  }

  notify() {
    this.observers.forEach((observer) => {
      observer(this.internalValue)
    })
  }
}
