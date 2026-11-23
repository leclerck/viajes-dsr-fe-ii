import { Link } from 'react-router'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'
import PageShell from '../components/templates/PageShell'

export default function Inicio() {
  return (
    <PageShell title="Reserva tu próximo viaje">
      <Text className="mb-6 max-w-xl">
        Elige un destino, fechas, hotel y vuelo. Flujo simple para armar tu
        reserva en pocos pasos.
      </Text>
      <Link to="/destinos">
        <Button>Explorar destinos</Button>
      </Link>
    </PageShell>
  )
}
