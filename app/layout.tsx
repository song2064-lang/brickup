import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
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
    description: "브랜드 성장을 현실로 만드는 프랜차이즈 전문 파트너, 브릭업",
    keywords: [
        "브릭업",
        "프랜차이즈",
        "창업",
        "브랜드 컨설팅",
        "인큐베이팅",
        "매칭",
        "프랜차이즈 본사",
    ],
    metadataBase: new URL("https://brickup.co.kr"), // ✅ 기준 도메인
    alternates: {
        canonical: "https://brickup.co.kr", // ✅ 대표 URL
    },
    openGraph: {
        title: "Brickup - 프랜차이즈 전문 파트너",
        description:
            "브랜드 성장을 현실로 만드는 프랜차이즈 전문 파트너, 브릭업",
        url: "https://brickup.co.kr",
        siteName: "브릭업 Brickup",
        images: [
            {
                url: "https://brickup.co.kr/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "브릭업 - 프랜차이즈 전문 파트너",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
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
            {/* Pretendard font */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            />

            {/* ✅ 표준 URL (canonical) - 중복 방지 */}
            <link rel="canonical" href="https://brickup.co.kr" />

            {/* ✅ Open Graph URL (for SNS/네이버/카카오 미리보기) */}
            <meta property="og:url" content="https://brickup.co.kr" />
            <meta property="og:site_name" content="브릭업 Brickup" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ko_KR" />

            {/* ✅ 네이버 사이트 소유 확인 (등록 후 코드 제공 시 여기에 추가) */}
            {/* <meta name="naver-site-verification" content="여기에_코드_입력" /> */}

            {/* ✅ Google Tag Manager */}
            <Script id="gtm-script" strategy="afterInteractive">
                {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TG93SKR2');
          `}
            </Script>

            {/* ✅ Google Analytics (GA4) */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-Q9SKNHERQX"
                strategy="afterInteractive"
            />
            <Script id="ga4-script" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q9SKNHERQX');
          `}
            </Script>
        </head>

        <body
            className={`${geist.variable} ${geistMono.variable} antialiased m-0 p-0`}
            style={{
                fontFamily:
                    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
            }}
        >
        {/* ✅ GTM noscript (반드시 body 안에 위치) */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-TG93SKR2"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            ></iframe>
        </noscript>

        {children}
        </body>
        </html>
    )
}
