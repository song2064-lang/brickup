import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Brickup - 프랜차이즈 전문 파트너",
  description: "브랜드 성장을 현실로 만드는 프랜차이즈 전문 파트너",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="m-0 p-0">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased m-0 p-0`}
        style={{ fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
