# Cornerstone base classes

Abstract classes to ease the usage of Cornerstone architecture.

## Usage

```ts
import { AbstractRepository, AbstractPresenter } from 'cornerstone'

interface CarModel {
  engineStarted: boolean
  color: 'red' | 'black'
}

interface CarView {
  isMoving: boolean
  speed: number
}

class CarRepository extends AbstractRepository<CarModel> {
  defaultValue: {
    engineStarted: false
    color: 'black'
  }
}

class CarPresenter extends AbstractPresenter<CarModel, CarView> {
  repository = new CarRepository()
  defaultViewModel = {
    isMoving: false,
    speed: 0,
  }

  reduceViewModel(domainModel: CarModel): CarView {
    return {
      isMoving: domainModel.engineStarted,
      speed: !domainModel.engineStarted
        ? 0
        : domainModel.color === 'red'
          ? 380
          : 120,
    }
  }

  startCar() {
    this.repository.setFieldValue('engineStarted', true)
  }

  stopCar() {
    this.repository.setFieldValue('engineStarted', false)
  }

  paintCar(color: 'red' | 'black') {
    this.repository.setFieldValue('color', color)
  }
}
```