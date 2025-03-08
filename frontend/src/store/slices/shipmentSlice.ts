import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Location {
  lat: number
  lng: number
  address: string
}

interface ShipmentStatus {
  status: 'pending' | 'in_transit' | 'delivered' | 'exception'
  timestamp: string
  location: Location
  description: string
}

interface Shipment {
  id: string
  trackingId: string
  status: ShipmentStatus[]
  estimatedDelivery: string
  origin: Location
  destination: Location
  currentLocation: Location
  customsFees: number
  shippingFees: number
}

interface ShipmentState {
  currentShipment: Shipment | null
  loading: boolean
  error: string | null
}

const initialState: ShipmentState = {
  currentShipment: null,
  loading: false,
  error: null,
}

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    setCurrentShipment: (state, action: PayloadAction<Shipment>) => {
      state.currentShipment = action.payload
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.currentShipment = null
    },
    clearShipment: (state) => {
      state.currentShipment = null
      state.error = null
    },
  },
})

export const { setCurrentShipment, setLoading, setError, clearShipment } =
  shipmentSlice.actions
export default shipmentSlice.reducer
