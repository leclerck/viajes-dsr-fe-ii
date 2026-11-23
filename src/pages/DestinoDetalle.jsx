import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getDestinoById } from '../api/rest/destinos'
import { useBooking } from '../context/BookingContext'
import Badge from '../components/atoms/Badge'
import Button from '../components/atoms/Button'
import Spinner from '../components/atoms/Spinner'
import Text from '../components/atoms/Text'
import PageShell from '../components/templates/PageShell'

export default function DestinoDetalle() {
  const { id } = useParams()
  const { setDestino } = useBooking()
  const [localDestino, setLocalDestino] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await getDestinoById(id)
        if (!cancelled) setLocalDestino(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Destino no encontrado')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleReservar = () => {
    if (localDestino) setDestino(localDestino)
  }

  return (
    <PageShell
      title={localDestino ? localDestino.ciudad : 'Detalle'}
      backTo="/destinos"
      backLabel="Destinos"
    >
      {loading ? <Spinner /> : null}
      {error ? <Text variant="error">{error}</Text> : null}
      {localDestino ? (
        <div className="space-y-4">
          <Text variant="body">{localDestino.pais}</Text>
          <div>
            <Text as="h2" variant="subtitle" className="mb-2">
              Actividades populares
            </Text>
            <div className="flex flex-wrap gap-2">
              {localDestino.actividades.map((actividad) => (
                <Badge key={actividad}>{actividad}</Badge>
              ))}
            </div>
          </div>
          <Link to={`/reserva/${localDestino.id}`} onClick={handleReservar}>
            <Button>Ir a reservar</Button>
          </Link>
        </div>
      ) : null}
    </PageShell>
  )
}
