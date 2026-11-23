export default function Spinner({ label = 'Cargando...' }) {
  return (
    <output className="flex items-center gap-2 text-sm text-slate-600">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-600" />
      <span>{label}</span>
    </output>
  )
}
