import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import Button from '@/components/ui/Button'

export default function MidCTA() {
  return (
    <section className="bg-bg py-24 px-6 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-white max-w-3xl mx-auto">
            Who Says a Banking Platform Can&apos;t Blow Mind?
          </h2>
          <p className="mt-6 text-muted max-w-xl mx-auto leading-relaxed">
            We care a lot. And you&apos;ll feel it in everything we do. With Rho, feel seen &amp; taken
            care of across every step of the startup journey (not just your finances).
          </p>
          <div className="mt-10">
            <Button href="/contacto" variant="white">Send Code</Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
