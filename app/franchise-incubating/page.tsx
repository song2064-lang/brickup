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
  const [hasProcessHeadingAnimated, setHasProcessHeadingAnimated] = useState(false)
  const processHeadingRef = useRef<HTMLDivElement>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const [isSubmittingTop, setIsSubmittingTop] = useState(false)
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false)

  const handleFormSubmit = async (formData: {
    formType: "top" | "bottom"
    type?: string // Changed from 'help' to 'type', made optional for bottom form
    company: string
    name: string
    phone: string
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
          threshold: 0.1,
          rootMargin: "100px 0px",
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

    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasProcessHeadingAnimated) {
            setHasProcessHeadingAnimated(true)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      },
    )

    if (processHeadingRef.current) {
      processObserver.observe(processHeadingRef.current)
    }

    return () => {
      observers.forEach((observer) => observer?.disconnect())
      partnerObserver.disconnect()
      statsObserver.disconnect()
      processObserver.disconnect()
    }
  }, [hasPartnerSectionAnimated, hasStatsSectionAnimated, hasProcessHeadingAnimated])

  const serviceCards = [
    {
      number: 1,
      title: "브랜딩",
      subtitle: "Branding",
      content: (
        <>
          <p className="font-semibold mb-4 text-white">로고·BI/CI·브랜드 스토리 설계</p>
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
          <p className="font-semibold mb-4 text-white">검증된 세일즈 시스템으로, 안정적이면서 속도감 있는 확장</p>
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
            <p className="font-semibold text-white">브랜드를 알리고, 점포 매출을 키우는 마케팅</p>
            <p className="font-semibold text-white">단순 홍보가 아닌, 실제 매출로 연결되는 전략</p>
          </div>
          <p className="mb-2">
            브릭업의 마케팅은 광고비 소진형이 아닙니다.
            <br />
            <span className="font-bold underline"> '가맹 확대 + 점포 매출 상승'</span>
            이라는 두 축을 동시에 달성하는 성과 중심 마케팅입니다.
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
          <p className="font-semibold mb-4 text-white">표준화된 설계 & 브랜드 아이덴티티 반영 시공</p>
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
          <p className="font-semibold mb-4 text-white">메뉴 개발 · 레시피 표준화 · 운영 매뉴얼 제작</p>
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
          <p className="font-semibold mb-4 text-white">가맹 계약 · 상표권 · 분쟁 예방까지, 프랜차이즈의 안전망</p>
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
          <p className="font-semibold mb-4 text-white">원가 경쟁력 확보와 신속한 공급 체계 지원</p>
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
            className="text-white text-sm lg:text-base xl:text-lg max-w-3xl leading-relaxed tracking-tight animate-fadeInDown"
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
              <p className="text-white text-sm lg:text-base leading-relaxed">
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
                  className={`group border-2 border-[#357BFC] rounded-xl p-6 lg:p-8 bg-black/50 backdrop-blur-md transition-all duration-500 cursor-pointer ${
                    visibleCards.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  } hover:bg-black/90 hover:scale-105 hover:border-[#4A8FFF] hover:shadow-[0_0_60px_rgba(53,123,252,0.9),0_0_100px_rgba(53,123,252,0.5)]`}
                >
                  <div className="flex items-baseline gap-2 mb-4 lg:mb-5">
                    <h3 className="text-white text-lg lg:text-xl font-bold group-hover:text-[#4A8FFF] transition-colors duration-300">
                      {card.number}. {card.title}{" "}
                      {card.subtitle && (
                        <sup className="text-white text-xs lg:text-sm font-normal ml-1">{card.subtitle}</sup>
                      )}
                    </h3>
                  </div>
                  <div className="text-white/40 text-xs lg:text-sm space-y-0.5 leading-snug group-hover:text-white/80 transition-all duration-300">
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
            className={`text-center mb-12 transition-all duration-700 ${
              hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-2 animate-fadeInDown">
              1년 만에 10배 성장을 이룬 브랜드, 그 뒤에는
            </h2>
            <p className="text-white text-3xl lg:text-5xl font-light leading-tight">
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
            className={`text-center mb-12 transition-all duration-700 ${
              hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h3 className="text-white text-2xl lg:text-4xl font-light mb-4 animate-fadeInDown">
              <span className="font-bold">브릭업</span>이 만든{" "}
              <span className="inline-block px-2 font-bold relative">
                <span
                  className="relative z-10 animate-textFadeIn"
                  style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
                >
                  변화
                </span>
                <span
                  className="absolute inset-0 bg-[#16469E] -z-10 origin-left"
                  style={{
                    animation: "bgFillLTR 0.8s ease-out forwards",
                    animationDelay: "0.5s",
                    transform: "scaleX(0)",
                  }}
                />
              </span>
            </h3>
            <p className="text-white text-sm lg:text-base animate-fadeInDown" style={{ animationDelay: "0.2s" }}>
              브릭업은 브랜드 내부의 연장선에서 함께 성장합니다.
              <br />
              아래는 브릭업이 인큐베이팅한 ○○고기 프랜차이즈의 한 예시입니다
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="flex flex-col items-center gap-5 max-w-[615px] mx-auto">
            {/* Stat 1 */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <p className="text-white font-light text-base sm:text-lg lg:text-2xl text-center sm:text-right tracking-tight">
                6개월만에
              </p>
              <h4 className="text-white font-semibold text-2xl sm:text-3xl lg:text-5xl text-center tracking-tight">
                전국 가맹점 <CounterAnimation end={40} duration={2000} suffix="개" className="inline-block" /> 확장
              </h4>
            </div>

            {/* Stat 2 */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.6s" }}
            >
              <p className="text-white font-light text-base sm:text-lg lg:text-2xl text-center sm:text-right tracking-tight">
                리뉴얼 브랜드
              </p>
              <h4 className="text-white font-semibold text-2xl sm:text-3xl lg:text-5xl text-center tracking-tight">
                평균 매출 +<CounterAnimation end={38} duration={2000} suffix="%" className="inline-block" /> 상승
              </h4>
            </div>

            {/* Stat 3 - Split text with smaller font for first part */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <p className="text-white font-light text-base sm:text-lg lg:text-xl text-center sm:text-right tracking-tight whitespace-nowrap">
                가맹계약서/점주
              </p>
              <h4 className="text-white font-semibold text-2xl sm:text-3xl lg:text-5xl text-center tracking-tight whitespace-nowrap">
                분쟁리스크 0건, 법률자문 만족도{" "}
                <CounterAnimation end={100} duration={2000} suffix="%" className="inline-block" />
              </h4>
            </div>

            {/* Stat 4 */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full transition-all duration-700 ${
                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1s" }}
            >
              <p className="text-white font-light text-base sm:text-lg lg:text-2xl text-center sm:text-right tracking-tight">
                R&D 구축 후
              </p>
              <h4 className="text-white font-semibold text-2xl sm:text-3xl lg:text-5xl text-center tracking-tight">
                재료비 감소 +<CounterAnimation end={8} duration={2000} suffix="%" className="inline-block" /> 이상
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative w-full min-h-screen bg-black py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-black/70 z-[1]" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
          {/* Section Heading - Changed from center to left alignment */}
          <div
            ref={processHeadingRef}
            className={`mb-16 cursor-default transition-all duration-700 ${
              hasProcessHeadingAnimated ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-4">
              첫 상담부터 성과 관리까지,
            </h2>
            <p className="text-white text-3xl lg:text-5xl font-light leading-tight">
              <span className="inline-block px-2 font-bold relative">
                <span className="relative z-10">모든 단계가 투명합니다</span>
                <span className="absolute inset-0 bg-[#16469E] -z-10" />
              </span>
            </p>
            <p className="text-white text-sm lg:text-base mt-6 leading-relaxed">
              상담부터 계약, 실행, 그리고 사후 관리까지,
              <br />
              모든 단계에서 파트너와 실시간으로 공유합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Card 1 - 브랜드 진단 */}
            <div className="relative h-[144px]">
              <div className="group absolute inset-0 border border-[#d9d9d966] rounded-lg p-[23px_31px] bg-transparent backdrop-blur-sm transition-all duration-500 hover:bg-[#081c3f] hover:border-[#d9d9d999] hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] cursor-pointer hover:z-50 hover:h-[308px] overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-[40px] font-normal text-[#ffffff33] leading-none tracking-[-1.6px] group-hover:text-[#b7eaff] group-hover:underline transition-all"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    1
                  </div>
                  <h3
                    className="text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    브랜드 진단
                  </h3>
                </div>

                <p
                  className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-0 group-hover:mb-4"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  잘 되는 브랜드에는 이유가 있고,
                  <br />안 되는 브랜드에는 원인이 있습니다.
                </p>

                <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500">
                  <div className="w-[40px] h-[1px] bg-white mb-4" />

                  <div className="space-y-2">
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      현재 브랜드의 매출 구조, 메뉴, 시스템을 전수 검증합니다.
                    </p>
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      같이 아닌 데이터로, 무엇이 강점이고 어디에서 왔는지 명확히 분석합니다.
                    </p>
                    <p
                      className="text-[13px] text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      브랜드 진단 리포트 제공으로,
                      <br />
                      <span className="font-bold underline">지금 우리 브랜드가</span> 어디에서 왔는지 한눈에 파악하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - 전략 설계 */}
            <div className="relative h-[144px]">
              <div className="group absolute inset-0 border border-[#d9d9d966] rounded-lg p-[23px_31px] bg-transparent backdrop-blur-sm transition-all duration-500 hover:bg-[#081c3f] hover:border-[#d9d9d999] hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] cursor-pointer hover:z-50 hover:h-[308px] overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-[40px] font-normal text-[#ffffff33] leading-none tracking-[-1.6px] group-hover:text-[#b7eaff] group-hover:underline transition-all"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    2
                  </div>
                  <h3
                    className="text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    전략 설계
                  </h3>
                </div>

                <p
                  className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-0 group-hover:mb-4"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  성공하는 브랜드는
                  <br />
                  방향이 다릅니다.
                </p>

                <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500">
                  <div className="w-[40px] h-[1px] bg-white mb-4" />

                  <div className="space-y-2">
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      브랜드의 개성을 살리되, 시장 안에서 팔리는 언어로 재정비합니다.
                      <br />
                      BI / 브랜드 메시지, 핵심 타깃, 마케팅 포인트까지 한 줄로 정리되는 브랜드 콘셉트 전략을 세웁니다.
                    </p>
                    <p
                      className="text-[13px] text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      우리의 목표: <span className="font-bold underline">사람들이 브랜드를 기억하게 만들기.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - 실행 플랜 */}
            <div className="relative h-[144px]">
              <div className="group absolute inset-0 border border-[#d9d9d966] rounded-lg p-[23px_31px] bg-transparent backdrop-blur-sm transition-all duration-500 hover:bg-[#081c3f] hover:border-[#d9d9d999] hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] cursor-pointer hover:z-50 hover:h-[308px] overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-[40px] font-normal text-[#ffffff33] leading-none tracking-[-1.6px] group-hover:text-[#b7eaff] group-hover:underline transition-all"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    3
                  </div>
                  <h3
                    className="text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    실행 플랜
                  </h3>
                </div>

                <p
                  className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-0 group-hover:mb-4"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  계획은 빠르고,
                  <br />
                  실행은 정확하게.
                </p>

                <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500">
                  <div className="w-[40px] h-[1px] bg-white mb-4" />

                  <div className="space-y-2">
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      브랜딩, 메뉴 개발, 마케팅 등 모든 실행 로드맵을 한 화면에서 관리합니다.
                    </p>
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      각 단계별 담당자 지정 + 일정 공유로 <span className="font-bold">노력, 연대, 주도권</span> 명확히
                      할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - 현장 실행 */}
            <div className="relative h-[144px]">
              <div className="group absolute inset-0 border border-[#d9d9d966] rounded-lg bg-transparent backdrop-blur-sm transition-all duration-500 hover:bg-[#081c3f] hover:border-[#d9d9d999] hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] cursor-pointer hover:z-50 hover:bottom-0 hover:top-auto hover:h-[308px] overflow-hidden">
                <div className="p-[23px_31px] group-hover:pb-[23px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[40px] font-normal text-[#ffffff33] leading-none tracking-[-1.6px] group-hover:text-[#b7eaff] group-hover:underline transition-all"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      4
                    </div>
                    <h3
                      className="text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      현장 실행
                    </h3>
                  </div>

                  <p
                    className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-0 group-hover:mb-4 transition-all"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    책상 위 전략이 아니라,
                    <br />
                    현장에서 움직입니다.
                  </p>

                  <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500">
                    <div className="w-[40px] h-[1px] bg-white mb-4" />

                    <div className="space-y-2">
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        브랜드 디자인, 매장 촬영, 오픈 홍보, 가맹 영업까지{" "}
                        <span className="font-bold">실행팀이 직접 투입</span>.
                      </p>
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        진행 상황은 <span className="font-bold">실시간 리포트로 공유</span>되며, 브랜드 담당자가{" "}
                        <span className="font-bold">즉시 확인</span>할 수 있습니다.
                      </p>
                      <p
                        className="text-[13px] text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        브릭업의 실행력 = <span className="font-bold">기획력 + 속도감 + 현장감</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - 성과 공유 */}
            <div className="relative h-[144px]">
              <div className="group absolute inset-0 border border-[#d9d9d966] rounded-lg bg-transparent backdrop-blur-sm transition-all duration-500 hover:bg-[#081c3f] hover:border-[#d9d9d999] hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] cursor-pointer hover:z-50 hover:bottom-0 hover:top-auto hover:h-[308px] overflow-hidden">
                <div className="p-[23px_31px] group-hover:pb-[23px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[40px] font-normal text-[#ffffff33] leading-none tracking-[-1.6px] group-hover:text-[#b7eaff] group-hover:underline transition-all"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      5
                    </div>
                    <h3
                      className="text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      성과 공유
                    </h3>
                  </div>

                  <p
                    className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-0 group-hover:mb-4 transition-all"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    결과는 보고가 아니라,
                    <br />
                    데이터로 보여줍니다.
                  </p>

                  <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500">
                    <div className="w-[40px] h-[1px] bg-white mb-4" />

                    <div className="space-y-2">
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        가맹점의 수, 광고 성과, 매출 지표 등 모든 결과를 수치로 공유.
                      </p>
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        이번달의 매장 첫 번째 한 눈에 볼 수 있는 <span className="font-bold">월간 성과 리포트</span>{" "}
                        제공.
                      </p>
                      <p
                        className="text-[13px] text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        브랜드의 성장을 <span className="font-bold underline">데이터 기반으로</span> 함께 결정합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 - 장기 파트너십 */}
            <div className="relative h-[144px]">
              <div className="group absolute inset-0 border border-[#d9d9d966] rounded-lg bg-transparent backdrop-blur-sm transition-all duration-500 hover:bg-[#081c3f] hover:border-[#d9d9d999] hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] cursor-pointer hover:z-50 hover:bottom-0 hover:top-auto hover:h-[308px] overflow-hidden">
                <div className="p-[23px_31px] group-hover:pb-[23px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[40px] font-normal text-[#ffffff33] leading-none tracking-[-1.6px] group-hover:text-[#b7eaff] group-hover:underline transition-all"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      6
                    </div>
                    <h3
                      className="text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      장기 파트너십
                    </h3>
                  </div>

                  <p
                    className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-0 group-hover:mb-4 transition-all"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    한번의 계약이 아니라,
                    <br />
                    오래 가는 동행.
                  </p>

                  <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500">
                    <div className="w-[40px] h-[1px] bg-white mb-4" />

                    <div className="space-y-2">
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        오픈 후에도 신메뉴 개발, 시즌 마케팅, 추가 매장 확정까지 꾸준히 함께합니다.
                      </p>
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        계약서로 끝나는 관계가 아니라, <span className="font-bold">브랜드의 옆자리에 남는 파트너</span>
                        가 되겠습니다.
                      </p>
                      <p
                        className="text-[13px] font-bold underline text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                        함께 키운 브랜드는, 함께 자랍니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="relative w-full min-h-screen bg-black py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-black/70 z-[1]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          {/* Section Heading */}
          <div className="text-center mb-16 cursor-default">
            <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-4">
              브릭업의 확연한{" "}
              <span className="inline-block px-2 font-bold relative">
                <span className="relative z-10">인큐베이팅 격차</span>
                <span className="absolute inset-0 bg-[#16469E] -z-10" />
              </span>
            </h2>
            <p className="text-white text-sm lg:text-base mt-6 leading-relaxed">
              대부분의 본사는 운영을 하지만,
              <br />
              브릭업은 <span className="font-bold">브랜드의 성장을 설계</span>합니다.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="bg-[#414141] text-white font-bold text-base lg:text-lg p-4 border-2 border-white/30">
                    구분
                  </th>
                  <th className="bg-[#414141] text-white font-bold text-base lg:text-lg p-4 border-2 border-white/30">
                    일반 프랜차이즈 본사
                  </th>
                  <th className="bg-[#414141] text-white font-bold text-base lg:text-lg p-4 border-2 border-white/30">
                    일반 인큐베이팅
                  </th>
                  <th className="bg-[#16469E] text-white font-bold text-base lg:text-lg p-4 border-2 border-white/30">
                    브릭업 <span className="text-sm font-normal">Brick-up</span>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {/* Row 1: 핵심 역할 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    핵심 역할
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    내부 인력 중심의 운영, 각 부서 분리
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    부분적 대행 또는 프로젝트 단위 컨설팅
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      기획-운영-확장 전단계를 본사와 함께 설계
                    </span>
                    합니다.
                    <br />
                    외부인이 아닌 공동운영팀 형태입니다.
                  </td>
                </tr>

                {/* Row 2: 브랜딩 / 기획력 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브랜딩 / 기획력
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    한정된 리소스, 내부 시각 중심
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    비주얼 중심 제안, 실전력 낮음
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은 시장 데이터 기반으로 브랜드의 정체성을 재설계하고,
                    <br />
                    소비자 눈높이에 맞는{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      스토리와 디자인을 동시에 설계
                    </span>
                    합니다.
                  </td>
                </tr>

                {/* Row 3: 가맹 영업 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    가맹 영업
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    본사 담당자 의존, 네트워크 한계
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    창업자 세일즈 지원
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은 본사DB와에{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      자체 DB + 영업전략시스템
                    </span>
                    으로 리드를 확보하고,
                    <br />전 과정을 실시간으로 공유합니다.
                  </td>
                </tr>

                {/* Row 4: 마케팅 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    마케팅
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    예산 부족, 단기 캠페인 위주
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    광고 위탁, ROI 불투명
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은 가맹영업과 마케팅 + 전문 매출형 마케팅을 병행합니다.
                    <br />
                    성과는 클릭이 아닌{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      실제 매출 지표로 관리
                    </span>
                    합니다.
                  </td>
                </tr>

                {/* Row 5: 운영 / 메뉴 / R&D */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    운영 / 메뉴 / R&D
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    매뉴 표준화 미흡, 운영 매뉴얼 부족
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    자문만 제공
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은 메뉴개발, 원가분석, 조리 프로세스, 운영 매뉴얼까지 구축합니다.
                    <br />
                    매장에 즉시{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      현장 적용 가능한 시스템
                    </span>
                    을 완성합니다.
                  </td>
                </tr>

                {/* Row 6: 법률 / 계약 관리 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    법률 / 계약 관리
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    내부 인력 부재, 분쟁 대응 중심
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    외부 로펌 위탁
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      계약 전 리스크 사전 진단 + 정보공개서 작성 + 상표권 점검
                    </span>
                    까지
                    <br />
                    진행합니다. 분쟁 예방 중심의 법률 프로세스 도입 내재화되어 있습니다.
                  </td>
                </tr>

                {/* Row 7: 물류 / 공급망 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    물류 / 공급망
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    각 점포마다 개별 관리,
                    <br />
                    원가 협상 못이 가격 상승 중가
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    물류 대행만 중개, 통합관리 부재
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은 전국 통합된 협력 네트워크를 통해{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">원가 경쟁력 확보</span>와
                    <br />
                    빠른 공급체계를 유지시켜 점주 만족도와 본사 신뢰도 동시 강화합니다.
                  </td>
                </tr>

                {/* Row 8: 확장성 / 지속성 */}
                <tr>
                  <td className="text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    확장성 / 지속성
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    단당자 교체나 조직 이탈 시<br />
                    시스템 유지 어려움
                  </td>
                  <td className="text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    프로젝트 종료 후 관리 부재
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브릭업은 브랜드별 관리 데시보드로 모든 데이터(영업/마케팅/가맹)를 기록,
                    <br />
                    담당자 교체에도 시스템은 유지될 수 있도록{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">브랜드의 자생력</span>을
                    기반니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full min-h-screen bg-black py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-MiSEUT7OuIl4D2nC0aiNIMXJfeaYsF.jpeg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(3, 3, 3, 0.5) 0%, rgba(3, 3, 3, 0.4) 50%, rgba(3, 3, 3, 0.3) 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">
            {/* Left Side - Title */}
            <div className="lg:sticky lg:top-32">
              <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                인큐베이팅
                <br />
                문의
              </h2>
            </div>

            <div className="p-8 lg:p-12">
              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault()

                  const formData = new FormData(e.currentTarget)
                  const helpOptions = formData.getAll("type[]") as string[]

                  // Check if at least one checkbox is selected
                  if (helpOptions.length === 0) {
                    alert("어떤 도움을 원하시는지 최소 1개 이상 선택해주세요.")
                    return
                  }

                  setIsSubmittingTop(true)

                  const form = e.currentTarget

                  const data = {
                    formType: "top" as const,
                    type: helpOptions.join(", "), // Join selected options with comma
                    company: formData.get("company") as string,
                    name: formData.get("name") as string,
                    phone: formData.get("phone") as string,
                    brand: formData.get("brand") as string,
                    message: formData.get("message") as string,
                  }

                  const success = await handleFormSubmit(data)
                  if (success && form) {
                    form.reset()
                  }
                  setIsSubmittingTop(false)
                }}
              >
                {/* Question with Checkboxes */}
                <div className="space-y-2">
                  <label className="block text-white text-sm font-medium mb-3">
                    어떤 도움을 원하시나요?(중복선택 가능) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["모두", "브랜딩", "DB마케팅", "영업대행", "R&D(메뉴개발)", "기타"].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="type[]"
                          value={option}
                          className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#16469E] focus:ring-[#16469E]"
                        />
                        <span className="text-sm text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">문의내용</label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="내용을 입력해주세요"
                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E] resize-none"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="01012345678 '-'는 제외하고 작성해주세요"
                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    회사명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="브릭업"
                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    브랜드명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    required
                    placeholder="브랜드명을 정확히 입력해주세요"
                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 mt-0.5 rounded border-white/30 bg-white text-[#16469E] focus:ring-[#16469E]"
                    />
                    <span className="text-sm text-white">
                      개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmittingTop}
                  className="w-full py-4 bg-[#16469E] text-white font-bold text-lg rounded-lg hover:bg-[#1a5bc4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingTop ? "전송 중..." : "문의하기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated background image and removed blur */}
      <section className="relative w-full h-[450px] lg:h-[480px] bg-black pb-72 lg:pb-80">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sean-pollock-PhYq704ffdA-unsplash%201-2J8K0UXOtN0ZbEV6JGJ0AKwLHxqkyQ.png"
            alt="City Background"
            fill
            className="object-cover"
          />
          {/* Removed heavy overlay - using lighter overlay to maintain text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div
          className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
          style={{ paddingTop: "56px", gap: "20px" }}
        >
          <div className="flex flex-col items-center gap-2 w-full max-w-4xl">
            <h2
              className="text-white font-bold leading-tight"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "34px",
                letterSpacing: "-1.36px",
              }}
            >
              예비창업자이신가요?
            </h2>
            <p
              className="text-white font-normal leading-tight"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "19px",
                letterSpacing: "-0.76px",
              }}
            >
              브릭업의 효과적인 프랜차이즈 매칭 서비스를 경험해보세요.
            </p>
          </div>

          <Link href="/franchise-matching">
            <button
              className="flex items-center justify-center bg-[#16469E] text-white font-medium rounded-full hover:bg-[#1a5bc4] transition-colors shadow-lg"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "17px",
                letterSpacing: "-0.68px",
                width: "145px",
                height: "42px",
                padding: "8px 12px",
              }}
            >
              지금 신청하세요
            </button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 py-6 px-6 lg:px-[130px] mb-40 lg:mb-48">
          {/* Horizontal line at top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />

          <div className="relative pt-5">
            {/* Logo - clickable, links to / */}
            <Link href="/" className="absolute left-0 hover:opacity-80 transition-opacity" style={{ top: "20px" }}>
              <Image src="/brickup-logo-ww.png" alt="Brickup" width={120} height={31} className="w-[120px] h-auto" />
            </Link>

            {/* Footer Content - Two rows with left and right alignment */}
            <div
              className="absolute left-0 right-0 space-y-2"
              style={{
                top: "65px",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              {/* Row 1: Business Registration (left) + Copyright (right) */}
              <div className="flex items-center justify-between">
                <p
                  className="font-normal text-[#e0e0e0]"
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "-0.56px",
                    lineHeight: "normal",
                  }}
                >
                  사업자등록번호 : 000000000&nbsp;&nbsp; I&nbsp;&nbsp; 법인등록번호 : 0000000
                </p>
                <p
                  className="text-[#e0e0e0] font-normal"
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "-0.56px",
                    lineHeight: "normal",
                  }}
                >
                  Copyright © Brickup Inc. All Rights Reserved.
                </p>
              </div>

              {/* Row 2: Address/Email (left) + Links (right) */}
              <div className="flex items-center justify-between">
                <p
                  className="font-normal text-[#e0e0e0]"
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "-0.56px",
                    lineHeight: "normal",
                  }}
                >
                  서울시 금천구 벚꽃로 234 에이스하이엔드6차 804호&nbsp;&nbsp; I&nbsp;&nbsp; brickup@naver.com
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="text-[#e0e0e0] font-normal hover:text-white transition-colors whitespace-nowrap cursor-pointer bg-transparent border-none p-0"
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      letterSpacing: "-0.56px",
                      lineHeight: "normal",
                    }}
                  >
                    이용약관
                  </button>
                  <div className="w-[1px] h-[10px] bg-[#e0e0e0]" />
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-[#e0e0e0] font-normal hover:text-white transition-colors whitespace-nowrap cursor-pointer bg-transparent border-none p-0"
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      letterSpacing: "-0.56px",
                      lineHeight: "normal",
                    }}
                  >
                    개인정보처리방침
                  </button>
                  <div className="w-[1px] h-[10px] bg-[#e0e0e0]" />
                  <Link
                    href="#"
                    className="text-[#e0e0e0] font-normal hover:text-white transition-colors whitespace-nowrap"
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      letterSpacing: "-0.56px",
                      lineHeight: "normal",
                    }}
                  >
                    사업자정보확인
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar - Fixed validation cutoff issues */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#16469E] shadow-2xl overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:block w-full max-w-[1920px] mx-auto px-4 py-4">
          <form
            className="flex items-center gap-3 w-full"
            onSubmit={async (e) => {
              e.preventDefault()

              const formData = new FormData(e.currentTarget)
              const brand = formData.get("brand") as string
              const company = formData.get("company") as string
              const name = formData.get("name") as string
              const phone = formData.get("phone") as string
              const privacyConsent = formData.get("privacy") as string

              if (!brand || !brand.trim()) {
                alert("브랜드명을 입력해주세요.")
                return
              }
              if (!company || !company.trim()) {
                alert("회사명을 입력해주세요.")
                return
              }
              if (!name || !name.trim()) {
                alert("성함을 입력해주세요.")
                return
              }
              if (!phone || !phone.trim()) {
                alert("연락처를 입력해주세요.")
                return
              }
              if (!privacyConsent) {
                alert("개인정보 수집 및 이용에 동의해주세요.")
                return
              }

              setIsSubmittingBottom(true)

              const form = e.currentTarget

              const data = {
                formType: "bottom" as const,
                name,
                phone,
                company,
                brand,
                message: "하단 문의 바를 통한 문의",
                // Removed 'type' field from here as it's not part of the bottom form
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
            <div className="flex-1 flex items-center gap-2 min-w-0">
              {/* Brand Name Input */}
              <input
                type="text"
                name="brand"
                placeholder="브랜드명"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-sm flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Company Input */}
              <input
                type="text"
                name="company"
                placeholder="회사명"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-sm flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Name Input */}
              <input
                type="text"
                name="name"
                placeholder="성함"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-sm flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Contact Input */}
              <input
                type="tel"
                name="phone"
                placeholder="연락처"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-sm flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-[#fff200]"
              />

              {/* Privacy Consent Checkbox */}
              <label className="flex items-center gap-2 text-white text-xs whitespace-nowrap cursor-pointer flex-shrink-0">
                <input type="checkbox" name="privacy" value="agreed" className="w-4 h-4 rounded flex-shrink-0" />
                개인정보 동의
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingBottom}
                className="px-6 py-2.5 bg-[#fff200] text-[#16469E] font-bold text-sm rounded hover:bg-[#ffed00] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isSubmittingBottom ? "전송 중..." : "✉ 문의하기"}
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-3 w-full overflow-hidden">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={async (e) => {
              e.preventDefault()

              const formData = new FormData(e.currentTarget)
              const brand = formData.get("brand") as string
              const company = formData.get("company") as string
              const name = formData.get("name") as string
              const phone = formData.get("phone") as string
              const privacyConsent = formData.get("privacy") as string

              if (!brand || !brand.trim()) {
                alert("브랜드명을 입력해주세요.")
                return
              }
              if (!company || !company.trim()) {
                alert("회사명을 입력해주세요.")
                return
              }
              if (!name || !name.trim()) {
                alert("성함을 입력해주세요.")
                return
              }
              if (!phone || !phone.trim()) {
                alert("연락처를 입력해주세요.")
                return
              }
              if (!privacyConsent) {
                alert("개인정보 수집 및 이용에 동의해주세요.")
                return
              }

              setIsSubmittingBottom(true)

              const form = e.currentTarget

              const data = {
                formType: "bottom" as const,
                name,
                phone,
                company,
                brand,
                message: "하단 문의 바를 통한 문의 (모바일)",
                // Removed 'type' field from here as it's not part of the bottom form
              }

              const success = await handleFormSubmit(data)
              if (success && form) {
                form.reset()
              }
              setIsSubmittingBottom(false)
            }}
          >
            {/* First Row: Brand and Company */}
            <div className="flex gap-2 w-full">
              <input
                type="text"
                name="brand"
                placeholder="브랜드명"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />

              <input
                type="text"
                name="company"
                placeholder="회사명"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />
            </div>

            {/* Second Row: Name and Contact */}
            <div className="flex gap-2 w-full">
              <input
                type="text"
                name="name"
                placeholder="성함"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="연락처"
                className="px-3 py-2.5 rounded bg-white text-[#414141] text-xs flex-1 min-w-0 focus:outline-none"
              />
            </div>

            {/* Third Row: Checkbox and Button */}
            <div className="flex items-center gap-2 w-full">
              <label className="flex items-center gap-1.5 text-white text-xs cursor-pointer whitespace-nowrap flex-shrink-0">
                <input
                  type="checkbox"
                  name="privacy"
                  value="agreed"
                  className="w-3.5 h-3.5 rounded border-white flex-shrink-0"
                />
                개인정보 동의
              </label>

              <button
                type="submit"
                disabled={isSubmittingBottom}
                className="flex-1 py-2.5 bg-[#fff200] text-[#16469E] font-bold text-sm rounded hover:bg-[#ffed00] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingBottom ? "전송 중..." : "문의하기"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">이용약관</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="text-sm text-gray-700 space-y-4">
                <p>이용약관 내용이 여기에 표시됩니다.</p>
                <p>서비스 이용에 관한 약관, 권리와 의무, 면책 조항 등이 포함됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">개인정보처리방침</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="text-sm text-gray-700 space-y-4">
                <p>
                  회사명(이하 '회사'라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한
                  고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립,
                  공개합니다.
                </p>

                <div>
                  <p className="font-semibold mb-2">제1조 (개인정보의 처리목적)</p>
                  <p className="mb-2">
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                    용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를
                    받는 등 필요한 조치를 이행할 예정입니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">제2조 (개인정보의 처리 및 보유기간)</p>
                  <p>
                    회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은
                    개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">제3조 (개인정보의 제3자 제공)</p>
                  <p>
                    회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며,
                    정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제 18조에 해당하는 경우에만
                    개인정보를 제3자에게 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
