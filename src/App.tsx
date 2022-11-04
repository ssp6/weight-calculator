import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { WeightCalc } from './pages/WeightCalc'
import { persistor, store } from './store/store'

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WeightCalc />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

export default App
