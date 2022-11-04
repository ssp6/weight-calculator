import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { toNumber } from 'lodash'
import React, { useState } from 'react'

import { ClosestWeightTableCell } from '../components/ClosestWeightTableCell'
import { updateCalcBaseAndPercentages } from '../domain/Weights/redux'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const MAX_1_RM_WEIGHT = 1_200

export const WeightCalc: React.FC = () => {
  const { calcBase, weightsAtPercentages, selectedWeightSystem } = useAppSelector(
    (state) => state.weights,
  )
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
        flexDirection: 'column',
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
          aria-label={'1 rep max'}
          variant="outlined"
          value={input1Rm}
          type={'number'}
          onChange={handleTextChange1Rm}
        />
        <Button
          aria-label={'calculate percentages'}
          variant="contained"
          sx={{ marginLeft: 1 }}
          onClick={fetchUpdatedWeightPercentages}
          size={'large'}
        >
          <SendIcon />
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label={'weight percentages'}>
          <TableHead>
            <TableRow>
              <TableCell>Percentage</TableCell>
              <TableCell>Exact</TableCell>
              <TableCell>Closest</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weightsAtPercentages?.map((data) => (
              <TableRow>
                <TableCell>{data.percentage}%</TableCell>
                <TableCell>
                  {data.exact} {selectedWeightSystem.weightAbbreviation}
                </TableCell>
                <TableCell>
                  <ClosestWeightTableCell
                    exactWeight={data.exact}
                    closestAbove={data.closestAbove}
                    closestBelow={data.closestBelow}
                    weightSystem={selectedWeightSystem}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
