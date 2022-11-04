import ArrowDown from '@mui/icons-material/ArrowDropDown'
import ArrowUp from '@mui/icons-material/ArrowDropUp'
import Remove from '@mui/icons-material/Remove'
import { Box } from '@mui/material'
import { BoxTypeMap } from '@mui/material/Box/Box'
import React from 'react'

import { ClosestPossibleWeight } from '../domain/Weights/WeightsAtPercentage'
import { WeightSystem } from '../domain/Weights/WeightSystem'

type ClosestWeightTableCellProps = {
  exactWeight: number
  closestAbove: ClosestPossibleWeight
  closestBelow: ClosestPossibleWeight
  weightSystem: WeightSystem
}

export const ClosestWeightTableCell: React.FC<ClosestWeightTableCellProps> = ({
  exactWeight,
  closestAbove,
  closestBelow,
  weightSystem,
}) => {
  if (closestAbove.weight === exactWeight && closestBelow.weight === exactWeight) {
    return (
      <SpanVerticalCentre>
        <Remove sx={{ color: 'orange', paddingBottom: '0px' }} /> {exactWeight}{' '}
        {weightSystem.weightAbbreviation}
      </SpanVerticalCentre>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <SpanVerticalCentre>
        <ArrowUp sx={{ color: 'green' }} /> {closestAbove.weight} {weightSystem.weightAbbreviation}
      </SpanVerticalCentre>
      <SpanVerticalCentre>
        <ArrowDown sx={{ color: 'red' }} /> {closestBelow.weight} {weightSystem.weightAbbreviation}
      </SpanVerticalCentre>
    </Box>
  )
}

const SpanVerticalCentre: typeof Box = (props: BoxTypeMap['props']) => (
  <Box {...props} component={'span'} sx={{ ...props.sx, display: 'flex', alignItems: 'centre' }} />
)
