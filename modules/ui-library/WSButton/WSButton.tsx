import React from 'react'
import s from './WSButton.module.scss'
import classNames from 'classnames'

interface ButtonProps
  extends Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary'
  dark?: boolean
}

export const WSButton = ({
  children,
  variant = 'primary',
  className,
  dark,
  ...rest
}: React.PropsWithChildren<ButtonProps>) => {
  const c = classNames(s)

  return (
    <button
      className={c('Button', `Button--${variant}`, {
        'Button--dark': dark,
      }).concat(' ', className)}
      {...rest}
    >
      {children}
    </button>
  )
}
