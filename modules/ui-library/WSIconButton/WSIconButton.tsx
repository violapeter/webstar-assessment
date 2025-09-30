import React from 'react'
import s from './WSIconButton.module.scss'
import classNames from 'classnames'
import { IconName, WSIcon } from '../WSIcon/WSIcon'

interface ButtonProps
  extends Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon: IconName
  ariaLabel: string
  iconSize?: number
  iconColor?: string
}

export const WSIconButton = ({
  icon,
  ariaLabel,
  className,
  iconSize,
  iconColor,
  ...rest
}: ButtonProps) => {
  const c = classNames(s)

  return (
    <button
      aria-label={ariaLabel}
      className={c('IconButton').concat(' ', className || '')}
      {...rest}
    >
      <WSIcon name={icon} size={iconSize} color={iconColor} />
    </button>
  )
}
