"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FranchiseMatching() {
  const router = useRouter()
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false)

  const handleFormSubmit = async (formData: {
    formType: "top" | "bottom"
    name: string
    phone: string
    company: string
    brand: string
    message: string
  }) => {
    try {
      const response = await fetch("/proxy.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      alert("문의가 정상적으로 접수되었습니다!")
      return true
    } catch (error) {
      console.error("Form submission error:", error)
      alert("문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.")
      return false
    }
  }

  const validateForm = (formData: FormData): string | null => {
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const brand = formData.get("brand") as string
    const consent = formData.get("consent") as string

    if (!brand || brand.trim() === "") {
      return "브랜드명을 입력해주세요."
    }
    if (!company || company.trim() === "") {
      return "회사명을 입력해주세요."
    }
    if (!name || name.trim() === "") {
      return "성함을 입력해주세요."
    }
    if (!phone || phone.trim() === "") {
      return "연락처를 입력해주세요."
    }
    if (!consent) {
      return "개인정보 수집 및 이용에 동의해주세요."
    }

    return null
  }

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
          <form
            className="flex items-center gap-4"
            onSubmit={async (e) => {
              e.preventDefault()

              const form = e.currentTarget
              const formData = new FormData(form)

              const validationError = validateForm(formData)
              if (validationError) {
                alert(validationError)
                return
              }

              setIsSubmittingBottom(true)

              const data = {
                formType: "bottom" as const,
                name: formData.get("name") as string,
                phone: formData.get("phone") as string,
                company: formData.get("company") as string,
                brand: formData.get("brand") as string,
                message: "하단 문의 바를 통한 문의",
              }

              const success = await handleFormSubmit(data)
              if (success && form) {
                form.reset()
              }
              setIsSubmittingBottom(false)
            }}
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/brickup-logo-wy.png" alt="Brickup" width={120} height={30} className="h-8 w-auto" />
            </div>

            {/* Form Fields */}
            <div className="flex-1 flex items-center gap-3">
              {/* Brand Name Input */}
              <input
                type="text"
                name="brand"
                placeholder="브랜드명"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Company Input */}
              <input
                type="text"
                name="company"
                placeholder="회사명"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Name Input */}
              <input
                type="text"
                name="name"
                placeholder="성함"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Contact Input */}
              <input
                type="tel"
                name="phone"
                placeholder="연락처"
                className="px-4 py-3 rounded bg-white text-[#414141] text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Privacy Consent Checkbox */}
              <label className="flex items-center gap-2 text-white text-sm whitespace-nowrap cursor-pointer">
                <input type="checkbox" name="consent" className="w-4 h-4 rounded" />
                개인정보수집 동의
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingBottom}
                className="px-8 py-3 bg-[#fff200] text-[#16469E] font-bold rounded hover:bg-[#ffed00] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingBottom ? "전송 중..." : "✉ 문의하기"}
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-3 py-3">
          <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault()

              const form = e.currentTarget
              const formData = new FormData(form)

              const validationError = validateForm(formData)
              if (validationError) {
                alert(validationError)
                return
              }

              setIsSubmittingBottom(true)

              const data = {
                formType: "bottom" as const,
                name: formData.get("name") as string,
                phone: formData.get("phone") as string,
                company: formData.get("company") as string,
                brand: formData.get("brand") as string,
                message: "하단 문의 바를 통한 문의 (모바일)",
              }

              const success = await handleFormSubmit(data)
              if (success && form) {
                form.reset()
              }
              setIsSubmittingBottom(false)
            }}
          >
            {/* First Row: Brand and Company */}
            <div className="flex gap-1.5">
              <input
                type="text"
                name="brand"
                placeholder="브랜드명"
                className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />

              <input
                type="text"
                name="company"
                placeholder="회사명"
                className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />
            </div>

            {/* Second Row: Name and Contact */}
            <div className="flex gap-1.5">
              <input
                type="text"
                name="name"
                placeholder="성함"
                className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="연락처"
                className="px-2 py-2 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />
            </div>

            {/* Third Row: Checkbox */}
            <div className="flex items-center px-1">
              <label className="flex items-center gap-1.5 text-white text-xs cursor-pointer whitespace-nowrap">
                <input type="checkbox" name="consent" className="w-3.5 h-3.5 rounded border-white flex-shrink-0" />
                개인정보 수집 동의
              </label>
            </div>

            {/* Fourth Row: Submit Button */}
            <button
              type="submit"
              disabled={isSubmittingBottom}
              className="w-full py-2.5 bg-[#fff200] text-black font-bold text-sm rounded hover:bg-[#ffed00] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingBottom ? "전송 중..." : "문의하기"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
