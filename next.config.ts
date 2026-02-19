import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    BFF_PATH: process.env.BFF_PATH
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  rewrites
}

async function rewrites() {
  return [
    {
      source: `${process.env.BFF_PATH}/:path*`,
      destination: `${process.env.API_ROUTE}/:path*`
    }
  ]
}

export default nextConfig
