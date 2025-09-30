import React from 'react'
import s from './WSInput.module.scss'
import classNames from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: React.ReactNode
  align?: 'center' | 'default'
  variant?: 'dark' | 'light'
  error?: string
  invalid?: boolean
}

export const WSInput = ({
  id,
  label,
  align = 'default',
  variant = 'light',
  error,
  invalid,
  className,
  ...rest
}: InputProps) => {
  const c = classNames(s)

  return (
    <div
      className={c('Input', {
        'Input--centered': align === 'center',
      }).concat(' ', className)}
    >
      {label && (
        <label htmlFor={id} className={s.Input__label}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={c('Input__field', {
          'Input__field--invalid': invalid,
          'Input__field--dark': variant === 'dark',
        })}
        {...rest}
      />
      {error && <span className={s.Input__error}>{error}</span>}
    </div>
  )
}
