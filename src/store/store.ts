import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import {
  createMigrate,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { PersistedState } from 'redux-persist/es/types'
import storage from 'redux-persist/lib/storage'

import { weightCalcReducer } from '../domain/Weights/redux'

const rootReducer = combineReducers({
  weights: weightCalcReducer,
})

const persistConfig = {
  version: 0,
  key: 'root',
  storage,
  /**
   * Used to ensure old versions of state are migrated correctly
   */
  migrate: createMigrate(
    {
      /**
       * If app is version 0, do not want to rehydrate state if it is any other
       */
      0: (state: PersistedState) => {
        if (state?._persist.version !== 0) {
          return {
            _persist: {
              version: 0,
              rehydrated: false,
            },
          }
        }

        return state
      },
    },
    { debug: false },
  ),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { persistor, store }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
