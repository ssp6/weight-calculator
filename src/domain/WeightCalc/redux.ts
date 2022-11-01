import { Bar } from './Bar'
import { DefaultBars, MetricMensBar } from './defaults/bars'
import { DefaultPlates } from './defaults/plates'
import { ImperialWeightSystem, MetricWeightSystem } from './defaults/weight-systems'
import { Plate } from './Plate'
import { WeightSystem } from './WeightSystem'

// *** State
type WeightCalcState = {
  weightSystems: WeightSystem[]
  selectedWeightSystem: WeightSystem
  bars: Bar[]
  selectedBar: Bar
  platesAvailable: Plate[]
  calcBase?: number
}

const INITIAL_STATE: WeightCalcState = {
  weightSystems: [ImperialWeightSystem, MetricWeightSystem],
  selectedWeightSystem: MetricWeightSystem,
  bars: DefaultBars,
  selectedBar: MetricMensBar,
  platesAvailable: DefaultPlates,
}

// *** Actions

// *** Reducer
