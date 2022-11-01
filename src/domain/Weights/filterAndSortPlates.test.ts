import { DefaultPlates } from './defaults/plates'
import { ImperialWeightSystem, MetricWeightSystem } from './defaults/weight-systems'
import { filterAndSortPlates } from './filterAndSortPlates'
import { WeightSystem } from './WeightSystem'

describe('filterAndSortPlates', () => {
  test('Returns empty array if no plates matching system', () => {
    // Given
    const weightSystem: WeightSystem = {
      name: 'Unknown',
      weightAbbreviation: 'Un',
    }
    const plates = DefaultPlates

    // When
    const results = filterAndSortPlates(weightSystem, plates)

    // Then
    expect(results).toEqual([])
  })
  test('Returns only imperial plates', () => {
    // Given
    const weightSystem = ImperialWeightSystem
    const plates = DefaultPlates

    // When
    const results = filterAndSortPlates(weightSystem, plates)

    // Then
    expect(results.length).toEqual(7)
    expect(results[0].system).toEqual(ImperialWeightSystem)
    expect(results[0].weight >= results[6].weight).toBeTruthy()
  })
  test('Returns only metric plates', () => {
    // Given
    const weightSystem = MetricWeightSystem
    const plates = DefaultPlates

    // When
    const results = filterAndSortPlates(weightSystem, plates)

    // Then
    expect(results.length).toEqual(7)
    expect(results[0].system).toEqual(MetricWeightSystem)
    expect(results[0].weight >= results[6].weight).toBeTruthy()
  })
})
