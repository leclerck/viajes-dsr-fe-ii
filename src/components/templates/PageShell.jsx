import { Link } from 'react-router'
import Text from '../atoms/Text'

export default function PageShell({ title, children, backTo, backLabel }) {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-6">
      <header className="mb-6 space-y-2">
        <Link to="/" className="text-sm font-medium text-emerald-700 hover:underline">
          Agencia de Viajes
        </Link>
        {title ? (
          <Text as="h1" variant="title">
            {title}
          </Text>
        ) : null}
        {backTo ? (
          <Link to={backTo} className="inline-block text-sm text-slate-600 hover:underline">
            ← {backLabel || 'Volver'}
          </Link>
        ) : null}
      </header>
      <main>{children}</main>
    </div>
  )
}
