import React from 'react'
import s from './WSTextarea.module.scss'
import classNames from 'classnames'

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label?: React.ReactNode
}

export const WSTextarea = ({
  id,
  label,
  className,
  ...rest
}: TextareaProps) => {
  const c = classNames(s)

  return (
    <div className={c('Textarea').concat(' ', className)}>
      {label && (
        <label htmlFor={id} className={s.Textarea__label}>
          {label}
        </label>
      )}
      <textarea id={id} className={s.Textarea__field} {...rest} />
    </div>
  )
}
