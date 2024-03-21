/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // remotePatterns: ['flagsapi.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
        port: '',
        // pathname: '/flat/64.png',
      },
    ],
  }
};

export default nextConfig;
