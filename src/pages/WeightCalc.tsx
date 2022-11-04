import FitnessCenter from '@mui/icons-material/FitnessCenter'
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { toNumber } from 'lodash'
import React, { useState } from 'react'

import { ClosestWeightTableCell } from '../components/ClosestWeightTableCell'
import { updateCalcBaseAndPercentages } from '../domain/Weights/redux'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const inputFontSize = 40
const OneRepMaxInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontSize: inputFontSize,
    width: inputFontSize * 5,
  },
}))

const InputWithButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(8),
}))

const tableFontSize = 18
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: tableFontSize,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: tableFontSize,
  },
}))

const MAX_1_RM_WEIGHT = 1_200

export const WeightCalc: React.FC = () => {
  const { calcBase, weightsAtPercentages, selectedWeightSystem } = useAppSelector(
    (state) => state.weights,
  )
  const dispatch = useAppDispatch()

  const [input1Rm, setInput1Rm] = useState<string>(calcBase?.toString() ?? '')
  const handleTextChange1Rm: StandardInputProps['onChange'] = (e) => {
    const value = toNumber(e.target.value)
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container
          maxWidth={'md'}
          sx={{ flexGrow: 1, paddingLeft: 2, paddingTop: 2, paddingBottom: 2 }}
        >
          <Typography variant="h4" component="div">
            Weight Calculator
          </Typography>
        </Container>
      </AppBar>
      <Container
        maxWidth={'md'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingBottom: 16,
        }}
      >
        <Typography variant={'h1'} sx={{ fontSize: 40, textAlign: 'center', marginBottom: 2 }}>
          One rep max calculator
        </Typography>
        <InputWithButton>
          <OneRepMaxInput
            aria-label={'1 Rep Max'}
            placeholder={'Rep Max'}
            id={'1rm-input'}
            variant="outlined"
            value={input1Rm}
            type={'number'}
            onChange={handleTextChange1Rm}
          />
          <Button
            aria-label={'calculate percentages'}
            variant="contained"
            sx={{ marginLeft: 1, height: inputFontSize * 2 + 4 }}
            onClick={fetchUpdatedWeightPercentages}
            size={'large'}
          >
            <FitnessCenter sx={{ height: 40, width: 40 }} />
          </Button>
        </InputWithButton>
        <TableContainer component={Paper}>
          <Table aria-label={'weight percentages'}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Percent</StyledTableCell>
                <StyledTableCell>Exact</StyledTableCell>
                <StyledTableCell>Closest</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weightsAtPercentages?.map((data) => (
                <TableRow key={data.percentage}>
                  <StyledTableCell>{data.percentage}%</StyledTableCell>
                  <StyledTableCell>
                    {data.exact} {selectedWeightSystem.weightAbbreviation}
                  </StyledTableCell>
                  <StyledTableCell>
                    <ClosestWeightTableCell
                      exactWeight={data.exact}
                      closestAbove={data.closestAbove}
                      closestBelow={data.closestBelow}
                      weightSystem={selectedWeightSystem}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}
