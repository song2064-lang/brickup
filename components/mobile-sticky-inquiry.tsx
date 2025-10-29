"use client"

import type React from "react"
import { useState, useEffect } from "react" // ✅ useEffect 임포트 추가

interface MobileStickyInquiryProps {
  variant: "incubating" | "matching"
}

export function MobileStickyInquiry({ variant }: MobileStickyInquiryProps) {
  const [formData, setFormData] = useState({
    type: "",
    company: "", // Changed from name to company
    phone: "",
  })
  const [agreed, setAgreed] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // ✅ 여기 useEffect 추가
  useEffect(() => {
    const el = document.querySelector(".mobile-sticky-inquiry")
    if (!el) return

    const updateHeight = () => {
      const h = el.getBoundingClientRect().height
      document.documentElement.style.setProperty("--mobile-sticky-height", `${h}px`)
    }

    updateHeight()
    const ro = new ResizeObserver(updateHeight)
    ro.observe(el)
    window.addEventListener("resize", updateHeight)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateHeight)
    }
  }, [])
  const inquiryOptions =
    variant === "incubating"
      ? ["브랜딩", "DB마케팅", "영업대행", "R&D(메뉴개발)", "기타"]
      : ["프랜차이즈 창업", "양도양수", "점포매매", "R&D(메뉴개발)", "마케팅"]

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d-]/g, "")
    setFormData({ ...formData, phone: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.")
      return
    }

    if (!formData.type || !formData.company || !formData.phone) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    if (!/^[\d-]+$/.test(formData.phone)) {
      alert("연락처는 숫자와 하이픈만 입력 가능합니다.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/proxy.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: variant,
          platform: "mobile",
          position: "footer",
          type: formData.type,
          company: formData.company, // Using company field
          phone: formData.phone,
        }),
      })

      if (response.ok) {
        alert("문의가 정상적으로 접수되었습니다!")
        setFormData({ type: "", company: "", phone: "" })
        setAgreed(false)
      } else {
        alert("문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.")
      }
    } catch (error) {
      alert("문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Mobile Sticky Inquiry Bar */}
      <div
        className="mobile-sticky-inquiry fixed bottom-0 left-0 right-0 z-50 bg-[#16469E] border-t border-white/20 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-[1440px] mx-auto px-4 py-3">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Row 1: 3-column grid */}
            <div className="grid grid-cols-3 gap-2">
              {/* Select */}
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 pr-8 text-sm bg-white text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontSize: "13px" }}
                >
                  <option value="">문의유형 선택</option>
                  {inquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▾</div>
              </div>

              {/* Company Input */}
              <input
                type="text"
                placeholder="성함"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="h-10 px-3 text-sm bg-white text-gray-700 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-white/50"
                style={{ fontSize: "13px" }}
              />

              {/* Phone Input */}
              <input
                type="tel"
                placeholder="연락처"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="h-10 px-3 text-sm bg-white text-gray-700 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-white/50"
                style={{ fontSize: "13px" }}
              />
            </div>

            {/* Row 2: Consent checkbox */}
            <div className="flex items-center justify-end gap-2">
              <input
                type="checkbox"
                id="mobile-consent"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#16469E] focus:ring-white/50"
              />
              <label
                htmlFor="mobile-consent"
                className="text-white text-sm cursor-pointer"
                style={{ fontSize: "13px" }}
              >
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="underline hover:text-white/90"
                >
                  개인정보 수집 동의
                </button>
              </label>
            </div>

            {/* Row 3: Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#FFF200] text-black font-extrabold rounded-lg transition-opacity disabled:opacity-50"
              style={{ fontSize: "16px" }}
            >
              {isSubmitting ? "전송중..." : "문의하기"}
            </button>
          </form>
        </div>
      </div>

      {/* Privacy Modal (Bottom Sheet) */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setShowPrivacyModal(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">개인정보 수집 및 이용 동의</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="px-4 py-6 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>브릭업은 고객님의 문의 및 상담을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>
              <div>
                <p className="font-semibold mb-1">1. 수집 항목</p>
                <p>성함, 연락처, 문의유형</p>
              </div>
              <div>
                <p className="font-semibold mb-1">2. 이용 목적</p>
                <p>고객 문의 접수 및 상담, 서비스 안내, 문의 내용에 대한 답변 제공</p>
              </div>
              <div>
                <p className="font-semibold mb-1">3. 보유 및 이용 기간</p>
                <p>문의 처리 완료 후 1년간 보관하며, 이후 관련 법령에 따라 안전하게 파기됩니다.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">4. 동의 거부 권리</p>
                <p>
                  고객님께서는 개인정보 수집 및 이용에 대한 동의를 거부하실 수 있으며, 이 경우 문의 접수가 제한될 수
                  있습니다.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-4">위 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
