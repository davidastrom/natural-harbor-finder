export const HarborType = {
  NATURAL: 0,
  SMALL_BOATS: 1,
  YACHTS: 2,
} as const

export type HarborType = typeof HarborType[keyof typeof HarborType]
