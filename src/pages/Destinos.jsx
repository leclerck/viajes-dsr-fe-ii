import { useEffect, useState } from 'react'
import { getDestinos } from '../api/rest/destinos'
import Spinner from '../components/atoms/Spinner'
import Text from '../components/atoms/Text'
import DestinosList from '../components/organisms/DestinosList'
import PageShell from '../components/templates/PageShell'

export default function Destinos() {
  const [destinos, setDestinos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await getDestinos()
        if (!cancelled) setDestinos(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Error al cargar destinos')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <PageShell title="Destinos" backTo="/" backLabel="Inicio">
      {loading ? <Spinner /> : null}
      {error ? <Text variant="error">{error}</Text> : null}
      {!loading && !error ? <DestinosList destinos={destinos} /> : null}
    </PageShell>
  )
}
