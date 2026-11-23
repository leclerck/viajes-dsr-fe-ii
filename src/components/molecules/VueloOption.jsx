import Text from '../atoms/Text'

export default function VueloOption({ vuelo, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vuelo)}
      className={`w-full border px-3 py-3 text-left transition ${
        selected
          ? 'border-emerald-600 bg-emerald-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <Text as="span" variant="subtitle" className="block text-base">
        {vuelo.aerolinea}
      </Text>
      <Text variant="body" className="mt-1">
        {vuelo.horario} · ${vuelo.precio} · {vuelo.asientosDisponibles} asientos
      </Text>
    </button>
  )
}
