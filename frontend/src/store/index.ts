import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import shipmentReducer from './slices/shipmentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipment: shipmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setCredentials'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'shipment.currentShipment'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
