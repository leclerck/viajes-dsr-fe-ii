import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useBooking } from '../context/BookingContext'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'
import BookingSummary from '../components/organisms/BookingSummary'
import PageShell from '../components/templates/PageShell'

export default function Exito() {
  const booking = useBooking()
  const [summary] = useState(() => ({
    destino: booking.destino,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    hotel: booking.hotel,
    vuelo: booking.vuelo,
  }))

  const { reset } = booking

  useEffect(() => {
    reset()
  }, [reset])

  const hasSummary =
    summary.destino && summary.hotel && summary.vuelo && summary.checkIn && summary.checkOut

  return (
    <PageShell title="¡Reserva confirmada!">
      {hasSummary ? (
        <div className="space-y-6">
          <Text>
            Tu viaje a {summary.destino.ciudad} quedó reservado. Revisa el
            resumen de tu reserva:
          </Text>
          <BookingSummary booking={summary} />
          <Link to="/destinos">
            <Button variant="secondary">Ver más destinos</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <Text variant="muted">
            No hay una reserva reciente para mostrar.
          </Text>
          <Link to="/destinos">
            <Button>Ir a destinos</Button>
          </Link>
        </div>
      )}
    </PageShell>
  )
}
