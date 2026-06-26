import { ImageResponse } from 'next/og'

export const alt = 'Element Group — Websites & Marketing Digital para PMEs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// OG image de marca (dark steel + acento sapphire). Apenas construções suportadas
// pelo Satori/@vercel/og: um único linear-gradient opaco + elementos sólidos.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #1a2230 0%, #0E0E0E 55%, #0b0d11 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              transform: 'rotate(45deg)',
              background: 'linear-gradient(135deg, #bcd6f0, #7FA8D9 55%, #2f4f7a)',
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>Element Group</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: 90, height: 5, background: '#7FA8D9', marginBottom: 30 }} />
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            Websites & Marketing Digital para PMEs em Portugal
          </div>
          <div style={{ fontSize: 30, color: '#ACACB9', maxWidth: 920, marginTop: 26 }}>
            Sites à medida, lojas online, SEO e redes sociais — rápidos e a um preço justo.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 26, fontSize: 25, color: '#7FA8D9' }}>
          <span>PageSpeed 95+</span>
          <span style={{ color: '#606165' }}>·</span>
          <span>Top 3 Google Maps</span>
          <span style={{ color: '#606165' }}>·</span>
          <span>5,0 no Google</span>
        </div>
      </div>
    ),
    size,
  )
}
