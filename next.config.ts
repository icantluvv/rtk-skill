import type { NextConfig } from "next"

const images: NextConfig["images"] = {
  remotePatterns: [
    {
      protocol: "https" as const,
      hostname: "pic.rtbcdn.ru"
    }
  ]
}

async function rewrites() {
  return []
}

const nextConfig: NextConfig = {
  env: {
    RUTUBE_BFF_PATH: process.env.RUTUBE_BFF_PATH,
    BFF_PATH: process.env.BFF_PATH,
    RUTUBE_API_ROUTE: process.env.RUTUBE_API_ROUTE
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  allowedDevOrigins: ["rutube.ru"],
  images,
  rewrites
}

export default nextConfig
