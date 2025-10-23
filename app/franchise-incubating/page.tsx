"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { CounterAnimation } from "@/components/counter-animation"
import { LogoSlider } from "@/components/logo-slider"

export default function FranchiseIncubating() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hasPartnerSectionAnimated, setHasPartnerSectionAnimated] = useState(false)
  const partnerSectionRef = useRef<HTMLDivElement>(null)
  const [hasStatsSectionAnimated, setHasStatsSectionAnimated] = useState(false)
  const statsSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index]
                }
                return prev
              })
            }
          })
        },
        {
          threshold: 0.3,
          rootMargin: "0px",
        },
      )

      observer.observe(card)
      return observer
    })

    const partnerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPartnerSectionAnimated) {
            setHasPartnerSectionAnimated(true)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      },
    )

    if (partnerSectionRef.current) {
      partnerObserver.observe(partnerSectionRef.current)
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStatsSectionAnimated) {
            setHasStatsSectionAnimated(true)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      },
    )

    if (statsSectionRef.current) {
      statsObserver.observe(statsSectionRef.current)
    }

    return () => {
      observers.forEach((observer) => observer?.disconnect())
      partnerObserver.disconnect()
      statsObserver.disconnect()
    }
  }, [hasPartnerSectionAnimated, hasStatsSectionAnimated])

  const serviceCards = [
    {
      number: 1,
      title: "브랜딩",
      subtitle: "Branding",
      content: (
        <>
          <p className="font-semibold mb-4 text-white/70">로고·BI/CI·브랜드 스토리 설계</p>
          <p className="mb-0.5">
            브릭업의 브랜딩은 단순한 디자인이 아니라, 시장에서 통하는 '브랜드 언어'를 만드는 과정입니다.
          </p>
          <p className="mb-2">
            로고, 컬러, 슬로건, 매장 톤앤매너 등 시각적 요소뿐 아니라, 브랜드가 소비자에게 어떤 감정과 경험을 남길지까지
            설계합니다.
          </p>
          <div className="space-y-2 mb-2">
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">BI/CI개발</span>
              <span>브랜드의 아이덴티티를 한눈에 각인시키는 시각 시스템 구축</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">브랜드 스토리텔링</span>
              <span>창업자 철학과 시장 포지셔닝을 연결하는 내러티브 구성</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">커뮤니케이션&톤앤매너</span>
              <span>메뉴, 인테리어, 포스터 등 전체 컨셉의 일관화</span>
            </div>
          </div>
          <p className="font-semibold text-white">
            단순히 예쁜 브랜드가 아니라, 시장에서 '기억되는' 브랜드를 만듭니다.
          </p>
        </>
      ),
    },
    {
      number: 2,
      title: "가맹 영업",
      subtitle: "Franchise Development",
      content: (
        <>
          <p className="font-semibold mb-4 text-white/70">검증된 세일즈 시스템으로, 안정적이면서 속도감 있는 확장</p>
          <p className="mb-0.5">브릭업은 영업 경험만 많은 회사가 아닙니다.</p>
          <p className="mb-0.5">수 백개 브랜드의 데이터 기반 세일즈 메뉴얼을 보유한 전문 조직입니다.</p>
          <p className="mb-2">창업자와 본사가 함께 성장할 수 있는 정직하고 효율적인 가맹 확장 구조를 만듭니다.</p>
          <div className="space-y-0.5 mb-2">
            <p>• 리드 DB 확보 & 상담 시스템 구축</p>
            <p>• 상권·입지·예산 매칭형 영업 프로세스</p>
            <p>• 가맹 상담~계약~오픈까지 실시간 관리 시스템</p>
          </div>
          <p className="font-semibold text-white">단순한 영업이 아닌, 브랜드의 '확장 전략'을 설계합니다.</p>
        </>
      ),
    },
    {
      number: 3,
      title: "마케팅",
      subtitle: "Marketing",
      content: (
        <>
          <div className="mb-4">
            <p className="font-semibold text-white/70">브랜드를 알리고, 점포 매출을 키우는 마케팅</p>
            <p className="font-semibold text-white/70">단순 홍보가 아닌, 실제 매출로 연결되는 전략</p>
          </div>
          <p className="mb-2">
            브릭업의 마케팅은 광고비 소진형이 아닙니다.
            <br />
            <span className="font-bold underline">'가맹 확대 + 점포 매출 상승'</span>이라는 두 축을 동시에 달성하는 성과
            중심 마케팅입니다.
          </p>
          <div className="space-y-2 mb-2">
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">브랜드 인지도 확장</span>
              <span>SNS, 유튜브, 언론 홍보, 브랜드 영상</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">가맹 영업 마케팅</span>
              <span>창업박람회, 제휴채널 등</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">매장 매출형 마케팅</span>
              <span>지역광고·배달앱·쿠폰·이벤트·리뷰 콘텐츠 운영</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] gap-6 text-left">
              <span className="font-semibold">성과 리포트 제공</span>
              <span>CPC/CPA 기반 전환율 분석으로 실질 ROI 관리</span>
            </div>
          </div>
          <p className="font-semibold text-white mt-4">우리는 노출이 아니라, 매출로 증명합니다.</p>
        </>
      ),
    },
    {
      number: 4,
      title: "인테리어",
      subtitle: "Interior",
      content: (
        <>
          <p className="font-semibold mb-4 text-white/70">표준화된 설계 & 브랜드 아이덴티티 반영 시공</p>
          <p className="mb-4">
            브릭업의 인테리어는 감각과 시스템을 동시에 잡은 설계입니다.
            <br />
            브랜드 콘셉트와 동선, 운영 효율, 고객 경험까지 반영해
            <br />
            가맹점주 입장에서도 비용 효율적이며 유지보수가 쉬운 구조를 만듭니다.
          </p>
          <div className="space-y-2 mb-4">
            <p>• 브랜드 아이덴티티 기반 설계 메뉴얼 제작</p>
            <p>• 표준 도면 + 실측 커스터마이징 반영 시공</p>
            <p>• 전국 단위 협력 시공망 운영으로 원가 절감</p>
          </div>
          <p className="font-semibold text-white">브랜드의 얼굴을 만드는 디자인, 본사와 점주 모두가 만족하는 시공</p>
        </>
      ),
    },
    {
      number: 5,
      title: "R&D",
      subtitle: "",
      content: (
        <>
          <p className="font-semibold mb-4 text-white/70">메뉴 개발 · 레시피 표준화 · 운영 매뉴얼 제작</p>
          <p className="mb-4">
            브릭업 R&D팀은 단순한 '신메뉴 개발'이 아니라
            <br />
            지속 가능한 수익구조를 만드는 상품 전략팀입니다.
            <br />
            메뉴의 콘셉트, 원가율, 조리 동선, 식자재 공급까지 완전한 시스템을 제공합니다.
          </p>
          <div className="space-y-2 mb-4">
            <p>• 메뉴 콘셉트 & 트렌드 분석</p>
            <p>• 레시피 표준화 & 매뉴얼 제작 (조리 난이도 ↓, 일관성 ↑)</p>
            <p>• 시즌별 신제품 기획, 메뉴 사진·촬영 지원</p>
          </div>
          <p className="font-semibold text-white">맛은 브랜드의 언어입니다. 일관된 맛이 곧 신뢰입니다.</p>
        </>
      ),
    },
    {
      number: 6,
      title: "법률 자문",
      subtitle: "Legal Advice",
      content: (
        <>
          <p className="font-semibold mb-4 text-white/70">가맹 계약 · 상표권 · 분쟁 예방까지, 프랜차이즈의 안전망</p>
          <p className="mb-4">
            브릭업은 외부 법률전문 자문단과 협력하여 프랜차이즈 본사가 법적 리스크 없이 성장할 수 있는 구조를
            설계합니다.
            <br />단 한 번의 실수가 브랜드 전체를 흔들 수 있기에, 브릭업은 기획 단계부터 법률을 함께 검토합니다.
          </p>
          <div className="space-y-2 mb-4">
            <p>• 가맹 계약서 / 정보공개서 작성 및 검토</p>
            <p>• 상표권 출원, 브랜드 저작물 보호 체계 구축</p>
            <p>• 가맹 분쟁 대응 메뉴얼 & 리스크 예방 컨설팅</p>
          </div>
          <p className="font-semibold text-white">법은 브랜드의 마지막 방어선입니다. 브릭업은 처음부터 대비합니다.</p>
        </>
      ),
    },
    {
      number: 7,
      title: "전국 물류망",
      subtitle: "Logistics Infrastructure",
      content: (
        <>
          <p className="font-semibold mb-4 text-white/70">원가 경쟁력 확보와 신속한 공급 체계 지원</p>
          <p className="mb-4">
            브릭업은 전국 물류 네트워크를 통해
            <br />
            브랜드가 빠르게 확장하더라도 품질과 공급의 일관성을 유지하도록 지원합니다.
            <br />
            식자재·소스·패키지 등 모든 항목을 표준화해, 가맹점이 언제 어디서나 동일한 품질의 제품을 받을 수 있게 합니다.
          </p>
          <div className="space-y-2 mb-4">
            <p>• 중앙 물류+지역 거점 복합 공급 시스템</p>
            <p>• 품목별 단가 협상 및 원가 최적화 컨설팅</p>
            <p>• 유통·보관·배송 실시간 모니터링 체계</p>
          </div>
          <p className="font-semibold text-white">물류가 안정되면, 본사는 강해지고 점주는 편해집니다.</p>
        </>
      ),
    },
  ]

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {/* Fallback background image */}
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover" priority quality={90} />

          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-[2]" />

        {/* Logo */}
        <div className="relative z-10 pt-6 lg:pt-8 px-6 lg:px-16">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/brickup-logo-wy.png" alt="Brickup" width={150} height={40} className="h-8 lg:h-10 w-auto" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-16 text-center cursor-default">
          <h1
            className="text-white text-4xl lg:text-6xl xl:text-7xl leading-tight mb-8 lg:mb-12 tracking-tight animate-fadeInDown"
            style={{ animationDelay: "0s", opacity: 0, animationFillMode: "forwards" }}
          >
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0s", opacity: 0, animationFillMode: "forwards" }}
            >
              브랜드 성장을
            </span>
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="font-light">현실</span>로 만드는
            </span>
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="inline-block px-2 font-bold relative">
                <span
                  className="relative z-10 animate-textFadeIn"
                  style={{ animationDelay: "0.9s", opacity: 0, animationFillMode: "forwards" }}
                >
                  프랜차이즈 전문 파트너
                </span>
                <span className="absolute inset-0 animate-bgSweepIn -z-10" style={{ animationDelay: "1.4s" }} />
              </span>
              <span className="text-[#FFF200]">.</span>
            </span>
          </h1>

          <p
            className="text-white/90 text-sm lg:text-base xl:text-lg max-w-3xl leading-relaxed tracking-tight animate-fadeInDown"
            style={{ animationDelay: "1.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            브릭업은 <span className="font-bold">15년 이상의 업계 경험을 가진 전문가</span>들의 모여,
            <br />
            브랜드의 초기 기획부터 전국 단위 확장까지 <span className="font-bold">토털 솔루션을 제공</span>합니다.
            <br />
            단순 영업대행이 아닌 인큐베이팅, 운영 컨설팅, 투자당 파트너십까지,
            <br />
            프랜차이즈 본사의 든든한 동반자가 되어드립니다.
          </p>
        </div>

        {/* Mouse Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FMirVar1SPNmD26ogo6FT9ChdhCfBJ.png"
              alt="Scroll"
              width={32}
              height={48}
              className="opacity-70"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative w-full min-h-screen bg-black -mt-1 py-20 lg:py-32 pb-32 lg:pb-40">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover opacity-30" />
        </div>
        <div className="absolute inset-0 bg-black/60 z-[1]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
            {/* Left Side - Title & Description */}
            <div
              ref={partnerSectionRef}
              className={`lg:sticky lg:top-32 lg:self-start transition-all duration-700 ${
                hasPartnerSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-white text-3xl lg:text-4xl font-light leading-tight mb-4 lg:mb-6">
                브랜드의 모든 과정을 함께하는
                <br />
                <span className="inline-block px-1 py-1 font-bold relative">
                  <span
                    className={`relative z-10 transition-opacity duration-700 ${
                      hasPartnerSectionAnimated ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "0.3s" }}
                  >
                    원스톱 파트너
                  </span>
                  <span
                    className={`absolute inset-0 bg-[#16469E] -z-10 transition-transform duration-700 origin-left ${
                      hasPartnerSectionAnimated ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transitionDelay: "0.5s" }}
                  />
                </span>
              </h2>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                브릭업은 프랜차이즈 사업에 필요한 전 과정 서비스를 직접 지원합니다.
                <br />
                브랜딩에서 영업, 마케팅, 인테리어, R&D, 법률, 물류까지,
                <br />
                본사가 안정적으로 성장할 수 있도록 완성형 솔루션을 제공합니다.
              </p>
            </div>

            {/* Right Side - Service Cards */}
            <div className="space-y-6 lg:space-y-8 max-w-[600px]">
              {serviceCards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className={`group border-2 border-[#357BFC] rounded-xl p-6 lg:p-8 bg-black/50 backdrop-blur-md transition-all duration-700 cursor-pointer ${
                    visibleCards.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  } hover:bg-black/70 hover:shadow-[0_0_40px_rgba(53,123,252,0.6)]`}
                >
                  <div className="flex items-baseline gap-2 mb-4 lg:mb-5">
                    <h3 className="text-white text-lg lg:text-xl font-bold group-hover:opacity-90 transition-opacity">
                      {card.number}. {card.title}{" "}
                      {card.subtitle && (
                        <sup className="text-white text-xs lg:text-sm font-normal ml-1">{card.subtitle}</sup>
                      )}
                    </h3>
                  </div>
                  <div className="text-white/40 text-xs lg:text-sm space-y-0.5 leading-snug group-hover:opacity-90 transition-opacity">
                    {card.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative w-full min-h-screen bg-black py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-black/70 z-[1]" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
          {/* Top Heading */}
          <div
            ref={statsSectionRef}
            className={`text-center mb-12 transition-all duration-700 cursor-default ${
              hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-2 animate-fadeInDown">
              1년 만에 10배 성장을 이룬 브랜드, 그 뒤에는
            </h2>
            <p className="text-white text-3xl lg:text-5xl font-light leading-tight animate-fadeInDown">
              <span className="inline-block px-2 font-bold relative">
                <span
                  className="relative z-10 animate-textFadeIn"
                  style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
                >
                  브릭업의 체계적인 솔루션
                </span>
                <span
                  className="absolute inset-0 bg-[#16469E] -z-10 animate-bgFillLTR"
                  style={{ animationDelay: "0.5s" }}
                />
              </span>
              이 있었습니다.
            </p>
          </div>

          {/* Logo Slider Section */}
          <div className="my-12">
            <LogoSlider />
          </div>

          {/* Middle Section */}
          <div
            className={`text-center mb-12 transition-all duration-700 cursor-default ${
              hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h3 className="text-white text-2xl lg:text-4xl font-light mb-4">
              <span className="font-bold border-b-4 border-[#357BFC] pb-1">브릭업</span>이 만든{" "}
              <span className="font-bold border-b-4 border-[#357BFC] pb-1">변화</span>
            </h3>
            <p className="text-white/70 text-sm lg:text-base">브릭업은 브랜드 내부의 연장선에서 함께 성장합니다.</p>
            <p className="text-white/70 text-sm lg:text-base">
              아래는 브릭업이 인큐베이팅한 OO개 프랜차이즈의 한 예시입니다.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="space-y-8 lg:space-y-12 cursor-default">
            {/* Stat 1 */}
            <div
              className={`transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <p className="text-white/60 text-sm lg:text-base mb-2">6개월만에</p>
              <h4 className="text-white text-3xl lg:text-5xl xl:text-6xl font-bold">
                전국 가맹점 <CounterAnimation end={40} duration={2000} suffix="개" className="inline-block" /> 확장
              </h4>
            </div>

            {/* Stat 2 */}
            <div
              className={`transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.6s" }}
            >
              <p className="text-white/60 text-sm lg:text-base mb-2">리뉴얼 브랜드</p>
              <h4 className="text-white text-3xl lg:text-5xl xl:text-6xl font-bold">
                평균 매출 +<CounterAnimation end={38} duration={2000} suffix="%" className="inline-block" /> 상승
              </h4>
            </div>

            {/* Stat 3 */}
            <div
              className={`transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <p className="text-white/60 text-sm lg:text-base mb-2">가맹계약서/점주분쟁</p>
              <h4 className="text-white text-3xl lg:text-5xl xl:text-6xl font-bold">
                리스크 0건, 법률자문 만족도{" "}
                <CounterAnimation end={100} duration={2000} suffix="%" className="inline-block" />
              </h4>
            </div>

            {/* Stat 4 */}
            <div
              className={`transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1s" }}
            >
              <p className="text-white/60 text-sm lg:text-base mb-2">R&D 구축 후</p>
              <h4 className="text-white text-3xl lg:text-5xl xl:text-6xl font-bold">
                재료비 감소 +<CounterAnimation end={8} duration={2000} suffix="%" className="inline-block" /> 이상
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#16469E] shadow-2xl">
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

      {/* Next Section Placeholder */}
      <div className="min-h-screen bg-black pb-24">
        <p className="p-8 text-center text-white/40">Next sections will be added here</p>
      </div>
    </div>
  )
}
