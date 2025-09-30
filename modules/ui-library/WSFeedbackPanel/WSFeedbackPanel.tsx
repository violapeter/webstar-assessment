import s from './WSFeedbackPanel.module.scss'

export const WSFeedbackPanel = ({ children }) => {
  return (
    <div className={s.Feedback}>
      <div className={s.Feedback__icon}>⚠</div>
      <div className={s.Feedback__content}>{children}</div>
    </div>
  )
}
