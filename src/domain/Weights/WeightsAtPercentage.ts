import { Plate } from './Plate'

type ClosestPossibleWeight = {
  weight: number
  plates: Plate[]
}

/**
 * Single percentage calculation based on 1rm
 * with the amount plus the closest possible weight
 * using the plates above and below the exact percentage
 */
export type WeightsAtPercentage = {
  percentage: number
  exact: number
  closestAbove: ClosestPossibleWeight
  closestBelow: ClosestPossibleWeight
}
