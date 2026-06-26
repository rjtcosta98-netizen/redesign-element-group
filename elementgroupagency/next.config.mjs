/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF primeiro (≈30% menor que WebP), com WebP como fallback.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: '*.supabase.co' },   // avatares/imagens do Storage
    ],
  },
}

export default nextConfig
