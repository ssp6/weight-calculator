import React from 'react'
import { Provider } from 'react-redux'

import { WeightCalc } from './Pages/WeightCalc'
import { store } from './store/store'

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <WeightCalc />
      </Provider>
    </React.StrictMode>
  )
}

export default App
