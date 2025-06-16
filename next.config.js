/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'placehold.co',
      'keycgpspjcxumapgoxyn.supabase.co',
      'images.unsplash.com',
      'example.com', // ✅ Added this as per your request
    ],
  },
};

module.exports = nextConfig;
