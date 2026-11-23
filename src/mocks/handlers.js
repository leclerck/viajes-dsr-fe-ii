import { http, HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'
import { destinos } from './data/destinos'
import { hoteles } from './data/hoteles'
import { vuelos } from './data/vuelos'

const base = import.meta.env.BASE_URL
const api = graphql.link(`${base}graphql`)

function disponibilidadPorFecha(lista, checkIn, checkOut) {
  if (!checkIn || !checkOut || checkOut <= checkIn) {
    return []
  }

  // Variación simple según el día de check-in para demo
  const day = Number(checkIn.slice(-2)) || 1
  return lista.map((item, index) => {
    if ('habitacionesDisponibles' in item) {
      const habitacionesDisponibles = Math.max(
        1,
        item.habitacionesDisponibles - ((day + index) % 3),
      )
      return { ...item, habitacionesDisponibles }
    }
    const asientosDisponibles = Math.max(
      1,
      item.asientosDisponibles - ((day + index) % 5),
    )
    return { ...item, asientosDisponibles }
  })
}

export const handlers = [
  http.get(`${base}api/destinos`, () => {
    return HttpResponse.json(destinos)
  }),

  http.get(`${base}api/destinos/:id`, ({ params }) => {
    const destino = destinos.find((d) => d.id === params.id)
    if (!destino) {
      return HttpResponse.json(
        { message: 'Destino no encontrado' },
        { status: 404 },
      )
    }
    return HttpResponse.json(destino)
  }),

  api.query('Disponibilidad', ({ variables }) => {
    const { destinoId, checkIn, checkOut } = variables
    const hotelesDestino = hoteles.filter((h) => h.destinoId === destinoId)
    const vuelosDestino = vuelos.filter((v) => v.destinoId === destinoId)

    return HttpResponse.json({
      data: {
        hoteles: disponibilidadPorFecha(hotelesDestino, checkIn, checkOut).map(
          ({ id, nombre, precio, habitacionesDisponibles }) => ({
            id,
            nombre,
            precio,
            habitacionesDisponibles,
          }),
        ),
        vuelos: disponibilidadPorFecha(vuelosDestino, checkIn, checkOut).map(
          ({ id, aerolinea, precio, horario, asientosDisponibles }) => ({
            id,
            aerolinea,
            precio,
            horario,
            asientosDisponibles,
          }),
        ),
      },
    })
  }),
]
