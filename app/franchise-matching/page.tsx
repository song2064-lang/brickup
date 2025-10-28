"use client"

import type React from "react"
import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
// import { FooterSection } from "@/components/footer-section" // Commented out as it's being replaced

// ProcessSection component from page2-kMwG0.tsx
function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLSpanElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const [lineLeft, setLineLeft] = useState(0)
  const [lineTop, setLineTop] = useState(0)
  const [lineHeight, setLineHeight] = useState(0)

  // 스크롤 진행률 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"], // 섹션 진입부터 끝날 때까지
  })

  // 스크롤 비율(0~1)에 따라 실제 높이 보간
  const rawHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight])

  // ★ 스무딩 처리 (천천히 따라오는 효과)
  const smoothHeight = useSpring(rawHeight, {
    stiffness: 40, // 낮을수록 부드러움
    damping: 20, // 낮을수록 천천히 따라감
  })

  // 라인 위치 계산 ("다"의 ㅏ 기준)
  const measure = () => {
    if (!containerRef.current || !anchorRef.current || !stepsRef.current) return
    const c = containerRef.current.getBoundingClientRect()
    const a = anchorRef.current.getBoundingClientRect()
    const s = stepsRef.current.getBoundingClientRect()

    const centerX = a.left + a.width / 2
    setLineLeft(centerX - c.left)
    setLineTop(a.bottom - c.top - 8)
    setLineHeight(s.height)
  }

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    if (containerRef.current) ro.observe(containerRef.current)
    if (stepsRef.current) ro.observe(stepsRef.current)
    if (titleRef.current) ro.observe(titleRef.current)
    window.addEventListener("resize", measure)
    window.addEventListener("load", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
      window.removeEventListener("load", measure)
    }
  }, [])

  const steps = [
    { title: "상담", desc: "창업자의 예산·목표·성향을 듣는 것부터 시작합니다.", eng: "Consulting" },
    { title: "브랜드 매칭", desc: "수백 개 프랜차이즈 중에서 조건에 맞는 브랜드를 선별합니다.", eng: "Matching" },
    {
      title: "상권 & 입지 분석",
      desc: "본사 추천 입지를 데이터로 검증해, 성공 가능성이 높은 자리를 찾습니다.",
      eng: "Analysis",
    },
    {
      title: "계약 & 준비",
      desc: "가맹 계약서를 함께 검토하고, 인테리어·가자재·교육을 준비합니다.",
      eng: "Agreement",
    },
    { title: "매장 오픈", desc: "초기 홍보와 오픈 이벤트까지 함께 진행해 안정적인 출발을 돕습니다.", eng: "Opening" },
    { title: "사후 관리", desc: "오픈 후에도 매출 관리, 운영 컨설팅을 꾸준히 이어갑니다.", eng: "Follow-up" },
  ]

  return (
    <section className="relative bg-[#16469E] text-white py-28 lg:py-36 overflow-visible">
      <div ref={containerRef} className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* 왼쪽 타이틀 */}
          <div ref={titleRef} className="w-full lg:w-[50%] relative mb-10 lg:mb-0">
            <h2 className="text-[30px] lg:text-[34px] font-semibold leading-tight mb-2">막막한 창업,</h2>
            <h2 className="text-[40px] lg:text-[46px] font-normal leading-tight relative inline-block">
              <span className="font-semibold">브릭업이</span>{" "}
              <span className="bg-white text-[#16469E] px-2 py-0.5 font-semibold">끝까지 함께</span> 합니
              <span ref={anchorRef} className="inline-block align-baseline">
                다
              </span>
            </h2>
          </div>

          {/* 오른쪽 프로세스 */}
          <div ref={stepsRef} className="w-full lg:w-[50%] relative mt-[160px]">
            <div className="flex flex-col gap-10 text-left">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative flex items-start justify-between w-full"
                >
                  <div className="w-[70%] flex flex-col translate-x-[-8px] lg:translate-x-[-12px]">
                    <p className="text-[19px] lg:text-[20px] font-bold mb-1 whitespace-nowrap">{s.title}</p>
                    <p className="text-[14px] lg:text-[15px] text-white/85 whitespace-nowrap leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="w-[30%] text-right mt-[10px] lg:mt-[14px]">
                    <p className="text-[28px] lg:text-[30px] font-extrabold text-white/25 leading-none">{s.eng}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute z-20 origin-top pointer-events-none"
          style={{
            left: `${lineLeft - 10}px`, // Moved 1px more to the left (from -9 to -10)
            top: `${lineTop}px`,
            width: "41px", // Increased width from 40px to 41px
            height: smoothHeight,
          }}
        >
          <img
            src="/line2.png"
            alt="line"
            className="block w-full h-full select-none"
            draggable={false}
            style={{ objectFit: "fill" }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// RNDMarketingSection
function RNDMarketingSection() {
  return (
    <section className="bg-white text-[#111827] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Top quotation area with background image */}
        <div className="relative text-center mb-8 lg:mb-12">
          {/* Background quotation mark image - positioned at bottom of text */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-[280px] h-[200px] lg:w-[400px] lg:h-[280px] opacity-[0.06] pointer-events-none z-0">
            <Image src="/images/quote-left.png" alt="" fill className="object-contain" />
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10 text-[28px] lg:text-[42px] leading-tight font-semibold mb-6 lg:mb-8"
          >
            브릭업만의 <span className="font-bold">R&D / 마케팅</span>
          </motion.h2>

          {/* Subheading with emphasized words */}
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10 text-[20px] lg:text-[26px] leading-[1.4] text-[#3B3B3B] font-normal"
          >
            <span className="block mb-1">
              메뉴는 감이 아니라, <span className="font-bold text-[#16469E]">전략</span>이다.
            </span>
            <span className="block">
              손님은 운이 아니라, <span className="font-bold text-[#16469E]">구조</span>로 온다.
            </span>
          </motion.p>
        </div>

        {/* Two-column content cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-14">
          {/* R&D Card */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-xl bg-[#F5F8FF] px-[31px] py-6 lg:py-8 shadow-sm"
          >
            <motion.h3
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#111827] text-[24px] lg:text-[26px] font-bold mb-4 text-center"
            >
              R&D
            </motion.h3>
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[14px] lg:text-[15px] text-[#3B3B3B] leading-[1.5]"
              >
                창업의 시작은 '무엇을 팔까'에서 결정됩니다.
                <br />
                하지만 대부분의 실패는 메뉴가 아니라 <span className="font-bold">'판단 기준의 부재'</span>에서 옵니다.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[14px] lg:text-[15px] text-[#3B3B3B] leading-[1.5]"
              >
                브릭업은 트렌드가 아닌 데이터와 현장 경험으로 접근합니다.
                <br />
                시장 흐름, 원가율, 조리 난이도, 객단가까지 수치로 검증된 메뉴만 제안합니다.
                <br />
                '요즘 뜨는 메뉴' 대신 <span className="font-bold">'오래 파는 메뉴'</span>를 만듭니다.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="pt-3 border-t border-[#DDE4EE]"
              >
                <p className="text-[13px] lg:text-[14px] text-[#5B5B5B] leading-[1.4]">
                  우리 경험이 없어도 괜찮아요.
                  <br />
                  브릭업이 <span className="font-semibold">'팔리는 메뉴'의 공식</span>을 함께 짜드립니다.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Marketing Card */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-xl bg-[#F5F8FF] px-[31px] py-6 lg:py-8 shadow-sm"
          >
            <motion.h3
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-[#111827] text-[24px] lg:text-[26px] font-bold mb-4 text-center"
            >
              마케팅
            </motion.h3>
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[14px] lg:text-[15px] text-[#3B3B3B] leading-[1.5]"
              >
                좋은 가게는 손님이 알아서 찾아오지 않습니다.
                <br />
                브릭업은 <span className="font-bold">오픈 전부터 매출 구조를 그대로 마케팅을 실행</span>합니다.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white border border-[#DDE4EE] px-3 py-4 flex items-center justify-center min-h-[100px]"
                >
                  <p className="text-[11px] lg:text-[12px] text-[#3B3B3B] leading-[1.2] text-center">
                    지역, 연령대,
                    <br />
                    소비패턴별
                    <br />
                    오픈 전 타겟 광고
                    <br />
                    전략 수립
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white border border-[#DDE4EE] px-3 py-4 flex items-center justify-center min-h-[100px]"
                >
                  <p className="text-[11px] lg:text-[12px] text-[#3B3B3B] leading-[1.2] text-center">
                    배달앱·SNS·
                    <br />앱 리뷰까지 통합 관리
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white border border-[#DDE4EE] px-3 py-4 flex items-center justify-center min-h-[100px]"
                >
                  <p className="text-[11px] lg:text-[12px] text-[#3B3B3B] leading-[1.2] text-center">
                    광고비를
                    <br />
                    소모가 아니라
                    <br />
                    투자로 바꾸는
                    <br />
                    효율 중심 세팅
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white border border-[#DDE4EE] px-3 py-4 flex items-center justify-center min-h-[100px]"
                >
                  <p className="text-[11px] lg:text-[12px] text-[#3B3B3B] leading-[1.2] text-center">
                    매출 리포트+피드백+
                    <br />
                    채널성과별캠페인으로
                    <br />
                    오픈 후에도 지속 지원
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="pt-3 border-t border-[#DDE4EE]"
              >
                <p className="text-[13px] lg:text-[14px] text-[#5B5B5B] leading-[1.4]">
                  홍보는 누가 해주는 게 아닙니다.
                  <br />
                  브릭업은 <span className="font-semibold">매출이 되는 홍보</span>를 함께 만듭니다.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mid-section copy */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-14"
        >
          <p className="text-[17px] lg:text-[22px] leading-[1.5] text-[#3B3B3B]">
            <span className="block mb-1">브릭업과 함께하면</span>
            <span className="block mb-1">
              한 메뉴에도 <span className="font-bold text-[#16469E]">이유</span>가 생깁니다.
            </span>
            <span className="block mb-1">
              한 명의 손님이 <span className="font-bold text-[#16469E]">데이터</span>가 되고
            </span>
            <span className="block mb-2">
              한 번의 광고가 <span className="font-bold text-[#16469E]">매출</span>이 됩니다.
            </span>
            <span className="block mb-1">당신은 요리사가 아니라, 사장입니다.</span>
            <span className="block">그리고 브릭업은 그 사장을 성공시키는 팀입니다.</span>
          </p>
        </motion.div>

        {/* Bottom quote with background image */}
        <div className="relative text-center mb-8 lg:mb-10">
          {/* Background quotation mark image - positioned at top of text */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[-60px] w-[300px] h-[240px] lg:w-[450px] lg:h-[350px] opacity-[0.06] pointer-events-none z-0">
            <Image src="/images/quote-big.png" alt="" fill className="object-contain" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10 text-[20px] lg:text-[28px] leading-[1.4] text-[#3B3B3B]"
          >
            <span className="block mb-1.5">감으로 시작하지 말고,</span>
            <span className="block font-bold">근거로 시작하라.</span>
          </motion.p>
        </div>

        {/* Final blue banner */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="inline-block rounded-lg bg-[#16469E] text-white px-8 py-5 lg:px-10 lg:py-6 shadow-lg">
            <span className="text-[16px] lg:text-[20px] font-bold text-center leading-tight">
              브릭업은 당신의 첫 번째 R&D 팀이자, 마지막 마케팅 팀입니다.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// IncubationConnectSection component
function IncubationConnectSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden bg-[#F4F7FC] mt-[30px] z-[5] pt-[120px]"
    >
      {/* 상단 곡선 배경 */}
      <div className="absolute top-0 left-0 w-full z-0">
        <Image
          src="/images/section-top.png"
          alt="section top curve"
          width={1920}
          height={200}
          className="w-full h-auto object-cover bg-white"
          priority
        />
      </div>

      {/* 본문 */}
      <div className="relative z-10 py-28 lg:py-32 rounded-t-[80px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* 타이틀 */}
          <div className="text-center">
            <h2 className="text-[30px] lg:text-[38px] font-extrabold text-[#111827]">창업의 시작도, 매장의 마무리도</h2>
            <p className="text-[22px] lg:text-[28px] font-medium mt-1">
              <span className="bg-[#16469E] text-white font-extrabold px-2 py-1">브릭업</span> 과 함께
            </p>
            <p className="mt-6 text-[16px] lg:text-[17px] text-[#6B7280] leading-[1.9] max-w-[800px] mx-auto">
              창업은 시작만큼이나 정리와 이지도 중요합니다.
              <br />
              브릭업은 기존 사장님의 매장을 안정하게 양도·양수하고, 건물주의 점포 의뢰를 적합한 창업자와 연결하는
              시스템을 운영합니다.
            </p>
          </div>

          {/* 다이아몬드 3개 (hover 시 순서대로 등장 후 유지) */}
          <div className="relative mx-auto mt-16 flex flex-col items-center lg:block lg:h-[440px] max-w-[900px] group">
            {/* 기존 점주 */}
            <div
              className="absolute left-[11%] top-0 w-[279px] h-[279px]
                         rotate-45 bg-[#4B5563] rounded-2xl shadow-md
                         opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100
                         hover:-translate-y-2 hover:shadow-[0_6px_20px_rgba(22,70,158,0.15)]
                         group-hover:translate-y-0"
            >
              <div className="-rotate-45 flex flex-col items-center justify-center h-full text-center px-4">
                <p className="text-white font-extrabold text-[18px]">기존 점주</p>
                <p className="mt-2 text-white/90 text-[14px] leading-[1.5]">
                  권리금 손실을 최소화하고
                  <br />
                  새로운 기회를 찾을 수 있습니다
                </p>
              </div>
            </div>

            {/* 건물주 */}
            <div
              className="absolute right-[11%] top-0 w-[279px] h-[279px]
                         rotate-45 bg-[#E8EAEC] rounded-2xl border border-[#E5E7EB] shadow-sm
                         opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300
                         hover:-translate-y-2 hover:shadow-[0_6px_20px_rgba(22,70,158,0.15)]"
            >
              <div className="-rotate-45 flex flex-col items-center justify-center h-full text-center px-4">
                <p className="text-[#111827] font-extrabold text-[18px]">건물주</p>
                <p className="mt-2 text-[#374151] text-[14px] leading-[1.5]">
                  공실 걱정 없이
                  <br />
                  상가 임대 운영이 가능합니다
                </p>
              </div>
            </div>

            {/* 예비창업자 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[205px] w-[279px] h-[279px]
                         rotate-45 bg-[#16469E] rounded-2xl shadow-lg z-20
                         opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500
                         hover:-translate-y-2 hover:shadow-[0_6px_20px_rgba(22,70,158,0.15)]"
            >
              <div className="-rotate-45 flex flex-col items-center justify-center h-full text-center px-6">
                <p className="text-white font-extrabold text-[18px]">예비창업자</p>
                <p className="mt-2 text-white/90 text-[14px] leading-[1.5]">
                  검증된 점포를 안정적으로
                  <br />
                  인수할 수 있습니다
                </p>
              </div>
            </div>
          </div>

          {/* 하단 카드 (간격 200px) */}
          <div className="mt-[200px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* 양도/양수 */}
            <div
              className="rounded-2xl bg-white border border-[#E9EDF5] shadow-sm p-7 lg:p-10
                         transition-transform duration-300 ease-out hover:-translate-y-1.5
                         hover:shadow-[0_6px_20px_rgba(22,70,158,0.15)]"
            >
              <h3 className="text-[#1F2937] text-[20px] lg:text-[22px] font-extrabold">양도/양수</h3>
              <p className="mt-1 text-[15px] lg:text-[16px] text-[#4B5563] font-medium">기존 사장님 & 예비창업자</p>
              <div className="mt-5 space-y-1 text-[14px] lg:text-[15px] text-[#4B5563] leading-[1.5]">
                <p>• 현재 운영 중인 개인 매장 / 프랜차이즈 가맹점 모두 접수 가능</p>
                <p>• 권리금·시설·임대 데이터를 기반으로 공정한 가치 산정</p>
                <p>• 브릭업 전문가가 예비창업자 매칭 및 계약 조율까지 지원</p>
                <p>• 불투명한 중고거래가 아닌 안정한 절차로 진행</p>
              </div>
            </div>

            {/* 점포 의뢰 */}
            <div
              className="rounded-2xl bg-white border border-[#E9EDF5] shadow-sm p-7 lg:p-10
                         transition-transform duration-300 ease-out hover:-translate-y-1.5
                         hover:shadow-[0_6px_20px_rgba(22,70,158,0.15)]"
            >
              <h3 className="text-[#1F2937] text-[20px] lg:text-[22px] font-extrabold">점포 의뢰</h3>
              <p className="mt-1 text-[15px] lg:text-[16px] text-[#4B5563] font-medium">건물주</p>
              <div className="mt-5 space-y-1 text-[14px] lg:text-[15px] text-[#4B5563] leading-[1.5]">
                <p>• 공실 점포를 등록하면 브릭업이 상권·입지 분석 리포트 제공</p>
                <p>• 입점형 적합도로 분석해 가장 유망한 업종 추천</p>
                <p>• 해당 업종에 맞는 예비창업자 연결 및 본사 협의까지 진행</p>
                <p>• 단순 임대가 아니라 장기적으로 안정적 임차인 확보 가능</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ContactInquirySection component
function ContactInquirySection() {
  const [agreed, setAgreed] = useState(false)
  const [selected, setSelected] = useState<
    ("프랜차이즈 창업" | "양도양수" | "점포매매" | "R&D(메뉴개발)" | "마케팅")[]
  >([])

  const toggle = (v: "프랜차이즈 창업" | "양도양수" | "점포매매" | "R&D(메뉴개발)" | "마케팅") =>
    setSelected((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    alert("제출되었습니다.")
  }

  const helps: ("프랜차이즈 창업" | "양도양수" | "점포매매" | "R&D(메뉴개발)" | "마케팅")[] = [
    "프랜차이즈 창업",
    "양도양수",
    "점포매매",
    "R&D(메뉴개발)",
    "마케팅",
  ]

  return (
    <section className="relative overflow-hidden bg-[#F6F8FB]" aria-labelledby="contact-title">
      {/* 배경 */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url(/images/contact-wave-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-white/55" />

      {/* 1440 컨테이너 + 우측 700px 고정 */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:[grid-template-columns:1fr_700px] gap-10 lg:gap-16 items-start">
          {/* 왼쪽 타이틀 */}
          <div className="pt-2">
            <h2 id="contact-title" className="text-[28px] lg:text-[36px] font-extrabold text-[#111827] tracking-tight">
              창업 문의
            </h2>
          </div>

          {/* 오른쪽 폼 */}
          <form
            onSubmit={onSubmit}
            className="w-full bg-white/90 backdrop-blur-sm border border-[#E5EAF3] rounded-2xl shadow-[0_10px_30px_rgba(17,24,39,0.06)] p-5 lg:p-6"
          >
            {/* 어떤 도움 */}
            <div className="mb-4">
              <div className="flex items-center gap-1 text-[14px] text-[#111827] font-semibold">
                <span>어떤 도움을 원하시나요?(중복선택 가능)</span>
                <span className="text-[#EF4444]">*</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {helps.map((h) => (
                  <label key={h} className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selected.includes(h)}
                      onChange={() => toggle(h)}
                      className="peer sr-only"
                    />
                    <span className="grid place-items-center w-4 h-4 rounded-[3px] border border-[#D1D9E8] bg-white peer-checked:bg-[#16469E] peer-checked:border-[#16469E] transition-colors">
                      <svg
                        viewBox="0 0 20 20"
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 10.5 8.5 14 15 6" />
                      </svg>
                    </span>
                    <span className="text-[14px] text-[#374151]">{h}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 문의내용 */}
            <div className="mb-4">
              <label className="block text-[14px] font-semibold text-[#111827] mb-2">문의내용</label>
              <textarea
                required
                rows={5}
                placeholder="내용을 입력해주세요"
                className="w-full resize-none rounded-lg border border-[#D7DEEA] bg-white px-3.5 py-3 text-[14px] text-[#111827] placeholder:text-[#9AA3B2] outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/15"
              />
            </div>

            {/* 성함 */}
            <div className="mb-4">
              <label className="block text-[14px] font-semibold text-[#111827] mb-2">성함</label>
              <input
                type="text"
                placeholder="성함을 입력해주세요"
                className="w-full rounded-lg border border-[#D7DEEA] bg-white px-3.5 py-3 text-[14px] text-[#111827] placeholder:text-[#9AA3B2] outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/15"
              />
            </div>

            {/* 연락처 */}
            <div className="mb-4">
              <label className="flex items-center gap-1 text-[14px] font-semibold text-[#111827] mb-2">
                <span>연락처</span>
                <span className="text-[#EF4444]">*</span>
              </label>
              <input
                required
                inputMode="numeric"
                pattern="[0-9]{9,}"
                placeholder="01012345678 / '-' 는 제외하고 작성해주세요"
                className="w-full rounded-lg border border-[#D7DEEA] bg-white px-3.5 py-3 text-[14px] text-[#111827] placeholder:text-[#9AA3B2] outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/15"
              />
            </div>

            {/* 개인정보 수집 및 이용동의 */}
            <div className="mb-3">
              <label className="block text-[14px] font-semibold text-[#111827] mb-2">개인정보 수집 및 이용동의</label>
              <div className="rounded-lg border border-[#E3E8F2] bg-white px-3.5 py-3 text-[13px] leading-[1.7] text-[#4B5563] max-h-[180px] overflow-auto">
                회사명(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
                고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                <br />
                <br />
                제1조(개인정보의 처리목적) 회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는
                이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                예정입니다.
              </div>
            </div>

            {/* 동의 체크 */}
            <label className="inline-flex items-center gap-2 mb-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer sr-only"
              />
              <span className="grid place-items-center w-4 h-4 rounded-[3px] border border-[#D1D9E8] bg-white peer-checked:bg-[#16469E] peer-checked:border-[#16469E] transition-colors">
                <svg
                  viewBox="0 0 20 20"
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 10.5 8.5 14 15 6" />
                </svg>
              </span>
              <span className="text-[14px] text-[#374151]">
                개인정보 수집 및 이용에 동의합니다. <span className="text-[#EF4444]">*</span>
              </span>
            </label>

            {/* Merged update starts here */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full py-4 bg-[#16469E] text-white font-bold text-lg rounded-lg hover:bg-[#1a5bc4] transition-colors"
            >
              문의하기
            </button>
            {/* Merged update ends here */}
          </form>
        </div>
      </div>
    </section>
  )
}

// Replaced FooterSection with new CTA Section and Modals
// Removed: FooterSection component definition
// Added: New CTA Section and its modals (Terms, Privacy)

// New CTA Section
const CTASection = () => {
  const router = useRouter()

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "475px",
        height: "475px",
        // </CHANGE> Removed marginBottom: "80px"
        backgroundImage: "url('/images/cta-background-matching.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content container */}
      <div className="relative z-10 h-full max-w-[1180px] mx-auto px-6 flex flex-col">
        {/* Top CTA area - positioned 60px from top */}
        <div className="flex flex-col items-center text-center" style={{ paddingTop: "60px" }}>
          <h2 className="text-white text-[32px] font-bold leading-tight">이미 브랜드가 있으신가요?</h2>
          <p className="mt-4 text-white text-[18px]">브릭업의 효율적인 인큐베이팅 서비스를 경험해보세요.</p>

          {/* Button - CSS styled, not image */}
          <button
            onClick={(e) => {
              e.preventDefault()
              router.push("/franchise-incubating")
            }}
            className="mt-6 bg-white text-[#333333] font-bold rounded-full transition-all duration-300 ease-in-out hover:scale-[1.04] hover:shadow-[0_0_12px_rgba(0,70,190,0.4)]"
            style={{
              width: "165px",
              height: "50px",
              borderRadius: "40px",
              marginBottom: "54px",
            }}
          >
            지금 신청하세요
          </button>
        </div>

        {/* Center divider line - at 260px from top */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "260px",
            width: "1180px",
            height: "1px",
            backgroundColor: "#FFFFFF",
            opacity: 0.6,
          }}
        />

        {/* Bottom info area */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-full max-w-[1180px] px-6"
          style={{
            top: "288px", // 260px + 28px margin
            paddingTop: "24px",
          }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 text-white/80 text-[13px] leading-relaxed">
            {/* Left: Logo + Company Info */}
            <div className="flex flex-col gap-2">
              <img src="/images/brickup-logo-ww.png" alt="Brickup Logo" className="w-[130px] h-auto mb-2" />
                <p className="font-bold">(주)브릭업</p>
                <p>사업자등록번호 : 339-87-03755 | 법인등록번호 : 110111-0938846</p>
                <p>서울시 금천구 벚꽃로 234 에이스하이엔6차 804호 | brickup@naver.com | 1566-1343</p>
            </div>

            {/* Right: Copyright + Links */}
            <div className="text-left lg:text-right">
              <p>Copyright © Brickup Inc. All Rights Reserved.</p>
              <p className="space-x-2 mt-1">
                <button
                  onClick={() => {
                    // Open terms modal
                    const modal = document.getElementById("terms-modal")
                    if (modal) modal.classList.remove("hidden")
                  }}
                  className="hover:text-white transition-colors"
                >
                  이용약관
                </button>
                <span>|</span>
                <button
                  onClick={() => {
                    // Open privacy modal
                    const modal = document.getElementById("privacy-modal")
                    if (modal) modal.classList.remove("hidden")
                  }}
                  className="hover:text-white transition-colors"
                >
                  개인정보처리방침
                </button>
                <span>|</span>
                <span>사업자정보확인</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Terms Modal
const TermsModal = () => (
  <div
    id="terms-modal"
    className="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.classList.add("hidden")
      }
    }}
  >
    <div
      className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="text-[18px] font-bold text-[#111827]">이용약관</h3>
        <button
          onClick={() => {
            const modal = document.getElementById("terms-modal")
            if (modal) modal.classList.add("hidden")
          }}
          className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Modal Content */}
      <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
        <h4 className="font-bold text-[#111827] mb-2">제1조 (목적)</h4>
        <p className="mb-4">
          본 약관은 주식회사 브릭업(이하 "회사"라 한다)이 제공하는 모든 서비스(이하 "서비스"라 한다)의 이용과 관련하여
          회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>

        <h4 className="font-bold text-[#111827] mb-2">제2조 (정의)</h4>
        <p className="mb-4">
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
          <br />
          1. "서비스"란 회사가 제공하는 프랜차이즈 창업 컨설팅, 매칭, 상권 분석 등 모든 관련 서비스를 의미합니다.
          <br />
          2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
        </p>

        <h4 className="font-bold text-[#111827] mb-2">제3조 (약관의 효력 및 변경)</h4>
        <p className="mb-4">
          1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
          <br />
          2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 약관이 변경되는 경우
          회사는 변경사항을 시행일자 7일 전부터 회원에게 공지합니다.
        </p>
      </div>

      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={() => {
            const modal = document.getElementById("terms-modal")
            if (modal) modal.classList.add("hidden")
          }}
          className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
        >
          확인
        </button>
      </div>
    </div>
  </div>
)

// Privacy Policy Modal
const PrivacyModal = () => (
  <div
    id="privacy-modal"
    className="hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.classList.add("hidden")
      }
    }}
  >
    <div
      className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="text-[18px] font-bold text-[#111827]">개인정보처리방침</h3>
        <button
          onClick={() => {
            const modal = document.getElementById("privacy-modal")
            if (modal) modal.classList.add("hidden")
          }}
          className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Modal Content */}
      <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
        <p className="mb-4">
          주식회사 브릭업(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
          고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립, 공개합니다.
        </p>

        <h4 className="font-bold text-[#111827] mb-2">제1조(개인정보의 처리목적)</h4>
        <p className="mb-4">
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
          이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
          조치를 이행할 예정입니다.
        </p>

        <h4 className="font-bold text-[#111827] mb-2">제2조(개인정보의 처리 및 보유기간)</h4>
        <p className="mb-4">
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
          보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </p>

        <h4 className="font-bold text-[#111827] mb-2">제3조(개인정보의 안전성 확보조치)</h4>
        <p className="mb-4">
          회사는 개인정보의 안전성 확보를 위해 관리적 조치, 기술적 조치, 물리적 조치를 취하고 있습니다.
        </p>
      </div>

      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <button
          onClick={() => {
            const modal = document.getElementById("privacy-modal")
            if (modal) modal.classList.add("hidden")
          }}
          className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
        >
          확인
        </button>
      </div>
    </div>
  </div>
)

export default function FranchiseMatching() {
  const router = useRouter()
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false) // This state is now managed by the modal's visibility

  // Removed unused handleFormSubmit and validateForm functions

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "instant" })
    router.push("/franchise-incubating")
  }

  const useCounter = (end: number, duration = 2000, shouldStart = false) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!shouldStart) return

      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, [end, duration, shouldStart])

    return count
  }

  const [startCounter, setStartCounter] = useState(false)
  const counterValue = useCounter(3700, 2000, startCounter)

  const processRef = useRef(null) // Declare processRef here
  const [linePosition, setLinePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const fadeUp = {
    hidden: { opacity: 0.1, y: 40, filter: "blur(3px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0)",
      transition: { delay: i * 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const steps = [
    { title: "상담", desc: "창업자의 예산·목표·성향을 듣는 것부터 시작합니다.", eng: "Consulting" },
    { title: "브랜드 매칭", desc: "수백 개 프랜차이즈 중에서 조건에 맞는 브랜드를 선별합니다.", eng: "Matching" },
    {
      title: "상권 & 입지 분석",
      desc: "본사 추천 입지의 데이터를 검증해, 성공 가능성이 높은 자리를 찾습니다.",
      eng: "Analysis",
    },
    {
      title: "계약 & 준비",
      desc: "가맹 계약서를 함께 검토하고, 인테리어·가자재·교육을 준비합니다.",
      eng: "Agreement",
    },
    { title: "매장 오픈", desc: "초기 홍보와 오픈 이벤트까지 함께 진행해 안정적인 출발을 돕습니다.", eng: "Opening" },
    { title: "사후 관리", desc: "오픈 후에도 매출 관리, 운영 컨설팅을 꾸준히 이어갑니다.", eng: "Follow-up" },
  ]

  return (
    <div className="relative w-full bg-white pb-16 lg:pb-16">
      {/* Hero Section - Desktop */}
      <section className="hidden lg:flex relative w-full h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/back1.png"
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          >
            <source src="/videos/background2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-white/40 z-[1]" />

        {/* Logo */}
        <div className="relative z-10 pt-6 lg:pt-8 px-6 lg:px-16">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/brickup-logo-wy.png" alt="Brickup" width={150} height={40} className="h-8 lg:h-10 w-auto" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-16 text-center cursor-default">
          <h1
            className="text-[#3B3B3B] text-4xl lg:text-6xl xl:text-7xl leading-tight mb-8 lg:mb-12 tracking-tight animate-fadeInDown"
            style={{ animationDelay: "0s", opacity: 0, animationFillMode: "forwards" }}
          >
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0s", opacity: 0, animationFillMode: "forwards" }}
            >
              화려한 약속 대신
            </span>
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="inline-block px-3 py-1 font-bold relative">
                <span
                  className="relative z-10 animate-textFadeIn text-white"
                  style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
                >
                  검증된 성공
                </span>
                <span
                  className="absolute inset-0 animate-bgSweepIn bg-[#16469E] -z-10"
                  style={{ animationDelay: "1.1s" }}
                />
              </span>
              을
            </span>
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              보여드립니다
            </span>
          </h1>

          <p
            className="text-[#3B3B3B] text-sm lg:text-base xl:text-lg max-w-3xl leading-relaxed tracking-tight animate-fadeInDown"
            style={{ animationDelay: "1.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            브릭업은 <span className="font-bold">수많은 브랜드를 성공적으로 확장시켜 온 경험</span>을 바탕으로,
            <br />
            예비창업자가 처음부터 올바른 선택을 할 수 있도록 돕습니다.
            <br />
            <span className="font-bold">실제 데이터와 검증된 노하우</span>로 창업의 길을 안내합니다.
          </p>
        </div>

        {/* Mouse Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <Image src="/images/scroll-mouse.png" alt="Scroll" width={40} height={60} className="opacity-80" />
          </div>
        </div>
      </section>

      {/* Hero Section - Mobile Only */}
      <section className="lg:hidden relative w-full h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/back1.png"
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          >
            <source src="/videos/background2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-white/40 z-[1]" />

        {/* Logo */}
        <div className="relative z-10 pt-6 px-6">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/brickup-logo-wy.png" alt="Brickup" width={150} height={40} className="h-8 w-auto" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center cursor-default">
          <h1
            className="text-[#3B3B3B] mb-6 tracking-tight animate-fadeInDown"
            style={{
              fontSize: "26px",
              lineHeight: "1.3",
              animationDelay: "0s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <span
              className="block animate-fadeInDown mb-1"
              style={{ animationDelay: "0s", opacity: 0, animationFillMode: "forwards" }}
            >
              화려한 약속 대신
            </span>
            <span
              className="block animate-fadeInDown mb-1"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="inline-block font-bold relative">
                <span
                  className="relative z-10 animate-textFadeIn px-2 py-0.5 text-white"
                  style={{
                    animationDelay: "0.6s",
                    opacity: 0,
                    animationFillMode: "forwards",
                  }}
                >
                  검증된 성공
                </span>
                <span
                  className="absolute inset-0 animate-bgSweepIn -z-10"
                  style={{ animationDelay: "1.1s", top: "1px", bottom: "1px" }}
                />
              </span>
              을
            </span>
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              보여드립니다
            </span>
          </h1>

          <p
            className="text-[#3B3B3B] max-w-3xl tracking-tight animate-fadeInDown"
            style={{
              fontSize: "15px",
              lineHeight: "1.6",
              animationDelay: "1.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            브릭업은 <span className="font-bold">수많은 브랜드를 성공적으로 확장시켜 온 경험</span>을 바탕으로,
            <br />
            예비창업자가 처음부터 올바른 선택을 할 수 있도록 돕습니다.
            <br />
            <span className="font-bold">실제 데이터와 검증된 노하우</span>로 창업의 길을 안내합니다.
          </p>
        </div>

        {/* Mouse Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <Image src="/images/scroll-mouse.png" alt="Scroll" width={40} height={60} className="opacity-80" />
          </div>
        </div>
      </section>

      {/* Industry Keywords Section */}
      <section className="relative w-full overflow-hidden bg-white" style={{ height: "1100px" }}>
        <div
          className="absolute inset-0 z-0 flex flex-col justify-evenly"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 100%)",
          }}
        >
          {/* Row 1 - Left to Right */}
          <div
            className="flex whitespace-nowrap animate-scrollRight"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아
              생활서비스
            </span>
            <span className="inline-block px-8">
              치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아
              생활서비스
            </span>
          </div>

          {/* Row 2 - Right to Left */}
          <div
            className="flex whitespace-nowrap animate-scrollLeft"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              소자본(5천 미만) 1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점
              패스트푸드
            </span>
            <span className="inline-block px-8">
              소자본(5천 미만) 1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점
              패스트푸드
            </span>
          </div>

          {/* Row 3 - Left to Right */}
          <div
            className="flex whitespace-nowrap animate-scrollRight"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만)
            </span>
            <span className="inline-block px-8">
              베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만)
            </span>
          </div>

          {/* Row 4 - Right to Left */}
          <div
            className="flex whitespace-nowrap animate-scrollLeft"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리
              피자
            </span>
            <span className="inline-block px-8">
              1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리
              피자
            </span>
          </div>

          {/* Row 5 - Left to Right */}
          <div
            className="flex whitespace-nowrap animate-scrollRight"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인
              창업
            </span>
            <span className="inline-block px-8">
              분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인
              창업
            </span>
          </div>

          {/* Row 6 - Right to Left */}
          <div
            className="flex whitespace-nowrap animate-scrollLeft"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식
            </span>
            <span className="inline-block px-8">
              부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식
            </span>
          </div>

          {/* Row 7 - Left to Right */}
          <div
            className="flex whitespace-nowrap animate-scrollRight"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인 창업 부부 창업
              배달 창업
            </span>
            <span className="inline-block px-8">
              일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인 창업 부부 창업
              배달 창업
            </span>
          </div>

          {/* Row 8 - Right to Left */}
          <div
            className="flex whitespace-nowrap animate-scrollLeft"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전
              도소매
            </span>
            <span className="inline-block px-8">
              샵인샵 업종 변경 뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전
              도소매
            </span>
          </div>

          {/* Row 9 - Left to Right */}
          <div
            className="flex whitespace-nowrap animate-scrollRight"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종
              변경
            </span>
            <span className="inline-block px-8">
              PC방 여가 오락 교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종
              변경
            </span>
          </div>

          {/* Row 10 - Right to Left */}
          <div
            className="flex whitespace-nowrap animate-scrollLeft"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락
            </span>
            <span className="inline-block px-8">
              뜨는 창업 치킨 커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락
            </span>
          </div>

          {/* Row 11 - Left to Right */}
          <div
            className="flex whitespace-nowrap animate-scrollRight"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업
              치킨
            </span>
            <span className="inline-block px-8">
              교육 육아 생활서비스 소자본(5천 미만) 1인 창업 무인 창업 부부 창업 배달 창업 샵인샵 업종 변경 뜨는 창업
              치킨
            </span>
          </div>

          {/* Row 12 - Right to Left */}
          <div
            className="flex whitespace-nowrap animate-scrollLeft"
            style={{ fontSize: "72px", lineHeight: "72px", color: "#E0E0E0" }}
          >
            <span className="inline-block px-8">
              커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아
              생활서비스
            </span>
            <span className="inline-block px-8">
              커피/카페 주점 패스트푸드 베이커리 피자 분식 한식 중식 일식 양식 퓨전 도소매 PC방 여가 오락 교육 육아
              생활서비스
            </span>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.02 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 1 }}
            className="rounded-full bg-[#16469E]"
            style={{
              width: "650px",
              height: "650px",
            }}
          />
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-8 lg:mb-12"
              style={{
                fontSize: "46px",
                lineHeight: "1.3",
              }}
            >
              수백개의 프랜차이즈 중,
              <br />
              당신에게 맞는 <span className="inline-block px-3 py-1 bg-white text-[#16469E] font-bold">단 하나</span>를
              찾습니다
            </motion.h2>

            {/* Body Text */}
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-white"
              style={{
                fontSize: "20px",
                lineHeight: "1.6",
              }}
            >
              브릭업은 수많은 브랜드를 성공적으로 확장시켜 온 경험을 바탕으로,
              <br />
              예비창업자가 처음부터 올바른 선택을 할 수 있도록 돕습니다.
              <br />
              영업사원의 화려한 말이 아니라,
              <br />
              실제 데이터와 검증된 노하우로 창업의 길을 안내합니다.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#16469E] py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Top Section - Success Statistics */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-white text-3xl lg:text-5xl mb-4 lg:mb-6"
            >
              실제 창업자들의 성공 스토리,
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-white text-3xl lg:text-5xl mb-12 lg:mb-16"
            >
              <span className="font-bold">브릭업과 함께</span>라면 당신의 스토리가 됩니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              onViewportEnter={() => setStartCounter(true)}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-8 lg:mb-12"
            >
              <p className="text-white text-sm lg:text-base mb-4">브릭업 성공창업 계약 수</p>
              <p className="text-white text-6xl lg:text-8xl font-bold">
                {counterValue.toLocaleString()}
                <span className="text-5xl lg:text-7xl">+</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-white text-base lg:text-xl max-w-4xl mx-auto"
            >
              브릭업은 수많은 예비창업자들이 안전하게 기맹점을 열고,
              <br />
              <span className="font-bold">안정적인 수익을 내는 성주로 성장할</span> 수 있도록 도왔습니다.
            </motion.p>
          </div>

          {/* Case Study Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-32">
            {/* Card 1 - 분식 */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 lg:p-8"
            >
              <h3 className="text-[#16469E] text-xl lg:text-2xl font-bold mb-4">분식 프랜차이즈 사례</h3>
              <p className="text-[#414141] text-sm lg:text-base leading-relaxed">
                퇴직금으로 시작하는데, 솔직히 서울에서 장사가 될까 싶었어요.{" "}
                <span className="font-bold">브릭업이 상권분석부터 마케팅까지</span> 다 챙겨주더라고요. 지금은{" "}
                <span className="font-bold">한 달에 매출이 안정적으로 3천만 원 정도</span> 나와요. 혼자 했으면 절대
                못했을 거예요.
              </p>
            </motion.div>

            {/* Card 2 - 치킨 */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 lg:p-8"
            >
              <h3 className="text-[#16469E] text-xl lg:text-2xl font-bold mb-4">치킨 프랜차이즈 사례</h3>
              <p className="text-[#414141] text-sm lg:text-base leading-relaxed">
                치킨집이 이미 많았는데, 주변에서 말렸어요. 근데{" "}
                <span className="font-bold">브릭업이 경쟁 매장들까지 분석</span>해서 차별화 전략을 짜주더라고요. 지금은{" "}
                <span className="font-bold">매출이 옆 매장보다 20%는 더 나와요.</span> 브릭업 덕분에 제대로 시작했어요.
              </p>
            </motion.div>

            {/* Card 3 - 카페 */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 lg:p-8"
            >
              <h3 className="text-[#16469E] text-xl lg:text-2xl font-bold mb-4">카페 프랜차이즈 사례</h3>
              <p className="text-[#414141] text-sm lg:text-base leading-relaxed">
                인테리어 비용만 생각했는데, 생각보다 돈이 많이 들더라고요.{" "}
                <span className="font-bold">브릭업이 본사랑 직접 조율</span>해서 적정 조건으로 계약했어요. 결과적으로{" "}
                <span className="font-bold">초기 투자금이 15% 정도 절약</span>됐어요. 처음 창업하시는 분들 상담받는 거
                추천해요.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* R&D / Marketing Section */}
      <RNDMarketingSection />

      {/* IncubationConnectSection component */}
      <IncubationConnectSection />

      {/* ContactInquirySection component */}
      <ContactInquirySection />

      {/* Render the new CTA section and modals */}
      <CTASection />
      <TermsModal />
      <PrivacyModal />

      <div
        className="fixed bottom-0 left-0 w-full z-50 bg-[#16469E] shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
        style={{ height: "80px" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const agree = formData.get("consent")

            if (!agree) {
              alert("개인정보 수집 및 이용에 동의해주세요.")
              return
            }
            alert("문의가 정상적으로 접수되었습니다.")
          }}
          className="h-full flex items-center"
        >
          <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-8">
            <div className="max-w-[1180px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
              <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                <img
                  src="/images/brickup-logo-bottom.png"
                  alt="Brickup Logo"
                  style={{ width: "132px", height: "34px", objectFit: "contain" }}
                />
              </Link>

              {/* Inquiry Type Select */}
              <select
                name="inquiryType"
                className="w-full lg:flex-1 lg:min-w-[150px] h-[40px] rounded-md px-3 text-[14px] bg-white text-[#111827] border border-[#D1D9E8] focus:outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/20"
                required
              >
                <option value="" className="text-[#999999]">
                  문의유형 선택
                </option>
                <option value="프랜차이즈 창업">프랜차이즈 창업</option>
                <option value="양도양수">양도양수</option>
                <option value="점포매매">점포매매</option>
                <option value="R&D(메뉴개발)">R&D(메뉴개발)</option>
                <option value="마케팅">마케팅</option>
              </select>

              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="성함"
                className="w-full lg:flex-1 lg:min-w-[100px] h-[40px] rounded-md px-3 text-[14px] bg-white text-[#111827] placeholder:text-[#999999] border border-[#D1D9E8] focus:outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/20"
                required
              />

              {/* Contact */}
              <input
                type="tel"
                name="phone"
                placeholder="연락처"
                className="w-full lg:flex-1 lg:min-w-[140px] h-[40px] rounded-md px-3 text-[14px] bg-white text-[#111827] placeholder:text-[#999999] border border-[#D1D9E8] focus:outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/20"
                required
              />

              {/* Privacy Consent */}
              <label className="flex items-center gap-2 text-white text-[14px] whitespace-nowrap cursor-pointer flex-shrink-0">
                <input type="checkbox" name="consent" className="w-[16px] h-[16px] accent-[#FFF200]" required />
                <span>
                  <span
                    className="underline hover:text-[#FFF200] transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      const modal = document.getElementById("privacy-modal")
                      if (modal) modal.classList.remove("hidden")
                    }}
                  >
                    개인정보수집
                  </span>
                  {" 동의"}
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full lg:w-auto flex-shrink-0 h-[40px] hover:brightness-110 transition-all"
              >
                <img
                  src="/images/inquiry-button.png"
                  alt="문의하기"
                  className="h-full w-auto object-contain"
                  style={{ minWidth: "120px" }}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
