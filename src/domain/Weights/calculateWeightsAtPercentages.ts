import Decimal from 'decimal.js'
import { range } from 'lodash'

import { Bar } from './Bar'
import { filterAndSortPlates } from './filterAndSortPlates'
import { WeightsAtPercentage } from './WeightsAtPercentage'
import { Plate } from './Plate'
import { WeightSystem } from './WeightSystem'

/**
 * Array of percentages from 100% -> 40% (inclusive)
 *
 * Calculated using percentage * 10 so don't deal with JS decimal issues
 */
const percentagesToCalculate = range(1000, 375, -25).map((p) => new Decimal(p / 10))

/**
 * Calculate percentage calc for every percentage of 1rm
 * from 100 -> 40%
 */
export const calculateWeightsAtPercentages = (
  calcBase: number,
  weightSystem: WeightSystem,
  bar: Bar,
  allPlates: Plate[],
) => {
  const calcBaseDecimal = new Decimal(calcBase)
  const availablePlates = filterAndSortPlates(weightSystem, allPlates)
  const smallestWeightIncrement = new Decimal(
    availablePlates[availablePlates.length - 1].weight,
  ).mul(2)

  return percentagesToCalculate.map((percentage) =>
    calculateSinglePercentageWeights(
      calcBaseDecimal,
      percentage,
      bar,
      smallestWeightIncrement,
      availablePlates,
    ),
  )
}

export const calculateSinglePercentageWeights = (
  calcBaseDecimal: Decimal,
  percentage: Decimal,
  bar: Bar,
  smallestWeightIncrement: Decimal,
  availablePlates: Plate[],
): WeightsAtPercentage => {
  const exactCalcBasedOnPercentage = calcBaseDecimal.mul(percentage).div(100)
  const diffBetweenExactAndClosestBelow = exactCalcBasedOnPercentage
    .minus(bar.weight)
    .mod(smallestWeightIncrement)

  const closestWeightBelow = exactCalcBasedOnPercentage.minus(diffBetweenExactAndClosestBelow)
  const closestWeightAbove = diffBetweenExactAndClosestBelow.equals(0)
    ? exactCalcBasedOnPercentage
    : closestWeightBelow.plus(smallestWeightIncrement)

  return {
    percentage: Number.parseFloat(percentage.toString()),
    exact: Number.parseFloat(exactCalcBasedOnPercentage.toFixed(2)),
    closestBelow: {
      weight: Number.parseFloat(closestWeightBelow.toFixed(2)),
      plates: [],
    },
    closestAbove: {
      weight: Number.parseFloat(closestWeightAbove.toFixed(2)),
      plates: [],
    },
  }
}
