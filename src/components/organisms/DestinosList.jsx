import DestinoCard from '../molecules/DestinoCard'
import Text from '../atoms/Text'

export default function DestinosList({ destinos }) {
  if (!destinos.length) {
    return <Text variant="muted">No hay destinos disponibles.</Text>
  }

  return (
    <div className="divide-y divide-slate-200 border-t border-slate-200">
      {destinos.map((destino) => (
        <DestinoCard key={destino.id} destino={destino} />
      ))}
    </div>
  )
}
