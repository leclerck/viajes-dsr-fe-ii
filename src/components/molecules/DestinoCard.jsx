import { Link } from 'react-router'
import Badge from '../atoms/Badge'
import Text from '../atoms/Text'

export default function DestinoCard({ destino }) {
  return (
    <Link
      to={`/destinos/${destino.id}`}
      className="block border-b border-slate-200 py-4 hover:bg-slate-50"
    >
      <Text as="h2" variant="subtitle" className="mb-1">
        {destino.ciudad}
      </Text>
      <Text variant="muted" className="mb-2">
        {destino.pais}
      </Text>
      <div className="flex flex-wrap gap-1.5">
        {destino.actividades.slice(0, 3).map((actividad) => (
          <Badge key={actividad}>{actividad}</Badge>
        ))}
      </div>
    </Link>
  )
}
