import { iconData } from './icon-data/iconData'

export type IconName = keyof typeof iconData

export interface IconProps {
  name: IconName
  color?: string
  size?: number
}

export const WSIcon = ({
  name,
  color = 'var(--color-white)',
  size = 24,
  ...rest
}: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" {...rest}>
      {iconData[name].map((path, index) => (
        <path key={`${name}-path-${index}`} d={path} fill={color} />
      ))}
    </svg>
  )
}
