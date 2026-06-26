import Link from 'next/link'

type GlowButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
  newTab?: boolean
}

// Steel-blue "Nova" glow button: rotating conic-gradient border + halo + hover shine.
// Visual styling lives in globals.css under the .nova-btn* classes.
export default function GlowButton({ href, children, className = '', newTab }: GlowButtonProps) {
  const external = href.startsWith('http')
  return (
    <Link
      href={href}
      className={`nova-btn font-body ${className}`}
      {...(newTab || external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span aria-hidden className="nova-btn__glow" />
      <span aria-hidden className="nova-btn__ring" />
      <span aria-hidden className="nova-btn__shine" />
      <span className="nova-btn__label">{children}</span>
    </Link>
  )
}
