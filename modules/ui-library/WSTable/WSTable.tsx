import s from './WSTable.module.scss'
import React, { createElement } from 'react'

type ElementMap = React.JSX.IntrinsicElements
type TagName = keyof ElementMap

type ComponentAdapterArgs<T extends TagName> = React.PropsWithChildren<
  ElementMap[T]
>

type ComponentAdapter<T extends TagName> = (
  args: ComponentAdapterArgs<T>,
) => React.JSX.Element

const createHTMLAdapterComponent =
  (
    tagName: TagName,
    defaultClassName: string,
  ): ComponentAdapter<typeof tagName> =>
  ({ children, className, ...rest }) =>
    createElement(
      tagName,
      {
        className: className
          ? defaultClassName.concat(' ', className || '')
          : defaultClassName,
        ...rest,
      },
      children,
    )

const WSTable = Object.assign(createHTMLAdapterComponent('table', s.Table), {
  Head: createHTMLAdapterComponent('thead', s.Table__head),
  Header: createHTMLAdapterComponent('th', s.Table__header),
  Body: createHTMLAdapterComponent('tbody', s.Table__body),
  Row: createHTMLAdapterComponent('tr', s.Table__row),
  Cell: createHTMLAdapterComponent('td', s.Table__cell),
})

export { WSTable }
