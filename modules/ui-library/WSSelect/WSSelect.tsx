import React from 'react'
import s from './WSSelect.module.scss'

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  id: string
  label?: string
}

const WSSelect = ({
  id,
  label,
  children,
  className,
}: React.PropsWithChildren<SelectProps>) => {
  return (
    <div className={s.Select.concat(' ', className)}>
      {label && (
        <label htmlFor={id} className={s.Select__label}>
          {label}
        </label>
      )}
      <select id={id} className={s.Select__field}>
        {children}
      </select>
    </div>
  )
}

const Option = ({
  children,
}: React.PropsWithChildren<React.JSX.IntrinsicElements['option']>) => {
  return <option className={s.Select__option}>{children}</option>
}

WSSelect.Option = Option

export { WSSelect }
