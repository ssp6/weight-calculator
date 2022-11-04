import { Box, Button, Container, TextField } from '@mui/material'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { toNumber } from 'lodash'
import React, { useState } from 'react'

import { updateCalcBaseAndPercentages } from '../domain/Weights/redux'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const MAX_1_RM_WEIGHT = 1_200

export const WeightCalc: React.FC = () => {
  const { calcBase } = useAppSelector((state) => state.weights)
  const dispatch = useAppDispatch()

  const [input1Rm, setInput1Rm] = useState<string>(calcBase?.toString() ?? '')
  const handleTextChange1Rm: StandardInputProps['onChange'] = (e) => {
    const value = toNumber(e.target.value.replace(/\D/g, ''))
    if (value === 0) {
      setInput1Rm('')
      return
    }
    if (value > MAX_1_RM_WEIGHT) {
      // Do nothing if over Max
      return
    }

    setInput1Rm(value.toString())
  }

  const fetchUpdatedWeightPercentages = () => {
    const input1RmAsNumber = toNumber(input1Rm)
    if (!input1Rm || input1RmAsNumber === calcBase) {
      // Don't update
      return
    }

    dispatch(updateCalcBaseAndPercentages(input1RmAsNumber))
  }

  return (
    <Container
      maxWidth={'md'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
        }}
      >
        <TextField
          id={'1rm-input'}
          variant="outlined"
          value={input1Rm}
          type={'number'}
          onChange={handleTextChange1Rm}
        />
        <Button variant="contained" sx={{ marginLeft: 1 }} onClick={fetchUpdatedWeightPercentages}>
          Calc
        </Button>
      </Box>
    </Container>
  )
}
