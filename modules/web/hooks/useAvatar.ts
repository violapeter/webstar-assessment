export const AVATAR_IDS = <const>[
  'anakin',
  'boba',
  'grievous',
  'kenobi',
  'luke',
  'maul',
  'phasma',
  'rey',
  'solo',
  'stormtrooper',
  'vader',
  'yoda',
]

export type AvatarId = (typeof AVATAR_IDS)[number]

export function useAvatar() {
  return (id: AvatarId) => `url("/images/characters/${id}.png")`
}

const BackgroundResourceMap: Record<string, string> = {
  space_combat: 'bg_1',
  death_star_inside: 'bg_2',
  battle_of_hoth: 'bg_3',
}

export type BackgroundId = keyof typeof BackgroundResourceMap

export function useBackground() {
  return (backgroundId: BackgroundId) =>
    `url("/images/backgrounds/${BackgroundResourceMap[backgroundId]}.jpg")`
}
