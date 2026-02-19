import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/rutube-proxy/")) {
    const path = request.nextUrl.pathname.replace("/rutube-proxy/", "")
    const url = `https://rutube.ru/api/${path}${request.nextUrl.search}`

    // console.log(`[Middleware] Proxying: ${request.nextUrl.pathname} -> ${url}`)

    const response = await fetch(url, {
      method: request.method,
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()

    // console.log(`[Middleware] Response status: ${response.status}`)
    // console.log(`[Middleware] Response data:`, data)

    return NextResponse.json(data, { status: response.status })
  }
}

export const config = {
  matcher: "/rutube-proxy/:path*"
}
