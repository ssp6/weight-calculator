import { Plate } from './Plate'
import { WeightSystem } from './WeightSystem'

export const filterAndSortPlates = (
  weightSystem: WeightSystem,
  plates: Plate[],
): Plate[] => {
  return plates.filter((plate) => plate.system === weightSystem).sort((a, b) => b.weight - a.weight)
}
