// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


import withPWA from 'next-pwa';

const pwa = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default pwa(nextConfig);