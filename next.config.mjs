/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "gilshduccaooacxohhud.supabase.co" },
    ],
  },
};

export default nextConfig;
