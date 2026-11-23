import { gql } from '@apollo/client'

export const DISPONIBILIDAD = gql`
  query Disponibilidad($destinoId: ID!, $checkIn: String!, $checkOut: String!) {
    hoteles(destinoId: $destinoId, checkIn: $checkIn, checkOut: $checkOut) {
      id
      nombre
      precio
      habitacionesDisponibles
    }
    vuelos(destinoId: $destinoId, checkIn: $checkIn, checkOut: $checkOut) {
      id
      aerolinea
      precio
      horario
      asientosDisponibles
    }
  }
`
