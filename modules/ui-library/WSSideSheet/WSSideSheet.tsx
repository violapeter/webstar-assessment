import React from 'react'
import s from './WSSideSheet.module.scss'
import { WSIconButton } from '../WSIconButton/WSIconButton'
import classNames from 'classnames'

interface WSSideSheetProps {
  open: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
  onOpenChange: (open: boolean) => void
  className?: string
}

export const WSSideSheet = ({
  children,
  open,
  header,
  footer,
  onOpenChange,
  className,
}: React.PropsWithChildren<WSSideSheetProps>) => {
  const c = classNames(s)

  return (
    <div
      className={c('SideSheet', { 'SideSheet--open': open }).concat(
        ' ',
        className || '',
      )}
    >
      <div
        className={s.SideSheet__overlay}
        onClick={() => onOpenChange(false)}
      />
      <div className={s.SideSheet__panel}>
        <WSIconButton
          icon="close"
          ariaLabel="Bezárás"
          iconColor={'var(--color-grey)'}
          onClick={() => onOpenChange(false)}
          className={s.SideSheet__closeButton}
        />
        {header && <header className={s.SideSheet__header}>{header}</header>}
        <div className={s.SideSheet__content}>{children}</div>
        {footer && <footer className={s.SideSheet__footer}>{footer}</footer>}
      </div>
    </div>
  )
}
