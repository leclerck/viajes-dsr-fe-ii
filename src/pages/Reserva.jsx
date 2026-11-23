import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getDestinoById } from '../api/rest/destinos'
import { useBooking } from '../context/BookingContext'
import Spinner from '../components/atoms/Spinner'
import Text from '../components/atoms/Text'
import ReservaForm from '../components/organisms/ReservaForm'
import PageShell from '../components/templates/PageShell'

export default function Reserva() {
  const { destinoId } = useParams()
  const navigate = useNavigate()
  const { destino, setDestino } = useBooking()
  const [loading, setLoading] = useState(destino?.id !== destinoId)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (destino?.id === destinoId) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await getDestinoById(destinoId)
        if (!cancelled) setDestino(data)
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
  }, [destinoId, destino?.id, setDestino])

  const handleBook = () => {
    navigate('/exito')
  }

  return (
    <PageShell
      title={destino ? `Reserva · ${destino.ciudad}` : 'Reserva'}
      backTo={destino ? `/destinos/${destino.id}` : '/destinos'}
      backLabel="Volver al destino"
    >
      {loading ? <Spinner /> : null}
      {error ? <Text variant="error">{error}</Text> : null}
      {!loading && !error && destino ? <ReservaForm onBook={handleBook} /> : null}
    </PageShell>
  )
}
