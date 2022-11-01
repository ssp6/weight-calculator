import { Plate } from '../Plate'
import { ImperialWeightSystem, MetricWeightSystem } from './weight-systems'

// Metric
const Kg25: Plate = {
  weight: 25,
  system: MetricWeightSystem,
}

const Kg20: Plate = {
  weight: 20,
  system: MetricWeightSystem,
}

const Kg15: Plate = {
  weight: 15,
  system: MetricWeightSystem,
}

const Kg10: Plate = {
  weight: 10,
  system: MetricWeightSystem,
}

const Kg5: Plate = {
  weight: 5,
  system: MetricWeightSystem,
}

const Kg2p5: Plate = {
  weight: 2.5,
  system: MetricWeightSystem,
}

const Kg1p25: Plate = {
  weight: 1.25,
  system: MetricWeightSystem,
}

// Imperial
const Lb50: Plate = {
  weight: 50,
  system: ImperialWeightSystem,
}

const Lb45: Plate = {
  weight: 45,
  system: ImperialWeightSystem,
}

const Lb35: Plate = {
  weight: 35,
  system: ImperialWeightSystem,
}

const Lb25: Plate = {
  weight: 25,
  system: ImperialWeightSystem,
}

const Lb10: Plate = {
  weight: 10,
  system: ImperialWeightSystem,
}

const Lb5: Plate = {
  weight: 5,
  system: ImperialWeightSystem,
}

const Lb2p5: Plate = {
  weight: 2.5,
  system: ImperialWeightSystem,
}

export const DefaultPlates: Plate[] = [
  Kg25,
  Kg20,
  Kg15,
  Kg10,
  Kg5,
  Kg2p5,
  Kg1p25,
  Lb50,
  Lb45,
  Lb35,
  Lb25,
  Lb10,
  Lb5,
  Lb2p5,
]
