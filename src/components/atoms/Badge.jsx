export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 ${className}`}
    >
      {children}
    </span>
  )
}
