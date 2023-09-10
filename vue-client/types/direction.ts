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
  0: 'N',
  1: 'NE',
  2: 'E',
  3: 'SE',
  4: 'S',
  5: 'SW',
  6: 'W',
  7: 'NW',
} as const

export type DirectionShort = typeof DirectionShort[keyof typeof DirectionShort]
