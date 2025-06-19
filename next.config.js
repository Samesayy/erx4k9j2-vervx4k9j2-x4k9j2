/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'placehold.co',
      'keycgpspjcxumapgoxyn.supabase.co',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
