import { Link } from 'react-router'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'
import PageShell from '../components/templates/PageShell'

export default function NoEncontrado() {
  return (
    <PageShell title="Página no encontrada">
      <Text className="mb-4">Lo que buscas no existe.</Text>
      <Link to="/">
        <Button>Volver al inicio</Button>
      </Link>
    </PageShell>
  )
}
