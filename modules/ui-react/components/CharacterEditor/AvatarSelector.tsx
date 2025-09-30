import { AVATAR_IDS, AvatarId, useAvatar } from 'web/hooks/useAvatar'
import s from './AvatarSelector.module.scss'
import classNames from 'classnames'
import React from 'react'

interface AvatarSelectorProps {
  selected: AvatarId
  onSelected: (avatar: AvatarId) => void
}

const c = classNames(s)

export const AvatarSelector = ({
  selected,
  onSelected,
}: AvatarSelectorProps) => {
  const getAvatar = useAvatar()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    ref.current?.addEventListener(
      'wheel',
      (e) => {
        if (!ref.current) return

        const atStart = ref.current?.scrollLeft === 0
        const atEnd =
          ref.current?.scrollLeft + ref.current?.clientWidth >=
          ref.current?.scrollWidth

        if (e.deltaY < 0 && atStart) return
        if (e.deltaY > 0 && atEnd) return

        ref.current.scrollLeft += e.deltaY
        e.preventDefault()
      },
      { passive: false },
    )
  }, [])

  return (
    <div className={s.AvatarSelector}>
      <div className={s.AvatarSelector__viewPort} ref={ref}>
        <div className={s.AvatarSelector__avatars}>
          {AVATAR_IDS.map((id) => (
            <label
              key={id}
              className={c('AvatarSelector__avatar', {
                'AvatarSelector__avatar--selected': selected === id,
              })}
              style={{ backgroundImage: getAvatar(id) }}
              onClick={() => onSelected(id)}
            >
              <input
                className={s.AvatarSelector__radio}
                type="radio"
                name="avatar"
                value={id}
                checked={selected === id}
                onChange={() => onSelected(id)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
