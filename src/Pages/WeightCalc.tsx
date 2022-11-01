import { Button, Container } from '@mui/material'
import React from 'react'

export const WeightCalc: React.FC = () => {
  return (
    <Container
      maxWidth={'md'}
      sx={{ backgroundColor: 'skyblue', display: 'flex', justifyContent: 'centre', height: '100%' }}
    >
      <Button variant={'contained'}>Test</Button>
    </Container>
  )
}
