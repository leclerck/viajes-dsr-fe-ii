import Text from '../atoms/Text'

export default function BookingSummary({ booking }) {
  const { destino, checkIn, checkOut, hotel, vuelo } = booking

  return (
    <div className="space-y-4 border border-slate-200 bg-white p-4">
      <div>
        <Text variant="muted">Destino</Text>
        <Text variant="subtitle">
          {destino?.ciudad}, {destino?.pais}
        </Text>
      </div>
      <div>
        <Text variant="muted">Fechas</Text>
        <Text variant="body">
          {checkIn} → {checkOut}
        </Text>
      </div>
      <div>
        <Text variant="muted">Hotel</Text>
        <Text variant="body">
          {hotel?.nombre} · ${hotel?.precio} / noche
        </Text>
      </div>
      <div>
        <Text variant="muted">Vuelo</Text>
        <Text variant="body">
          {vuelo?.aerolinea} · {vuelo?.horario} · ${vuelo?.precio}
        </Text>
      </div>
    </div>
  )
}
