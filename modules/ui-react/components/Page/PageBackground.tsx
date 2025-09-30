import React from 'react'
import { BackgroundId, useBackground } from 'web/hooks/useAvatar'

interface PageBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  background: BackgroundId
}

export const PageBackground = ({
  children,
  background,
  ...rest
}: React.PropsWithChildren<PageBackgroundProps>) => {
  const getBackground = useBackground()

  return (
    <div {...rest} style={{ backgroundImage: getBackground(background) }}>
      {children}
    </div>
  )
}
