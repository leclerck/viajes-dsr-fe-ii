import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

const BookingContext = createContext(null)

const initialState = {
  destino: null,
  checkIn: '',
  checkOut: '',
  hotel: null,
  vuelo: null,
}

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_DESTINO':
      return {
        ...initialState,
        destino: action.payload,
      }
    case 'SET_FECHAS':
      return {
        ...state,
        checkIn: action.payload.checkIn,
        checkOut: action.payload.checkOut,
        hotel: null,
        vuelo: null,
      }
    case 'SET_HOTEL':
      return { ...state, hotel: action.payload }
    case 'SET_VUELO':
      return { ...state, vuelo: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const setDestino = useCallback(
    (destino) => dispatch({ type: 'SET_DESTINO', payload: destino }),
    [],
  )
  const setFechas = useCallback(
    (checkIn, checkOut) =>
      dispatch({ type: 'SET_FECHAS', payload: { checkIn, checkOut } }),
    [],
  )
  const setHotel = useCallback(
    (hotel) => dispatch({ type: 'SET_HOTEL', payload: hotel }),
    [],
  )
  const setVuelo = useCallback(
    (vuelo) => dispatch({ type: 'SET_VUELO', payload: vuelo }),
    [],
  )
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  const value = useMemo(
    () => ({
      ...state,
      setDestino,
      setFechas,
      setHotel,
      setVuelo,
      reset,
      canBook:
        Boolean(state.destino) &&
        Boolean(state.checkIn) &&
        Boolean(state.checkOut) &&
        state.checkOut > state.checkIn &&
        Boolean(state.hotel) &&
        Boolean(state.vuelo),
    }),
    [state, setDestino, setFechas, setHotel, setVuelo, reset],
  )

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking debe usarse dentro de BookingProvider')
  }
  return context
}
