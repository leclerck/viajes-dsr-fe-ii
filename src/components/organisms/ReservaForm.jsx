import { useQuery } from '@apollo/client/react'
import { DISPONIBILIDAD } from '../../api/graphql/queries'
import { useBooking } from '../../context/BookingContext'
import Button from '../atoms/Button'
import Spinner from '../atoms/Spinner'
import Text from '../atoms/Text'
import DateRangeFields from '../molecules/DateRangeFields'
import HotelOption from '../molecules/HotelOption'
import VueloOption from '../molecules/VueloOption'

export default function ReservaForm({ onBook }) {
  const {
    destino,
    checkIn,
    checkOut,
    hotel,
    vuelo,
    setFechas,
    setHotel,
    setVuelo,
    canBook,
  } = useBooking()

  const datesValid = Boolean(checkIn && checkOut && checkOut > checkIn)
  const dateError =
    checkIn && checkOut && checkOut <= checkIn
      ? 'El check-out debe ser posterior al check-in.'
      : null

  const { data, loading, error } = useQuery(DISPONIBILIDAD, {
    variables: {
      destinoId: destino?.id,
      checkIn,
      checkOut,
    },
    skip: !destino?.id || !datesValid,
  })

  const handleCheckIn = (value) => setFechas(value, checkOut)
  const handleCheckOut = (value) => setFechas(checkIn, value)

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <Text as="h2" variant="subtitle">
          Fechas
        </Text>
        <DateRangeFields
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={handleCheckIn}
          onCheckOutChange={handleCheckOut}
          error={dateError}
        />
      </section>

      {!datesValid && !dateError ? (
        <Text variant="muted">
          Elige las fechas de check-in y check-out para ver hoteles y vuelos.
        </Text>
      ) : null}

      {datesValid && loading ? <Spinner label="Buscando disponibilidad..." /> : null}

      {datesValid && error ? (
        <Text variant="error">No se pudo cargar la disponibilidad.</Text>
      ) : null}

      {datesValid && data ? (
        <>
          <section className="space-y-3">
            <Text as="h2" variant="subtitle">
              Hoteles
            </Text>
            {data.hoteles?.length ? (
              <div className="space-y-2">
                {data.hoteles.map((item) => (
                  <HotelOption
                    key={item.id}
                    hotel={item}
                    selected={hotel?.id === item.id}
                    onSelect={setHotel}
                  />
                ))}
              </div>
            ) : (
              <Text variant="muted">No hay hoteles para esas fechas.</Text>
            )}
          </section>

          <section className="space-y-3">
            <Text as="h2" variant="subtitle">
              Vuelos
            </Text>
            {data.vuelos?.length ? (
              <div className="space-y-2">
                {data.vuelos.map((item) => (
                  <VueloOption
                    key={item.id}
                    vuelo={item}
                    selected={vuelo?.id === item.id}
                    onSelect={setVuelo}
                  />
                ))}
              </div>
            ) : (
              <Text variant="muted">No hay vuelos para esas fechas.</Text>
            )}
          </section>
        </>
      ) : null}

      <Button disabled={!canBook} onClick={onBook} className="w-full sm:w-auto">
        Reservar
      </Button>
    </div>
  )
}
