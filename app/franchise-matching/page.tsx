"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FranchiseMatching() {
  const router = useRouter()

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "instant" })
    router.push("/franchise-incubating")
  }

  return (
    <div className="relative w-full bg-white pb-20 lg:pb-20">
      {/* Full Page Image Display */}
      <div className="w-full">
        <Image
          src="/franchise-matching-mobile.jpg"
          alt="프랜차이즈 매칭"
          width={768}
          height={5000}
          className="w-full h-auto lg:hidden"
          priority
        />
        <Image
          src="/franchise-matching-full.jpg"
          alt="프랜차이즈 매칭"
          width={1920}
          height={5000}
          className="w-full h-auto hidden lg:block"
          priority
        />
      </div>

      <Link href="/franchise-incubating" className="relative w-full block cursor-pointer" onClick={handleCTAClick}>
        <Image
          src="/incubating-cta-mobile.jpg"
          alt="이미 브랜드가 있으신가요?"
          width={768}
          height={800}
          className="w-full h-auto lg:hidden"
        />
        <Image
          src="/incubating-cta.jpg"
          alt="이미 브랜드가 있으신가요?"
          width={1920}
          height={500}
          className="w-full h-auto hidden lg:block"
        />
      </Link>

      <div className="fixed bottom-0 left-0 right-0 bg-[#16469E] z-50 shadow-2xl">
        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/brickup-logo-wy.png" alt="Brickup" width={120} height={30} className="h-8 w-auto" />
            </div>

            {/* Form Fields */}
            <div className="flex-1 flex items-center gap-3">
              {/* Select Box */}
              <select className="px-4 py-3 rounded bg-white text-[#414141] text-sm min-w-[180px] focus:outline-none focus:ring-2 focus:ring-[#fff200]">
                <option>문의유형 선택</option>
                <option>브랜딩</option>
                <option>DB</option>
                <option>마케팅</option>
                <option>영업 대행</option>
                <option>R&D(메뉴개발)</option>
                <option>기타</option>
              </select>

              {/* Brand Name Input */}
              <input
                type="text"
                placeholder="브랜드명"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Name Input */}
              <input
                type="text"
                placeholder="성함"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Contact Input */}
              <input
                type="tel"
                placeholder="연락처"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Privacy Consent Checkbox */}
              <label className="flex items-center gap-2 text-white text-sm whitespace-nowrap cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                개인정보수집 동의
              </label>

              {/* Submit Button */}
              <button className="px-8 py-3 bg-[#fff200] text-[#16469E] font-bold rounded hover:bg-[#ffed00] transition-colors whitespace-nowrap cursor-pointer">
                ✉ 문의하기
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-3 py-3">
          <div className="flex flex-col gap-2">
            {/* First Row: Select, Name, Contact */}
            <div className="flex gap-1.5">
              <select className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none">
                <option>문의유형 선택</option>
                <option>브랜딩</option>
                <option>DB</option>
                <option>마케팅</option>
                <option>영업 대행</option>
                <option>R&D(메뉴개발)</option>
                <option>기타</option>
              </select>

              <input
                type="text"
                placeholder="성함"
                className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />

              <input
                type="tel"
                placeholder="연락처"
                className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />
            </div>

            {/* Second Row: Checkbox */}
            <div className="flex items-center px-1">
              <label className="flex items-center gap-1.5 text-white text-xs cursor-pointer whitespace-nowrap">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-white flex-shrink-0" />
                개인정보 수집 동의
              </label>
            </div>

            {/* Third Row: Submit Button */}
            <button className="w-full py-2.5 bg-[#fff200] text-black font-bold text-sm rounded hover:bg-[#ffed00] transition-colors cursor-pointer">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
