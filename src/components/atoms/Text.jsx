const variants = {
  title: 'text-2xl font-semibold text-slate-900',
  subtitle: 'text-lg font-medium text-slate-800',
  body: 'text-sm text-slate-600',
  muted: 'text-sm text-slate-500',
  error: 'text-sm text-red-600',
}

export default function Text({
  as: Component = 'p',
  variant = 'body',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`${variants[variant] ?? variants.body} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
