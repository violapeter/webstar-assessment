# Cornerstone React

Utilities for using Cornerstone files in React projects.

These methods intended to abstract the boilerplate in the React side, and ease the usage of the presenter layer of
your cornerstone files.

## `usePresenter`

It's a small hook which covers the useEffect and the state of the repository. It cleans up a little bit your code.

### Usage


**🥱 Before:**
```tsx
import { useState, useEffect } from 'react'
import { UserPresenter } from 'logic'

const MyComponent = () => {
  const presenter = new UserPresenter()

  const [viewModel, setViewModel] = useState(presenter.defaultViewModel)
  
  useEffect(() => {
    presenter.load(setViewModel)
  }, [])

  return (
    <>
      User name: {viewModel.userName}
      <button onClick={presenter.delete}>Delete</button>
    </>
  )
}

```
**🥳 After:**
```tsx
import { usePresenter } from 'cornerstone-react'
import { UserPresenter } from 'logic'

const MyComponent = () => {
  const [viewModel, presenter] = usePresenter(UserPresenter)
  
  return (
    <>
      User name: {viewModel.userName}
      <button onClick={presenter.delete}>Delete</button>
    </>
  )
}

```

## `createPresenterContext`

A factory function to cover a lots of boilerplate for simpler presenters.

**🥱 Before:**

```tsx
import { UserViewModel, UserPresenter } from 'logic'
import { createContext, PropsWithChildren } from 'react'

export const UserContext = createContext<UserViewModel>({} as UserViewModel)

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [viewModel, presenter] = usePresenter(UserPresenter)
  
  return (
    <UserContext.Provider value={{ viewModel, presenter }}>
      {children}
    </UserContext.Provider>
  )
}
```

**🥳 After:**

```tsx
import { UserPresenter } from 'logic'
import { createPresenterContext } from 'cornerstone-react'

export const [UserContext, UserContextProvider] = createPresenterContext(UserPresenter)
```