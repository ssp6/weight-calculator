import { calculatePercentageCalc } from './calculatePercentageCalc'
import { MetricMensBar } from './defaults/bars'
import { DefaultPlates } from './defaults/plates'
import { MetricWeightSystem } from './defaults/weight-systems'

describe('calculatePercentageCalc', () => {
  /**
   * Very basic tests, checked with eye balling results
   */
  test('Metric 151', () => {
    // Given
    const calcBase = 151
    const weightSystem = MetricWeightSystem
    const bar = MetricMensBar
    const plates = DefaultPlates

    // When
    const result = calculatePercentageCalc(calcBase, weightSystem, bar, plates)

    // Then
    expect(result.length).toEqual(25)
    expect(result[1].closestAbove.weight).toEqual(147.5)
  })
})
