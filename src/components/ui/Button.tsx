import type { ComponentType, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

/** Aceita ícones do Lucide e os ícones de marca do projeto. */
type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: 'true' }>

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  icon?: IconComponent
  iconPosition?: 'left' | 'right'
  /** Rota interna (usa o roteador). */
  to?: string
  /** Endereço externo, mailto ou arquivo. */
  href?: string
  /** Nome do arquivo, para links de download. */
  download?: string
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  to,
  href,
  download,
  onClick,
  className = '',
}: ButtonProps) {
  const classes = `btn btn-${variant} ${className}`
  const iconElement = Icon ? <Icon aria-hidden="true" className="size-4 shrink-0" /> : null
  const content = (
    <>
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        download={download}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  )
}
