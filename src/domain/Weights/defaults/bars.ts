import { Bar } from '../Bar'
import { ImperialWeightSystem, MetricWeightSystem } from './weight-systems'

export const MetricMensBar: Bar = {
  system: MetricWeightSystem,
  weight: 20,
}

const MetricWomensBar: Bar = {
  system: MetricWeightSystem,
  weight: 15,
}

const ImperialMensBar: Bar = {
  system: ImperialWeightSystem,
  weight: 45,
}

const ImperialWomensBar: Bar = {
  system: ImperialWeightSystem,
  weight: 35,
}

export const DefaultBars: Bar[] = [
  MetricMensBar,
  MetricWomensBar,
  ImperialMensBar,
  ImperialWomensBar,
]
