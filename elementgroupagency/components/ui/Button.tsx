import Link from 'next/link'

type ButtonProps = {
  href?: string
  variant?: 'primary' | 'secondary' | 'white'
  children: React.ReactNode
  className?: string
}

export default function Button({ href, variant = 'primary', children, className = '' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center text-xs font-body transition-all duration-300'

  const variants = {
    primary: `bg-bg-card text-link rounded-pill-sm px-6 py-3 hover:opacity-80`,
    secondary: `bg-btn-light text-black rounded-pill px-[29px] py-[15px]
                shadow-send-code hover:-translate-y-px active:translate-y-0`,
    white: `bg-white text-black rounded-pill px-7 py-3.5 font-medium
            shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-white/90 hover:-translate-y-px`,
  }

  const cls = `${base} ${variants[variant]} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls}>{children}</button>
}
