// On-brand cover art (no stock photos): steel-blue gradient + dot texture + ghost category.
const TINT: Record<string, string> = {
  SEO: 'from-accent/30 to-[#2f4f7a]/10',
  Websites: 'from-[#7FA8D9]/30 to-[#1c2738]/10',
  'Social Media': 'from-[#9ec3ea]/30 to-[#4f7fb8]/10',
  Negócio: 'from-[#6f93c4]/30 to-[#0f1318]/10',
}

export default function CoverArt({ category, className = '' }: { category: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#101216] ${className}`} aria-hidden>
      <div className={`absolute inset-0 bg-gradient-to-br ${TINT[category] ?? TINT['Negócio']}`} />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />
      <span className="absolute bottom-3 right-4 font-heading font-semibold text-white/10 text-2xl md:text-3xl tracking-tight">
        {category}
      </span>
    </div>
  )
}
