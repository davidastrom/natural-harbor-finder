export const Direction = {
  NORTH: 0,
  NORTHEAST: 1,
  EAST: 2,
  SOUTHEAST: 3,
  SOUTH: 4,
  SOUTHWEST: 5,
  WEST: 6,
  NORTHWEST: 7,
} as const

export type Direction = typeof Direction[keyof typeof Direction]

export const DirectionShort = {
  N: 0,
  NE: 1,
  E: 2,
  SE: 3,
  S: 4,
  SW: 5,
  W: 6,
  NW: 7,
} as const

export type DirectionShort = typeof DirectionShort[keyof typeof DirectionShort]
