import { Plate } from './Plate'
import { WeightSystem } from './WeightSystem'

/**
 * Filter only plates in the weight system provided
 * and sort them from largest to smallest
 *
 * @param weightSystem Weight system to filter by
 * @param plates Plates to filter
 */
export const filterAndSortPlates = (weightSystem: WeightSystem, plates: Plate[]): Plate[] => {
  return plates
    .filter((plate) => plate.system.name === weightSystem.name)
    .sort((a, b) => b.weight - a.weight)
}
