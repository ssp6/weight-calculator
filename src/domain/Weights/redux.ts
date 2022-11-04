import { createAction, createReducer } from '@reduxjs/toolkit'

import { Bar } from './Bar'
import { calculateWeightsAtPercentages } from './calculateWeightsAtPercentages'
import { DefaultBars, MetricMensBar } from './defaults/bars'
import { DefaultPlates } from './defaults/plates'
import { ImperialWeightSystem, MetricWeightSystem } from './defaults/weight-systems'
import { Plate } from './Plate'
import { WeightsAtPercentage } from './WeightsAtPercentage'
import { WeightSystem } from './WeightSystem'

// *** State
type WeightCalcState = {
  weightSystems: WeightSystem[]
  selectedWeightSystem: WeightSystem
  bars: Bar[]
  selectedBar: Bar
  platesStoredInSystem: Plate[]
  calcBase?: number
  weightsAtPercentages?: WeightsAtPercentage[]
}

const INITIAL_STATE: WeightCalcState = {
  weightSystems: [ImperialWeightSystem, MetricWeightSystem],
  selectedWeightSystem: MetricWeightSystem,
  bars: DefaultBars,
  selectedBar: MetricMensBar,
  platesStoredInSystem: DefaultPlates,
}

// *** Actions
export const updateCalcBaseAndPercentages = createAction<number>('weight-calc/updateCalcBase')

// *** Reducer
export const weightCalcReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(updateCalcBaseAndPercentages, (state, { payload }) => {
    state.calcBase = payload
    state.weightsAtPercentages = calculateWeightsAtPercentages(
      payload,
      state.selectedWeightSystem,
      state.selectedBar,
      state.platesStoredInSystem,
    )
  })
})
