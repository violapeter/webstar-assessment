import s from './WSFeedbackPanel.module.scss'
import React from 'react'

export const WSFeedbackPanel = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={s.Feedback}>
      <div className={s.Feedback__icon}>⚠</div>
      <div className={s.Feedback__content}>{children}</div>
    </div>
  )
}
