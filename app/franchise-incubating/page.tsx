"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { CounterAnimation } from "@/components/counter-animation"
import { LogoSlider } from "@/components/logo-slider"
import { ChevronDown } from "lucide-react" // Assuming ChevronDown is imported from lucide-react

// Define the structure for mobile service sections
interface MobileServiceSection {
  title: string
  content: string
}

// Define the structure for mobile services
interface MobileService {
  number: number
  title: string
  subtitle: string
  preview: string
  sections: MobileServiceSection[]
  highlight?: string
}

export default function FranchiseIncubatingPage() {
    const router = useRouter()
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hasPartnerSectionAnimated, setHasPartnerSectionAnimated] = useState(false)
  const partnerSectionRef = useRef<HTMLDivElement>(null) // This is the only ref needed for the partner section
  const [hasStatsSectionAnimated, setHasStatsSectionAnimated] = useState(false)
  const statsSectionRef = useRef<HTMLDivElement>(null)
  const [hasProcessHeadingAnimated, setHasProcessHeadingAnimated] = useState(false)
  const processHeadingRef = useRef<HTMLDivElement>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const [expandedMobileCard, setExpandedMobileCard] = useState<number | null>(null) // Renamed from expandedCards

  const [isSubmittingTop, setIsSubmittingTop] = useState(false)
  const [isSubmittingBottom, setIsSubmittingBottom] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleAllCheckbox = (checked: boolean) => {
    if (checked) {
      setSelectedTypes(["모두", "브랜딩", "DB마케팅", "영업대행", "R&D(메뉴개발)", "기타"])
    } else {
      setSelectedTypes([])
    }
  }

  const handleIndividualCheckbox = (option: string, checked: boolean) => {
    if (checked) {
      const newSelected = [...selectedTypes, option]
      // If all individual options are selected, also check "모두"
      const allOptions = ["브랜딩", "DB마케팅", "영업대행", "R&D(메뉴개발)", "기타"]
      if (allOptions.every((opt) => newSelected.includes(opt))) {
        setSelectedTypes([...newSelected, "모두"])
      } else {
        setSelectedTypes(newSelected)
      }
    } else {
      // If unchecking, also uncheck "모두"
      setSelectedTypes(selectedTypes.filter((t) => t !== option && t !== "모두"))
    }
  }

  const [expandedTableItems, setExpandedTableItems] = useState<number[]>([])

  const toggleTableItem = (index: number) => {
    setExpandedTableItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // State for mobile card accordion (only one open at a time)
  const [openMobileServiceCard, setOpenMobileServiceCard] = useState<number | null>(null)
  // State for mobile comparison accordion (only one open at a time)
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null)

  const comparisonData = [
    {
      title: "핵심 역할",
      general: "내부 인력 중심의 운영,\n 각 부서 분리",
      incubating: "부분적 대행 또는 프로젝트 단위 컨설팅",
      brickup: "부분적 대행 또는\n" +
          "프로젝트 단위 컨설팅",
      highlight: "기획-운영-확장 전단계를 본사와 함께 설계",
        brickupDetail1: "브릭업은 기획-운영-확장\n",
        brickupDetail2: "전단계를 본사와 함께 설계",
        brickupDetail3: "합니다.\n외부인력이 아닌 공동운영팀 형태로 컨설팅합니다.",
    },
    {
      title: "브랜딩 / 기획력",
      general: "한정된 리소스,\n 내부 시각 중심",
      incubating: "비주얼 중심 제안, 실전력 낮음",
      brickup: "비주얼 중심 제안,\n 실현력 낮음",
      highlight: "스토리와 디자인을 동시에 설계",
        brickupDetail1: "브릭업은 시장 데이터 기반으로\n" +
            "브랜드의 정체성을 재정립하고,\n" +
            "소비자 눈높이에 맞는 ",
        brickupDetail2: "스토리와 디자인을 동시에\n설계",
        brickupDetail3: " 합니다.",

    },
    {
      title: "가맹 영업",
      general: "본사 담당자 의존,\n 네트워크 한계",
      incubating: "잠깐의 세일즈 지원",
      brickup: "잠깐의 세일즈 지원",
      highlight: "자체 DB + 영업전략시스템",
        brickupDetail1: "브릭업은 본사DB외에 ",
        brickupDetail2: "자체 DB + 영업전략시스템\n",
        brickupDetail3: "으로 리드를 확보하고,\n" +
            "전 과정을 실시간으로 공유합니다.",
    },
    {
      title: "마케팅",
      general: "예산 부족, 단기 캠페인 위주",
      incubating: "광고 위탁, ROI 불투명",
      brickup:
        "광고 위탁, ROI 불투명",
      highlight: "실제 매출 지표로 관리",
        brickupDetail1: "브릭업은 가맹영업형 마케팅 + 점포 매출형 마케팅을\n병행합니다.\n성과는 클릭이 아닌 ",
        brickupDetail2: "실제 매출 지표로 관리",
        brickupDetail3: "합니다.",
    },
    {
      title: "운영 / 메뉴 / R&D",
      general: "메뉴 표준화 미흡,\n운영 매뉴얼 부족",
      incubating: "자문만 제공",
      brickup:
        "자문만 제공",
      highlight: "현장 적용 가능한 시스템",
        brickupDetail1: "브릭업은 메뉴개발, 원가분석, 조리 프로세스,\n" +
    "운영 매뉴얼까지 구축합니다.\n" +
    "매장에 즉시 ",
        brickupDetail2: "‘현장 적용 가능한 시스템’",
        brickupDetail3: "을 완성합니다.",
    },
    {
      title: "법률 / 계약 관리",
      general: "내부 인력 부재,\n분쟁 대응 중심",
      incubating: "외부 로펌 위탁",
      brickup: "외부 로펌 위탁",
      highlight: "계약 전 리스크 사전 진단 + 정보공개서 작성 + 상표권 점검",
        brickupDetail1: "브릭업은 ",
        brickupDetail2: "계약 전 리스크 사전 진단 +\n정보공개서 작성 + 상표권 점검",
        brickupDetail3: "까지 진행합니다.\n" +
            "분쟁 예방 중심의 법률 프로세스 또한\n" +
            "내재화되어 있습니다.",
    },
    {
      title: "물류 / 공급망",
      general: "각 협력업체 개별 관리,\n" +
          "원가 변동 폭이 커서\n점주 불만 증가",
      incubating: "물류 대행만 중개, 통합관리 부재",
      brickup:
        "물류 대행만 중개,\n통합관리 부재",
      highlight: "원가 경쟁력 확보",
        brickupDetail1: "브릭업은 전국 물류망 협력 네트워크를 통해\n",
        brickupDetail2: "원가 경쟁력 확보",
        brickupDetail3: "와\n" +
            "빠른 공급체계를 유지시켜 점주 만족도와\n" +
            "본사 신뢰도 동시 강화됩니다.",
    },
    {
      title: "확장성 / 지속성",
      general: "담당자 교체나 조직 이탈 시\n" +
          "시스템 유지 어려움",
      incubating: "프로젝트 종료 후 관리 부재",
      brickup:
        "프로젝트 종료 후\n관리 부재",
      highlight: "브랜드의 자생력",
        brickupDetail1: "브릭업은 브랜드별 관리 대시보드로 모든 데이터\n" +
            "(영업·마케팅·가맹)를 기록,\n" +
            "담당자 교체에도 시스템은 유지될 수 있도록 하여\n",
        brickupDetail2: "브랜드의 자생력",
        brickupDetail3: "을 키웁니다.",
    },
  ]

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
        body: JSON.JSONstringify(formData),
      })

      alert("문의가 정상적으로 접수되었습니다!")
      return true
    } catch (error) {
      console.error("Form submission error:", error)
      alert("문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.")
      return false
    }
  }

  // Refs for mobile service cards
  const mobileServiceRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleMobileServices, setVisibleMobileServices] = useState<number[]>([])

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

    const mobileServiceObservers = mobileServiceRefs.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleMobileServices((prev) => {
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
          rootMargin: "50px 0px",
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
      // Disconnect mobile service observers
      mobileServiceObservers.forEach((observer) => observer?.disconnect())
      partnerObserver.disconnect()
      statsObserver.disconnect()
      processObserver.disconnect()
    }
  }, [hasPartnerSectionAnimated, hasStatsSectionAnimated, hasProcessHeadingAnimated])

  const mobileServiceCardsData: MobileService[] = [
    {
      number: 1,
      title: "브랜딩",
      subtitle: "Branding",
      preview: "단순히 예쁜 브랜드가 아니라,<br/>시장에서 '기억되는' 브랜드를 만듭니다",
      sections: [
        {
          title: "로고·BI/CI·브랜드 스토리 설계",
          content:
            "브릭업의 브랜딩은 단순한 디자인이 아니라, 시장에서 통하는 '브랜드 언어'를 만드는 과정입니다. 로고, 컬러, 슬로건, 매장 톤앤매너 등 시각적 요소뿐 아니라, 브랜드가 소비자에게 어떤 감정과 경험을 남길지까지 설계합니다.",
        },
        { title: "BI/CI개발", content: "브랜드의 아이덴티티를 한눈에 각인시키는 시각 시스템 구축" },
        { title: "브랜드 스토리텔링", content: "창업자 철학과 시장 포지셔닝을 연결하는 내러티브 구성" },
        { title: "커뮤니케이션&톤앤매너", content: "메뉴, 인테리어, 포스터 등 전체 컨셉의 일관화" },
      ],
      highlight: "단순히 예쁜 브랜드가 아니라,<br/>시장에서 '기억되는' 브랜드를 만듭니다.",
    },
    {
      number: 2,
      title: "가맹 영업",
      subtitle: "Franchise Development",
      preview: "단순한 영업이 아닌,<br/>브랜드의 '확장 전략'을 설계합니다",
      sections: [
        {
          title: "검증된 세일즈 시스템으로, 안정적이면서 속도감 있는 확장",
          content:
            "브릭업은 영업 경험만 많은 회사가 아닙니다. 수 백개 브랜드의 데이터 기반 세일즈 메뉴얼을 보유한 전문 조직입니다. 창업자와 본사가 함께 성장할 수 있는 정직하고 효율적인 가맹 확장 구조를 만듭니다.",
        },
        { title: "리드 DB 확보 & 상담 시스템 구축", content: "" },
        { title: "상권·입지·예산 매칭형 영업 프로세스", content: "" },
        { title: "가맹 상담~계약~오픈까지 실시간 관리 시스템", content: "" },
      ],
      highlight: "단순한 영업이 아닌,<br/>브랜드의 '확장 전략'을 설계합니다.",
    },
    {
      number: 3,
      title: "마케팅",
      subtitle: "Marketing",
      preview: "우리는 노출이 아니라, 매출로 증명합니다.",
      sections: [
        { title: "브랜드를 알리고, 점포 매출을 키우는 마케팅", content: "단순 홍보가 아닌, 실제 매출로 연결되는 전략" },
        {
          title: "성과 중심 마케팅",
          content:
            "브릭업의 마케팅은 광고비 소진형이 아닙니다. '가맹 확대 + 점포 매출 상승'이라는 두 축을 동시에 달성하는 성과 중심 마케팅입니다.",
        },
        { title: "브랜드 인지도 확장", content: "SNS, 유튜브, 언론 홍보, 브랜드 영상" },
        { title: "가맹 영업 마케팅", content: "창업박람회, 제휴채널 등" },
        { title: "매장 매출형 마케팅", content: "지역광고·배달앱·쿠폰·이벤트·리뷰 콘텐츠 운영" },
        { title: "성과 리포트 제공", content: "CPC/CPA 기반 전환율 분석으로 실질 ROI 관리" },
      ],
      highlight: "우리는 노출이 아니라,<br/>매출로 증명합니다.",
    },
    {
      number: 4,
      title: "인테리어",
      subtitle: "Interior",
      preview: "브랜드의 얼굴을 만드는 디자인,<br/>본사와 점주 모두가 만족하는 시공",
      sections: [
        {
          title: "표준화된 설계 & 브랜드 아이덴티티 반영 시공",
          content:
            "브릭업의 인테리어는 감각과 시스템을 동시에 잡은 설계입니다. 브랜드 콘셉트와 동선, 운영 효율, 고객 경험까지 반영해 가맹점주 입장에서도 비용 효율적이며 유지보수가 쉬운 구조를 만듭니다.",
        },
        { title: "브랜드 아이덴티티 기반 설계 메뉴얼 제작", content: "" },
        { title: "표준 도면 + 실측 커스터마이징 반영 시공", content: "" },
        { title: "전국 단위 협력 시공망 운영으로 원가 절감", content: "" },
      ],
      highlight: "브랜드의 얼굴을 만드는 디자인,<br/>본사와 점주 모두가 만족하는 시공",
    },
    {
      number: 5,
      title: "R&D",
      subtitle: "",
      preview: "맛은 브랜드의 언어입니다.<br/>일관된 맛이 곧 신뢰입니다",
      sections: [
        {
          title: "메뉴 개발·레시피 표준화·원가 관리·품질 유지",
          content:
            "브릭업의 R&D는 단순히 맛있는 메뉴를 만드는 것이 아닙니다. 전국 어디서나 동일한 맛을 구현할 수 있는 '재현 가능한 레시피'를 설계하고, 원가 효율과 조리 난이도까지 고려한 메뉴 시스템을 만듭니다.",
        },
        { title: "시장 트렌드 반영 메뉴 기획 & 테스트", content: "" },
        { title: "레시피 표준화 및 조리 매뉴얼 제작", content: "" },
        { title: "원가 분석 & 수익성 시뮬레이션", content: "" },
        { title: "시즌 메뉴·신메뉴 지속 개발 지원", content: "" },
      ],
      highlight: "맛은 브랜드의 언어입니다.<br/>일관된 맛이 곧 신뢰입니다.",
    },
    {
      number: 6,
      title: "법률 자문",
      subtitle: "Legal advice",
      preview: "법은 브랜드의 마지막 방어선입니다.<br/>브릭업은 처음부터 대비합니다.",
      sections: [
        {
          title: "가맹사업법 준수 & 분쟁 예방 시스템",
          content:
            "프랜차이즈는 법적 리스크가 가장 큰 사업 중 하나입니다. 브릭업은 가맹사업법 전문 법무법인과 협력하여, 정보공개서 작성부터 계약서 검토, 분쟁 예방 시스템까지 전 과정을 법적으로 안전하게 설계합니다.",
        },
        { title: "정보공개서 작성 및 등록 대행", content: "" },
        { title: "가맹계약서·표준 운영 매뉴얼 법률 검토", content: "" },
        { title: "점주 분쟁 예방 시스템 구축", content: "" },
        { title: "상표권·지식재산권 보호 자문", content: "" },
      ],
      highlight: "법은 브랜드의 마지막 방어선입니다.<br/>브릭업은 처음부터 대비합니다.",
    },
    {
      number: 7,
      title: "전국 물류망",
      subtitle: "Logistics infrastructure",
      preview: "물류가 안정되면, 본사는 강해지고<br/>점주는 편해집니다.",
      sections: [
        {
          title: "전국 단위 물류 시스템 구축 & 운영 지원",
          content:
            "프랜차이즈 본사의 경쟁력은 '안정적인 물류'에서 나옵니다. 브릭업은 전국 단위 물류 네트워크를 보유하고 있으며, 식자재·포장재·소모품까지 통합 관리하여 본사와 점주 모두의 부담을 줄입니다.",
        },
        { title: "전국 단위 협력 물류사 네트워크 구축", content: "" },
        { title: "식자재·포장재 공급 시스템 설계", content: "" },
        { title: "재고 관리 & 발주 시스템 운영 지원", content: "" },
        { title: "원가 절감형 공동 구매 시스템", content: "" },
      ],
      highlight: "물류가 안정되면, 본사는 강해지고<br/>점주는 편해집니다.",
    },
  ]
  const serviceCards = [
    {
      number: 1,
      title: "브랜딩",
      subtitle: "Branding",
      content: (
        <>
          <p className="font-semibold mb-4 text-white" style={{ fontSize: "16px" }} >로고·BI/CI·브랜드 스토리 설계</p>
          <p className="mb-0.5">
            브릭업의 브랜딩은 단순한 디자인이 아니라, 시장에서 통하는 '브랜드 언어'를
          </p>
            <p className="mb-0.5">만드는 과정입니다.</p>
          <p className="mb-0.5">
            로고, 컬러, 슬로건, 매장 톤앤매너 등 시각적 요소뿐 아니라, 브랜드가 소비자에게</p>
            <p className="mb-2">어떤 감정과 경험을 남길지까지 설계합니다.<br/></p>
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
          <p className="font-semibold text-white" style={{ fontSize: "16px" }} >
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
          <p className="font-semibold mb-4 text-white" style={{ fontSize: "16px" }}>검증된 세일즈 시스템으로, 안정적이면서 속도감 있는 확장</p>
          <p className="mb-0.5">브릭업은 영업 경험만 많은 회사가 아닙니다.</p>
          <p className="mb-0.5">수 백개 브랜드의 데이터 기반 세일즈 메뉴얼을 보유한 전문 조직입니다.</p>
          <p className="mb-2">창업자와 본사가 함께 성장할 수 있는 정직하고 효율적인 가맹 확장 구조를 만듭니다.</p>
          <div className="space-y-0.5 mb-2">
            <p>• 리드 DB 확보 & 상담 시스템 구축</p>
            <p>• 상권·입지·예산 매칭형 영업 프로세스</p>
            <p>• 가맹 상담~계약~오픈까지 실시간 관리 시스템</p>
          </div>
          <p className="font-semibold text-white" style={{ fontSize: "16px" }}>단순한 영업이 아닌, 브랜드의 '확장 전략'을 설계합니다.</p>
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
            <p className="font-semibold text-white" style={{ fontSize: "16px" }}>브랜드를 알리고, 점포 매출을 키우는 마케팅</p>
            <p className="font-semibold text-white" style={{ fontSize: "16px" }}>단순 홍보가 아닌, 실제 매출로 연결되는 전략</p>
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
          <p className="font-semibold text-white mt-4" style={{ fontSize: "16px" }}>우리는 노출이 아니라, 매출로 증명합니다.</p>
        </>
      ),
    },
    {
      number: 4,
      title: "인테리어",
      subtitle: "Interior",
      content: (
        <>
          <p className="font-semibold mb-4 text-white" style={{ fontSize: "16px" }}>표준화된 설계 & 브랜드 아이덴티티 반영 시공</p>
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
          <p className="font-semibold text-white" style={{ fontSize: "16px" }}>브랜드의 얼굴을 만드는 디자인, 본사와 점주 모두가 만족하는 시공</p>
        </>
      ),
    },
    {
      number: 5,
      title: "R&D",
      subtitle: "",
      content: (
        <>
          <p className="font-semibold mb-4 text-white" style={{ fontSize: "16px" }}>메뉴 개발 · 레시피 표준화 · 운영 매뉴얼 제작</p>
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
          <p className="font-semibold text-white" style={{ fontSize: "16px" }}>맛은 브랜드의 언어입니다. 일관된 맛이 곧 신뢰입니다.</p>
        </>
      ),
    },
    {
      number: 6,
      title: "법률 자문",
      subtitle: "Legal Advice",
      content: (
        <>
          <p className="font-semibold mb-4 text-white" style={{ fontSize: "16px" }}>가맹 계약 · 상표권 · 분쟁 예방까지, 프랜차이즈의 안전망</p>
          <p className="mb-4">
            브릭업은 외부 법률전문 자문단과 협력하여<br/> 프랜차이즈 본사가 법적 리스크 없이 성장할 수 있는 구조를
            설계합니다.
            <br />단 한 번의 실수가 브랜드 전체를 흔들 수 있기에,<br/> 브릭업은 기획 단계부터 법률을 함께 검토합니다.
          </p>
          <div className="space-y-2 mb-4">
            <p>• 가맹 계약서 / 정보공개서 작성 및 검토</p>
            <p>• 상표권 출원, 브랜드 저작물 보호 체계 구축</p>
            <p>• 가맹 분쟁 대응 메뉴얼 & 리스크 예방 컨설팅</p>
          </div>
          <p className="font-semibold text-white" style={{ fontSize: "16px" }}>법은 브랜드의 마지막 방어선입니다. 브릭업은 처음부터 대비합니다.</p>
        </>
      ),
    },
    {
      number: 7,
      title: "전국 물류망",
      subtitle: "Logistics Infrastructure",
      content: (
        <>
          <p className="font-semibold mb-4 text-white" style={{ fontSize: "16px" }}>원가 경쟁력 확보와 신속한 공급 체계 지원</p>
          <p className="mb-4">
            브릭업은 전국 물류 네트워크를 통해
            <br />
            브랜드가 빠르게 확장하더라도 품질과 공급의 일관성을 유지하도록 지원합니다.
            <br />
            식자재·소스·패키지 등 모든 항목을 표준화해,
              <br/>
              가맹점이 언제 어디서나 동일한 품질의 제품을 받을 수 있게 합니다.
          </p>
          <div className="space-y-2 mb-4">
            <p>• 중앙 물류+지역 거점 복합 공급 시스템</p>
            <p>• 품목별 단가 협상 및 원가 최적화 컨설팅</p>
            <p>• 유통·보관·배송 실시간 모니터링 체계</p>
          </div>
          <p className="font-semibold text-white" style={{ fontSize: "16px" }}>물류가 안정되면, 본사는 강해지고 점주는 편해집니다.</p>
        </>
      ),
    },
  ]
  // State and handler for mobile card expansion
  const [expandedCards, setExpandedCards] = useState<boolean[]>(mobileServiceCardsData.map(() => false))

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => prev.map((expanded, i) => (i === index ? !expanded : expanded)))
  }

  const toggleAccordion = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index)
  }

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Hero Section - Desktop (unchanged from v3) */}
      <section className="hidden lg:flex relative w-full h-screen flex-col overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {/* Fallback background image */}
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover" quality={90} priority />

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
            브랜드의 초기 기획부터 전국 단위 확장까지 <span className="font-bold">토탈 솔루션을 제공</span>합니다.
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

      {/* Hero Section - Mobile Only */}
      <section className="lg:hidden relative w-full h-screen flex flex-col overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover" quality={90} priority />
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-[2]" />

        {/* Logo */}
        <div className="relative z-10 pt-6 px-6">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/brickup-logo-wy.png" alt="Brickup" width={150} height={40} className="h-8 w-auto" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center cursor-default">
          <h1
            className="text-white mb-6 tracking-tight animate-fadeInDown"
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
              브랜드 성장을
            </span>
            <span
              className="block animate-fadeInDown mb-1"
              style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
            >
              현실로 만드는
            </span>
            <span
              className="block animate-fadeInDown"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="inline-block font-bold relative">
                <span
                  className="relative z-10 animate-textFadeIn px-2 py-0.5"
                  style={{
                    animationDelay: "0.9s",
                    opacity: 0,
                    animationFillMode: "forwards",
                  }}
                >
                  프랜차이즈 전문 파트너
                </span>
                <span
                  className="absolute inset-0 animate-bgSweepIn -z-10 bg-[#16469E]"
                  style={{ animationDelay: "1.4s", top: "1px", bottom: "1px" }}
                />
              </span>
              <span className="font-bold text-yellow-400">.</span>
            </span>
          </h1>

          <p
            className="text-white max-w-3xl tracking-tight animate-fadeInDown"
            style={{
              fontSize: "15px",
              lineHeight: "1.6",
              animationDelay: "1.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            브릭업은 <span className="font-bold">15년 이상의 업계 경험을 가진 전문가</span>들이 모여,
            <br />
            브랜드의 초기 기획부터 전국 단위 확장까지 <span className="font-bold">토탈 솔루션을 제공</span>합니다.
            <br />
            단순 영업대행이 아닌 인큐베이팅, 운영 컨설팅, 투자형 파트너십까지,
            <br />
            프랜차이즈 본사의 든든한 동반자가 되어드립니다.
          </p>
        </div>

        {/* Mouse Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <Image src="/arrow-down-mobile.png" alt="Scroll" width={32} height={48} className="opacity-70" />
          </div>
        </div>
      </section>

      {/* Services Section - Desktop (with updates) */}
      <section className="hidden lg:block relative w-full min-h-screen bg-black -mt-1 py-20 lg:py-32 pb-32 lg:pb-40">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/incubating-hero.jpg" alt="Background" fill className="object-cover opacity-30" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1/2 z-[1]">
          <Image src="/gradient-bg-services.png" alt="Gradient" fill className="object-cover object-left opacity-70" />
        </div>
        <div className="absolute inset-0 bg-black/60 z-[2]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
            {/* Left Side - Title & Description */}
            <div
              ref={partnerSectionRef} // Changed ref name to partnerSectionDesktopRef
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
                본사가 안정적으로 성장할 수 있도록 완성형 솔루루션을 제공합니다.
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
                  className={`group border-2 border-[#357BFC] rounded-xl p-6 lg:p-8 bg-black/50 backdrop-blur-md transition-all duration-700 cursor-pointer lg:opacity-100 lg:translate-x-0 ${
                    visibleCards.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  } hover:bg-black/90 hover:scale-105 hover:border-[#4A8FFF] hover:shadow-[0_0_60px_rgba(53,123,252,0.9),0_0_100px_rgba(53,123,252,0.5)]`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-baseline gap-2 mb-4 lg:mb-5">
                    <h3 className="text-white text-lg lg:text-xl font-bold group-hover:text-[#4A8FFF] transition-colors duration-300" style={{ fontSize: "24px"}}>
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

      {/* Services Section - Mobile Only */}
      <section className="lg:hidden relative w-full min-h-screen bg-black -mt-1 py-20 pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Image src="/gradient-bg-services.png" alt="Gradient" fill className="object-cover object-left opacity-100" />
        </div>
        <div className="absolute inset-0 bg-black/60 z-[1]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          {/* Title & Description */}
          <div className="mb-12">
            <h2
              className="text-white font-light leading-tight mb-4 animate-fadeInDown"
              style={{ fontSize: "26px", animationDelay: "0s", opacity: 0, animationFillMode: "forwards" }}
            >
              브랜드의
              <br />
              모든 과정을 함께하는
              <br />
              <span className="inline-block px-1 py-1 font-bold relative">
                <span className="relative z-10" style={{ transitionDelay: "0.3s" }}>
                  원스톱 파트너
                </span>
                <span className="absolute inset-0 bg-[#16469E] -z-10" />
              </span>
            </h2>
            <p
              className="text-white text-sm leading-relaxed animate-fadeInDown"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              브릭업은 프랜차이즈 사업에 필요한
                <br />
                전 과정 서비스를 직접 지원합니다.
              <br />
              브랜딩에서 영업, 마케팅, 인테리어, R&D, 법률, 물류까지,
              <br />
              본사가 안정적으로 성장할 수 있도록
                <br />완성형 솔루루션을 제공합니다.
            </p>
          </div>

          {/* Mobile Service Section */}
          <div className="lg:hidden space-y-4">
            {mobileServiceCardsData.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) mobileServiceRefs.current[index] = el
                }}
                className={`transition-all duration-700 ${
                  visibleMobileServices.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div
                  onClick={() => {
                    if (openMobileServiceCard === index) {
                      setOpenMobileServiceCard(null)
                    } else {
                      setOpenMobileServiceCard(index)
                    }
                  }}
                  className={`relative border rounded-lg p-5 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                    openMobileServiceCard === index
                      ? "bg-transparent border-white shadow-[0_0_20px_rgba(53,123,252,0.8)] min-h-fit"
                      : "bg-transparent border-white h-[130px]"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[18px] font-normal leading-none tracking-[-0.9px] text-[#b7eaff]"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {service.number}
                    </div>
                    <h3
                      className="text-[18px] font-bold text-white leading-none tracking-[-0.9px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      {service.title}{" "}
                      {service.subtitle && (
                        <sup className="text-[10px] font-normal ml-0.5 align-baseline relative -top-1">
                          {service.subtitle}
                        </sup>
                      )}
                    </h3>
                  </div>

                  {openMobileServiceCard !== index && (
                    <p
                      className="text-[17px] font-bold text-white leading-normal tracking-[-0.56px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: service.preview }}
                    />
                  )}

                  {/* Expanded Content */}
                  {openMobileServiceCard === index && (
                    <div className="mt-4 animate-fadeInDown pb-12">
                      <div className="w-[40px] h-[1px] bg-white mb-3" />

                      <div className="space-y-2">
                        {service.sections.map((section, sIdx) => (
                          <div key={sIdx} className="mb-3">
                            <h4
                              className="text-[15px] font-normal text-white leading-tight tracking-[-0.56px] mb-1"
                              style={{ fontFamily: "Pretendard, sans-serif" }}
                              dangerouslySetInnerHTML={{ __html: section.title }}
                            />
                            {section.content && (
                              <p
                                className="text-[16px] font-normal text-white/90 leading-snug tracking-[-0.48px]"
                                style={{ fontFamily: "Pretendard, sans-serif" }}
                                dangerouslySetInnerHTML={{ __html: section.content }}
                              />
                            )}
                          </div>
                        ))}

                        {service.highlight && (
                          <p
                            className="text-[18px] font-bold text-white leading-tight tracking-[-0.56px] mt-4 pt-3"
                            style={{ fontFamily: "Pretendard, sans-serif" }}
                            dangerouslySetInnerHTML={{ __html: service.highlight }}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <ChevronDown
                      className={`w-5 h-5 text-white transition-transform duration-300 ${
                        openMobileServiceCard === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.7)" }}
            >
                <source src="/videos/background.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/70 z-[1]" />

            {/* Content Container */}
            <div
                ref={statsSectionRef}
                className={`relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16 transition-all duration-700 text-center ${
                    hasStatsSectionAnimated ? "opacity-100 translate-y-0 animate-fadeInDown" : "opacity-0 translate-y-8"
                }`}
            >
                {/* Heading - Desktop */}
                <h2 className="hidden lg:block text-white text-3xl lg:text-5xl font-light leading-tight mb-2">
                    1년 만에 10배 성장을 이룬 브랜드, 그 뒤에는
                </h2>
                <p className="hidden lg:block text-white text-3xl lg:text-5xl font-light leading-tight">
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

                {/* Heading - Mobile */}
                <div className="lg:hidden mb-8">
                    <h3 className="text-white text-[26px] font-light leading-tight">
                        1년 만에 10배 성장을 이룬 브랜드,<br />그 뒤에는
                    </h3>
                    <p className="text-white text-[26px] font-light leading-tight mt-2">
        <span className="inline-block px-2 font-bold relative">
          <span className="relative z-10">브릭업의 체계적인 솔루션</span>
          <span className="absolute inset-0 bg-[#16469E] -z-10" />
        </span>
                        이<br />있었습니다.
                    </p>
                </div>

                {/* Logo Slider */}
                <div className="my-12">
                    <LogoSlider />
                </div>

                {/* Stats Section - Mobile */}
                <div className="lg:hidden flex flex-col items-center gap-5 max-w-[615px] mx-auto">
                    {[
                        { label: "6개월만에", value: "전국 가맹점", count: 40, suffix: "개", extra: "확장" },
                        { label: "리뉴얼 브랜드", value: "평균 매출 +", count: 38, suffix: "%", extra: "상승" },
                        { label: "가맹계약서/점주", value: "분쟁리스크 0건,\n", count: 100, suffix: "%", extra: "법률자문 만족도" },
                        { label: "R&D 구축 후", value: "기존 재료비 감소 +", count: 8, suffix: "%", extra: "이상" },
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center gap-2 w-full">
                            <p className="text-white font-light text-[18px] text-center tracking-tight">{stat.label}</p>
                            <h4 className="text-white font-semibold text-[34px] text-center tracking-tight whitespace-pre-line">
                                {stat.value} <CounterAnimation end={stat.count} duration={2000} suffix={stat.suffix} className="inline-block" /> {stat.extra}
                            </h4>
                        </div>
                    ))}
                </div>

                {/* Stats Section - Desktop */}
                <div className="hidden lg:flex flex-col items-center gap-5 max-w-[615px] mx-auto mt-12">
                    {[
                        { label: "6개월만에", value: "전국 가맹점", count: 40, suffix: "개", extra: "확장" },
                        { label: "리뉴얼 브랜드", value: "평균 매출 +", count: 38, suffix: "%", extra: "상승" },
                        { label: "가맹계약서/점주", value: "분쟁리스크 0건,", count: 100, suffix: "%", extra: "법률자문 만족도", nowrap: true },
                        { label: "R&D 구축 후", value: "기존 재료비 감소 +", count: 8, suffix: "%", extra: "이상" },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full transition-all duration-700 ${
                                hasStatsSectionAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                            style={{ transitionDelay: `${0.4 + idx * 0.2}s` }}
                        >
                            <p
                                className={`text-white font-light text-base sm:text-lg lg:text-2xl text-center sm:text-right tracking-tight ${
                                    stat.nowrap ? "whitespace-nowrap" : ""
                                }`}
                            >
                                {stat.label}
                            </p>
                            <h4
                                className={`text-white font-semibold text-2xl sm:text-3xl lg:text-5xl text-center tracking-tight whitespace-nowrap`}
                            >
                                {stat.value} <CounterAnimation end={stat.count} duration={2000} suffix={stat.suffix} className="inline-block" /> {stat.extra}
                            </h4>
                        </div>
                    ))}
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
            {/* Desktop heading */}
            <h2 className="hidden lg:block text-white text-3xl lg:text-5xl font-light leading-tight mb-4">
              첫 상담부터 성과 관리까지,
            </h2>
            <p className="hidden lg:block text-white text-3xl lg:text-5xl font-light leading-tight">
              <span className="inline-block px-2 font-bold relative">
                <span className="relative z-10">모든 단계가 투명합니다</span>
                <span className="absolute inset-0 bg-[#16469E] -z-10" />
              </span>
            </p>

            <h2 className="lg:hidden text-white text-2xl font-light leading-relaxed animate-fadeInDown">
              <span className="block mb-1">첫 상담부터 성과 관리까지,</span>
              <span className="block mb-1">
                <span className="inline-block px-2 font-bold relative">
                  <span className="relative z-10">모든 단계가 투명합니다.</span>
                  <span className="absolute inset-0 bg-[#16469E] -z-10" />
                </span>
              </span>
            </h2>

            <p className="text-white text-sm lg:text-base mt-6 leading-relaxed">
              상담부터 계약, 실행, 그리고 사후 관리까지,
              <br />
              모든 단계에서 파트너와 실시간으로 공유합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Card 1 - 브랜드 진단 */}
            <div className="lg:relative lg:h-[144px]">
              <div className="group lg:absolute lg:inset-0 border rounded-lg p-[23px_31px] backdrop-blur-sm transition-all duration-500 cursor-pointer lg:overflow-hidden bg-[#081c3f] lg:bg-transparent border-[#d9d9d999] lg:border-[#d9d9d966] shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:shadow-none lg:hover:bg-[#081c3f] lg:hover:border-[#d9d9d999] lg:hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:hover:z-50 lg:hover:h-[308px]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-[32px] lg:text-[40px] font-normal leading-none tracking-[-1.6px] transition-all text-[#b7eaff] lg:text-[#ffffff33] lg:group-hover:text-[#b7eaff]"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    1
                  </div>
                  <h3
                    className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    브랜드 진단
                  </h3>
                </div>

                <p
                  className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-4 lg:mb-0 lg:group-hover:mb-4"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  잘 되는 브랜드에는 이유가 있고,
                  <br />안 되는 브랜드에는 원인이 있습니다.
                </p>

                <div className="opacity-100 lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500">
                  <div className="w-[40px] h-[1px] bg-white mb-4" />

                  <div className="space-y-2">
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                        <font className="font-light">현재 브랜드의 매출 구조, 메뉴, 시스템을 전부 점검합니다.</font>
                        <br/>
                      감이 아닌 데이터<font className="font-light">로,</font>
                        <br/>
                        <font className="font-light">무엇이 강점이고 어디가 약점인지</font> 명확히 분석<font className="font-light">합니다.</font>
                      </p>
                    <p
                      className="text-[13px] text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                        브랜드 진단 리포트 제공<font className="font-light">으로,</font>
                      <br />
                        <span className="font-bold underline">지금 우리 브랜드가 어디에 서 있는지</span> <font className="font-light">한눈에 파악하세요.</font>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - 전략 설계 */}
            <div className="lg:relative lg:h-[144px]">
              <div className="group lg:absolute lg:inset-0 border rounded-lg p-[23px_31px] backdrop-blur-sm transition-all duration-500 cursor-pointer lg:overflow-hidden bg-[#081c3f] lg:bg-transparent border-[#d9d9d999] lg:border-[#d9d9d966] shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:shadow-none lg:hover:bg-[#081c3f] lg:hover:border-[#d9d9d999] lg:hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:hover:z-50 lg:hover:h-[308px]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-[32px] lg:text-[40px] font-normal leading-none tracking-[-1.6px] transition-all text-[#b7eaff] lg:text-[#ffffff33] lg:group-hover:text-[#b7eaff]"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    2
                  </div>
                  <h3
                    className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    전략 설계
                  </h3>
                </div>

                <p
                  className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-4 lg:mb-0 lg:group-hover:mb-4"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  성공하는 브랜드는
                  <br />
                  방향이 다릅니다.
                </p>

                <div className="opacity-100 lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500">
                  <div className="w-[40px] h-[1px] bg-white mb-4" />

                  <div className="space-y-2">
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                        <font className="font-light">브랜드의 개성을 살리되,
                            <br/>시장 안에서 팔리는 언어로 재정비합니다.
                      <br />
                            BI / 브랜드 메시지, 핵심 타깃, 마케팅 포인트까지</font><br/>
                        한 줄로 정리되는 브랜드 콘셉트 전략<font className="font-light">을 세웁니다.</font>
                    </p>
                    <p
                      className="text-[13px] text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                        <font className="font-light">우리의 목표:</font> 사람들이 브랜드를 <span className="font-bold underline">기억하게</span>  만들기.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - 실행 플랜 */}
            <div className="lg:relative lg:h-[144px]">
              <div className="group lg:absolute lg:inset-0 border rounded-lg p-[23px_31px] backdrop-blur-sm transition-all duration-500 cursor-pointer lg:overflow-hidden bg-[#081c3f] lg:bg-transparent border-[#d9d9d999] lg:border-[#d9d9d966] shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:shadow-none lg:hover:bg-[#081c3f] lg:hover:border-[#d9d9d999] lg:hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:hover:z-50 lg:hover:h-[308px]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="text-[32px] lg:text-[40px] font-normal leading-none tracking-[-1.6px] transition-all text-[#b7eaff] lg:text-[#ffffff33] lg:group-hover:text-[#b7eaff]"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    3
                  </div>
                  <h3
                    className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    실행 플랜
                  </h3>
                </div>

                <p
                  className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-4 lg:mb-0 lg:group-hover:mb-4"
                  style={{ fontFamily: "Pretendard, sans-serif" }}
                >
                  계획은 빠르고,
                  <br />
                  실행은 정확하게.
                </p>

                <div className="opacity-100 lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500">
                  <div className="w-[40px] h-[1px] bg-white mb-4" />

                  <div className="space-y-2">
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                        <font className="font-light">브랜딩, 영업, 마케팅, 메뉴개발까지<br/>
                            모든</font> <span className="font-bold">실행 로드맵을 한 화면에서 관리</span>합니다.
                    </p>
                    <p
                      className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                        <font className="font-light">각 단계별 담당자 지정 + 일정 공유로<br/></font>
                        <span className="font-bold underline">누가, 언제, 무엇을</span> <font className="font-light">명확히 볼 수 있습니다.</font>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - 현장 실행 */}
            <div className="lg:relative lg:h-[144px]">
              <div className="group lg:absolute lg:inset-0 border rounded-lg backdrop-blur-sm transition-all duration-500 cursor-pointer lg:overflow-hidden bg-[#081c3f] lg:bg-transparent border-[#d9d9d999] lg:border-[#d9d9d966] shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:shadow-none lg:hover:bg-[#081c3f] lg:hover:border-[#d9d9d999] lg:hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:hover:z-50 lg:hover:bottom-0 lg:hover:top-auto lg:hover:h-[308px]">
                <div className="p-[23px_31px] lg:group-hover:pb-[23px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[32px] lg:text-[40px] font-normal leading-none tracking-[-1.6px] transition-all text-[#b7eaff] lg:text-[#ffffff33] lg:group-hover:text-[#b7eaff]"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      4
                    </div>
                    <h3
                      className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      현장 실행
                    </h3>
                  </div>

                  <p
                    className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-4 lg:mb-0 lg:group-hover:mb-4"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    책상 위 전략이 아니라,
                    <br />
                    현장에서 움직입니다.
                  </p>

                  <div className="opacity-100 lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500">
                    <div className="w-[40px] h-[1px] bg-white mb-4" />

                    <div className="space-y-2">
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                          <font className="font-light">브랜드 디자인, 매장 촬영, 오픈 홍보, 가맹 영업까지</font><br/>
                        실행팀이 직접 투입.
                        <br/>
                          <font className="font-light">진행 상황은</font> 실시간 리포트로 공유<font className="font-light">되며,<br/>
                          브랜드 담당자가</font> 즉시 확인<font className="font-light">할 수 있습니다.</font>
                      </p>
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                          <span className="font-bold">브랙업</span><font className="font-light">의 실행력=</font> <span className="font-bold underline">기획력 + 속도감 + 현장감</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - 가맹 영업 */}
            <div className="lg:relative lg:h-[144px]">
              <div className="group lg:absolute lg:inset-0 border rounded-lg backdrop-blur-sm transition-all duration-500 cursor-pointer lg:overflow-hidden bg-[#081c3f] lg:bg-transparent border-[#d9d9d999] lg:border-[#d9d9d966] shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:shadow-none lg:hover:bg-[#081c3f] lg:hover:border-[#d9d9d999] lg:hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:hover:z-50 lg:hover:bottom-0 lg:hover:top-auto lg:hover:h-[308px]">
                <div className="p-[23px_31px] lg:group-hover:pb-[23px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[32px] lg:text-[40px] font-normal leading-none tracking-[-1.6px] transition-all text-[#b7eaff] lg:text-[#ffffff33] lg:group-hover:text-[#b7eaff]"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      5
                    </div>
                    <h3
                      className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      성과 공유
                    </h3>
                  </div>

                  <p
                    className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-4 lg:mb-0 lg:group-hover:mb-4"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                    결과는 보고가 아니라,
                    <br />
                    데이터로 보여줍니다.
                  </p>

                  <div className="opacity-100 lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500">
                    <div className="w-[40px] h-[1px] bg-white mb-4" />

                    <div className="space-y-2">
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                          <font className="font-light">가맹문의 수, 광고 성과, 매출 지표 등</font>
                          모든 결과를 수치로 공개.
                          <font className="font-light">이번달에 뭐가 잘 됐는지 한 눈에 볼 수 있는</font>
                          월간 성과 리포트 <font className="font-light">제공</font>
                      </p>
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                          <font className="font-light">브랜드의 성장을</font> <span className="font-bold underline">데이터 기반으로 함께 점검</span><font className="font-light">합니다.</font>
                        달립니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 - 성과 관리 */}
            <div className="lg:relative lg:h-[144px]">
              <div className="group lg:absolute lg:inset-0 border rounded-lg backdrop-blur-sm transition-all duration-500 cursor-pointer lg:overflow-hidden bg-[#081c3f] lg:bg-transparent border-[#d9d9d999] lg:border-[#d9d9d966] shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:shadow-none lg:hover:bg-[#081c3f] lg:hover:border-[#d9d9d999] lg:hover:shadow-[0_0_12px_0_rgba(53,123,252,1)] lg:hover:z-50 lg:hover:bottom-0 lg:hover:top-auto lg:hover:h-[308px]">
                <div className="p-[23px_31px] lg:group-hover:pb-[23px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="text-[32px] lg:text-[40px] font-normal leading-none tracking-[-1.6px] transition-all text-[#b7eaff] lg:text-[#ffffff33] lg:group-hover:text-[#b7eaff]"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      6
                    </div>
                    <h3
                      className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-[-1.04px]"
                      style={{ fontFamily: "Pretendard, sans-serif" }}
                    >
                      장기 파트너십
                    </h3>
                  </div>

                  <p
                    className="text-[16px] font-bold text-white leading-normal tracking-[-0.64px] mb-4 lg:mb-0 lg:group-hover:mb-4"
                    style={{ fontFamily: "Pretendard, sans-serif" }}
                  >
                      한번의 계약이 아니라,
                      <br />
                      오래 가는 동행.
                  </p>

                  <div className="opacity-100 lg:max-h-0 lg:opacity-0 overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500">
                    <div className="w-[40px] h-[1px] bg-white mb-4" />
                    <div className="space-y-2">
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                          <font className="font-light">오픈 후에도 신메뉴 개발, 시즌 마케팅, 추가 매장 확정까지<br/>
                          꾸준히 함께합니다.<br/>
                              계약서로 끝나는 관계가 아니라,</font><br/>
                          브랜드의 옆자리에 남는 파트너<font className="font-light">가 되겠습니다.</font>
                      </p>
                      <p
                        className="text-[13px] font-normal text-white leading-snug tracking-[-0.52px]"
                        style={{ fontFamily: "Pretendard, sans-serif" }}
                      >
                          <span className="font-bold underline">함께 키운 브랜드는, 함께 자랍니다.</span>
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

          {/* Mobile Accordion Version */}
          <div className="lg:hidden space-y-3">
            {comparisonData.map((item, index) => {
              const isOpen = openAccordionIndex === index
              return (
                <div
                  key={index}
                  className={`border overflow-hidden transition-all duration-500 ${
                    isOpen ? "bg-transparent border-[#d9d9d999]" : "bg-transparent border-white/20"
                  }`}
                  style={{ borderRadius: "12px" }}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left"
                  >
                    <span className={`text-white text-base transition-all ${isOpen ? "font-bold" : "font-normal"}`}>
                      {item.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-3 pb-5 animate-fadeInDown">
                      <div className="grid grid-cols-2 gap-0 mb-3">
                        <div className="bg-[#5B5B5B] px-2 py-2">
                          <p className="text-white text-[14px] font-semibold text-center">일반 프랜차이즈 본사</p>
                        </div>
                        <div className="bg-[#5B5B5B] px-2 py-2">
                          <p className="text-white text-[14px] font-semibold text-center">일반 인큐베이팅</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="px-1">
                          <p className="text-white/90 text-[11px] text-center leading-tight whitespace-pre-line" style={{ fontSize: "15px"}}>{item.general}</p>
                        </div>
                        <div className="px-1">
                          <p className="text-white/90 text-[11px] text-center leading-tight whitespace-pre-line" style={{ fontSize: "15px"}}>{item.brickup}</p>
                        </div>
                      </div>

                      <div className="bg-[#16469E] rounded-lg p-4 border border-[#4A90E2]">
                        <p className="text-white font-bold text-sm mb-2 text-center">
                            <font className="text-[16px]">브릭업</font> <sup className="text-[10px] align-baseline relative -top-1" style={{ fontWeight: "100" }}>Brickup</sup>
                        </p>
                        <p className="text-[11px] text-center leading-tight" style={{ fontSize: "16px" }}>
                            <font className="text-white whitespace-pre-line" style={{ fontWeight: "100" }}>{item.brickupDetail1}</font>
                          <span style={{ color: "#FFF200" }} className="font-bold whitespace-pre-line">
                            {item.brickupDetail2}
                          </span>
                            <font className="text-white whitespace-pre-line" style={{ fontWeight: "100" }}>{item.brickupDetail3}</font>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="hidden lg:block overflow-x-auto">
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
                      <span className="inline-flex items-start gap-1">
                          브릭업
                          <span className="relative top-[4px] text-[0.75em] text-white leading-none" style={{ fontWeight: "100"}}>Brick-up</span>
                      </span>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {/* Row 1: 핵심 역할 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    핵심 역량
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">내부 인력 중심의 운영, 각 부서 분리</font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">부분적 대행 또는 프로젝트 단위 컨설팅</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer ">
                      <font className="font-light">
                    브릭업은 기획-운영-확장{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                       전단계를 본사와 함께 설계
                    </span>
                    합니다.
                    <br />
                    외부인이 아닌 공동운영팀 형태입니다.
                      </font>
                  </td>
                </tr>

                {/* Row 2: 브랜딩 / 기획력 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    브랜딩 / 기획력
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">한정된 리소스, 내부 시각 중심</font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">비주얼 중심 제안, 실현력 낮음</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                      브릭업은 시장 데이터 기반으로 브랜드의 정체성을 재정립하고,
                    <br />
                    소비자 눈높이에 맞는{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      스토리와 디자인을 동시에 설계
                    </span>
                    합니다.
                      </font>
                  </td>
                </tr>

                {/* Row 3: 가맹 영업 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    가맹 영업
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">본사 담당자 의존, 네트워크 한계</font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">잠깐의 세일즈 지원</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                    브릭업은 본사DB외에{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      자체 DB + 영업전략시스템
                    </span>
                    으로 리드를 확보하고,
                    <br />전 과정을 실시간으로 공유합니다.
                      </font>
                  </td>
                </tr>

                {/* Row 4: 마케팅 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    마케팅
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">예산 부족, 단기 캠페인 위주</font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">광고 위탁, ROI 불투명</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                    브릭업은 가맹영업과 마케팅 + 전포 매출형 마케팅을 병행합니다.
                    <br />
                    성과는 클릭이 아닌{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      실제 매출 지표로 관리
                    </span>
                    합니다.
                      </font>
                  </td>
                </tr>

                {/* Row 5: 운영 / 메뉴 / R&D */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    운영 / 메뉴 / R&D
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">메뉴 표준화 미흡, 운영 매뉴얼 부족</font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">자문만 제공</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                    브릭업은 메뉴개발, 원가분석, 조리 프로세스, 운영 매뉴얼까지 구축합니다.
                    <br />
                    매장에 즉시{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      '현장 적용 가능한 시스템'
                    </span>
                    을 완성합니다.
                      </font>
                  </td>
                </tr>

                {/* Row 6: 법률 / 계약 관리 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    법률 / 계약 관리
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">내부 인력 부재, 분쟁 대응 중심</font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">외부 로펌 위탁</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                    브릭업은{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">
                      계약 전 리스크 사전 진단 + 정보공개서 작성 + 상표권 점검
                    </span>
                    까지
                    <br />
                          진행합니다. 분쟁 예방 중심의 법률 프로세스 또한 내재화되어 있습니다.
                      </font>
                  </td>
                </tr>

                {/* Row 7: 물류 / 공급망 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    물류 / 공급망
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">각 협력업체 개별 관리,
                    <br />
                    원가 변동 폭이 커서 점주 불만 증가
                      </font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">물류 대행만 중개, 통합관리 부재</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                          브릭업은 전국 물류망 협력 네트워크를 통해{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">원가 경쟁력 확보</span>
                    와
                    <br />
                          빠른 공급체계를 유지시켜 점주 만족도와 본사 신뢰도 동시 강화됩니다.
                      </font>
                  </td>
                </tr>

                {/* Row 8: 확장성 / 지속성 */}
                <tr>
                  <td className="text-center text-white font-semibold text-sm lg:text-base p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                    확장성 / 지속성
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                      담당자 교체나 조직 이탈 시
                          <br/>
                      시스템 유지 어려움
                      </font>
                  </td>
                  <td className="text-center text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">프로젝트 종료 후 관리 부재</font>
                  </td>
                  <td className="group bg-[#091C40] text-white text-sm p-4 border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                      <font className="font-light">
                          브릭업은 브랜드별 관리 대시보드로 모든 데이터(영업·마케팅·가맹)를 기록,
                          <br/>
                          담당자 교체에도 시스템은 유지될 수 있도록 하여{" "}
                    <span className="text-[#FFF200] font-semibold group-hover:text-gray-900">브랜드의 자생력</span>을 키웁니다.
                      </font>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full min-h-screen bg-black py-20 lg:py-32 pb-32 lg:pb-32">
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
            <div className="text-center lg:text-left">
              <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                <span className="lg:hidden">인큐베이팅 문의</span>
                <span className="hidden lg:block">
                  인큐베이팅
                  <br />
                  문의
                </span>
              </h2>
            </div>

            <div className="px-4 py-8 lg:p-12 max-w-2xl lg:max-w-none mx-auto lg:mx-0 w-full">
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
                          checked={selectedTypes.includes(option)}
                          onChange={(e) => {
                            if (option === "모두") {
                              handleAllCheckbox(e.target.checked)
                            } else {
                              handleIndividualCheckbox(option, e.target.checked)
                            }
                          }}
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
                    required
                    placeholder="내용을 입력해주세요"
                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E] resize-none h-[160px]"
                  />
                </div>

                {/* Company / Position / Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    회사명 / 직책 / 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="브릭업/이사/홍길동"
                    className="w-full px-4 py-2 lg:py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>

                {/* Phone - numbers only */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="01012345678 *'-'는 제외하고 작성해주세요"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement
                      target.value = target.value.replace(/[^0-9]/g, "")
                    }}
                    className="w-full px-4 py-2 lg:py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>

                {/* Brand - optional */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">상호(브랜드명)</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="상호(브랜드명)을 정확히 입력해주세요"
                    className="w-full px-4 py-2 lg:py-3 bg-white border border-white/20 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16469E]"
                  />
                </div>
                  <div className="mb-3">
                      <label className="block text-white text-sm font-medium mb-2">개인정보 수집 및 이용동의</label>
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

                {/* Privacy Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 mt-0.5 rounded border-white/30 bg-white text-[#16469E] focus:ring-[#16469E]"
                    />
                    <span className="text-white">개인정보 수집 및 이용에 동의합니다 </span><span className="text-red-500">*</span>
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

      {/* CTA Section - "예비창업자이신가요?" */}
        <section
            className="relative w-full text-white bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/cta-background.png')",
                minHeight: "475px",
                height: "475px",
                marginBottom: "63px",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* Content container */}
            <div className="relative z-10 h-full max-w-[1180px] mx-auto px-6 flex flex-col">
                {/* Top CTA area - positioned 60px from top */}
                <div className="flex flex-col items-center text-center" style={{ paddingTop: "60px" }}>
                    <h2 className="text-white text-[32px] font-bold leading-tight">예비창업자이신가요?</h2>
                    <p className="mt-4 text-white text-[18px]">브릭업의 효과적인 프랜차이즈 매칭 서비스를 경험해보세요.</p>

                    {/* Button - CSS styled, not image */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            router.push("/franchise-matching")
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

      {/* Terms Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#111827]">이용약관</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
              <h4 className="font-bold text-[#111827] mb-2">제1조 (목적)</h4>
              <p className="mb-4">
                본 약관은 주식회사 브릭업(이하 "회사"라 한다)이 제공하는 모든 서비스(이하 "서비스"라 한다)의 이용과
                관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제2조 (정의)</h4>
              <p className="mb-4">
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
                <br />
                1. "서비스"란 회사가 제공하는 프랜차이즈 창업 컨설팅, 매칭, 상권 분석 등 모든 관련 서비스를 의미합니다.
                <br />
                2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
                <br />
                3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을
                의미합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제3조 (약관의 효력 및 변경)</h4>
              <p className="mb-4">
                1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
                <br />
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 약관이 변경되는
                경우 회사는 변경사항을 시행일자 7일 전부터 회원에게 공지합니다.
                <br />
                3. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제4조 (서비스의 제공 및 변경)</h4>
              <p className="mb-4">
                1. 회사는 다음과 같은 서비스를 제공합니다:
                <br />- 프랜차이즈 창업 컨설팅 및 브랜드 매칭
                <br />- 상권 및 입지 분석
                <br />- 계약 지원 및 사후 관리
                <br />- 기타 회사가 정하는 서비스
                <br />
                2. 회사는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수
                있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제5조 (서비스의 중단)</h4>
              <p className="mb-4">
                1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                서비스의 제공을 일시적으로 중단할 수 있습니다.
                <br />
                2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 회원 또는 제3자가 입은 손해에
                대하여 배상합니다. 단, 회사에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제6조 (회원의 의무)</h4>
              <p className="mb-4">
                1. 회원은 다음 행위를 하여서는 안 됩니다:
                <br />- 신청 또는 변경 시 허위내용의 등록
                <br />- 타인의 정보 도용
                <br />- 회사가 게시한 정보의 변경
                <br />- 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
                <br />- 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
                <br />- 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                <br />- 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는
                행위
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제7조 (저작권의 귀속 및 이용제한)</h4>
              <p className="mb-4">
                1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
                <br />
                2. 회원은 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이
                복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안
                됩니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제8조 (분쟁해결)</h4>
              <p className="mb-4">
                1. 회사는 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여
                피해보상처리기구를 설치·운영합니다.
                <br />
                2. 회사는 회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가
                곤란한 경우에는 회원에게 그 사유와 처리일정을 즉시 통보해 드립니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제9조 (재판권 및 준거법)</h4>
              <p className="mb-4">
                1. 회사와 회원 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용합니다.
                <br />
                2. 회사와 회원 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제소합니다.
              </p>

              <p className="mt-6 text-[#6B7280]">부칙: 본 약관은 2024년 1월 1일부터 시행합니다.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#111827]">개인정보처리방침</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
              <p className="mb-4">
                주식회사 브릭업(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와
                관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립,
                공개합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제1조(개인정보의 처리목적)</h4>
              <p className="mb-4">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
                조치를 이행할 예정입니다.
                <br />
                <br />
                1. 서비스 제공: 프랜차이즈 창업 컨설팅, 브랜드 매칭, 상권 분석 등의 서비스 제공
                <br />
                2. 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용
                방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달
                <br />
                3. 마케팅 및 광고에 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회
                제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의
                서비스 이용에 대한 통계
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제2조(개인정보의 처리 및 보유기간)</h4>
              <p className="mb-4">
                1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                보유·이용기간 내에서 개인정보를 처리·보유합니다.
                <br />
                2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                <br />- 서비스 이용 계약 이행: 계약 종료 시까지
                <br />- 대금 결제 및 재화 등의 공급: 대금 결제 및 재화 등의 공급 완료 시까지
                <br />- 소비자 불만 또는 분쟁처리: 소비자의 불만 또는 분쟁처리 완료 시까지
                <br />- 관계 법령에 따른 보존: 전자상거래 등에서의 소비자보호에 관한 법률, 국세기본법 등 관계 법령의
                규정에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제3조(처리하는 개인정보의 항목)</h4>
              <p className="mb-4">
                회사는 다음의 개인정보 항목을 처리하고 있습니다:
                <br />
                1. 필수항목: 성명, 연락처(전화번호, 이메일 주소), 회사명, 브랜드명
                <br />
                2. 선택항목: 주소, 사업자등록번호, 창업 희망 지역, 예산 규모
                <br />
                3. 자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제4조(개인정보의 제3자 제공)</h4>
              <p className="mb-4">
                1. 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의
                동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
                제공합니다.
                <br />
                2. 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
                <br />- 제공받는 자: 프랜차이즈 본사
                <br />- 제공 목적: 브랜드 매칭 및 창업 상담
                <br />- 제공 항목: 성명, 연락처, 창업 희망 지역, 예산 규모
                <br />- 보유 및 이용 기간: 상담 완료 시까지
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제5조(개인정보처리의 위탁)</h4>
              <p className="mb-4">
                1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
                <br />- 위탁받는 자: 고객센터 운영 업체
                <br />- 위탁하는 업무의 내용: 고객 상담 및 문의 응대
                <br />
                2. 회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·
                관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에
                명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제6조(정보주체의 권리·의무 및 행사방법)</h4>
              <p className="mb-4">
                1. 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                <br />
                2. 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편,
                모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
                <br />
                3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제7조(개인정보의 파기)</h4>
              <p className="mb-4">
                1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
                개인정보를 파기합니다.
                <br />
                2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에
                따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나
                보관장소를 달리하여 보존합니다.
                <br />
                3. 개인정보 파기의 절차 및 방법은 다음과 같습니다:
                <br />- 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을
                받아 개인정보를 파기합니다.
                <br />- 파기방법: 회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며,
                종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제8조(개인정보의 안전성 확보조치)</h4>
              <p className="mb-4">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
                <br />
                1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
                <br />
                2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
                보안프로그램 설치
                <br />
                3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제9조(개인정보 보호책임자)</h4>
              <p className="mb-4">
                1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:
                <br />- 개인정보 보호책임자: 홍길동
                <br />- 연락처: 02-1234-5678, privacy@brickup.com
                <br />
                2. 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제
                등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이
                답변 및 처리해드릴 것입니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제10조(개인정보 처리방침 변경)</h4>
              <p className="mb-4">
                이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이
                있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Fixed Inquiry Bar */}
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
                  className="w-[132px] h-[34px] object-contain"
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
                <option value="브랜딩">브랜딩</option>
                <option value="DB마케팅">DB마케팅</option>
                <option value="영업 대행">영업 대행</option>
                <option value="R&D(메뉴개발)">R&D(메뉴개발)</option>
                <option value="기타">기타</option>
              </select>

              {/* Brand Name */}
              <input
                type="text"
                name="brand"
                placeholder="브랜드명"
                className="w-full lg:flex-1 lg:min-w-[120px] h-[40px] rounded-md px-3 text-[14px] bg-white text-[#111827] placeholder:text-[#999999] border border-[#D1D9E8] focus:outline-none focus:border-[#16469E] focus:ring-2 focus:ring-[#16469E]/20"
              />

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
                      setShowPrivacyModal(true)
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

      {/* Terms Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#111827]">이용약관</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
              <h4 className="font-bold text-[#111827] mb-2">제1조 (목적)</h4>
              <p className="mb-4">
                본 약관은 주식회사 브릭업(이하 "회사"라 한다)이 제공하는 모든 서비스(이하 "서비스"라 한다)의 이용과
                관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제2조 (정의)</h4>
              <p className="mb-4">
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
                <br />
                1. "서비스"란 회사가 제공하는 프랜차이즈 창업 컨설팅, 매칭, 상권 분석 등 모든 관련 서비스를 의미합니다.
                <br />
                2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
                <br />
                3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을
                의미합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제3조 (약관의 효력 및 변경)</h4>
              <p className="mb-4">
                1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
                <br />
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 약관이 변경되는
                경우 회사는 변경사항을 시행일자 7일 전부터 회원에게 공지합니다.
                <br />
                3. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제4조 (서비스의 제공 및 변경)</h4>
              <p className="mb-4">
                1. 회사는 다음과 같은 서비스를 제공합니다:
                <br />- 프랜차이즈 창업 컨설팅 및 브랜드 매칭
                <br />- 상권 및 입지 분석
                <br />- 계약 지원 및 사후 관리
                <br />- 기타 회사가 정하는 서비스
                <br />
                2. 회사는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수
                있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제5조 (서비스의 중단)</h4>
              <p className="mb-4">
                1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                서비스의 제공을 일시적으로 중단할 수 있습니다.
                <br />
                2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 회원 또는 제3자가 입은 손해에
                대하여 배상합니다. 단, 회사에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제6조 (회원의 의무)</h4>
              <p className="mb-4">
                1. 회원은 다음 행위를 하여서는 안 됩니다:
                <br />- 신청 또는 변경 시 허위내용의 등록
                <br />- 타인의 정보 도용
                <br />- 회사가 게시한 정보의 변경
                <br />- 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
                <br />- 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
                <br />- 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                <br />- 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는
                행위
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제7조 (저작권의 귀속 및 이용제한)</h4>
              <p className="mb-4">
                1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
                <br />
                2. 회원은 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이
                복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안
                됩니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제8조 (분쟁해결)</h4>
              <p className="mb-4">
                1. 회사는 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여
                피해보상처리기구를 설치·운영합니다.
                <br />
                2. 회사는 회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가
                곤란한 경우에는 회원에게 그 사유와 처리일정을 즉시 통보해 드립니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제9조 (재판권 및 준거법)</h4>
              <p className="mb-4">
                1. 회사와 회원 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용합니다.
                <br />
                2. 회사와 회원 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제소합니다.
              </p>

              <p className="mt-6 text-[#6B7280]">부칙: 본 약관은 2024년 1월 1일부터 시행합니다.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#111827]">개인정보처리방침</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
              <p className="mb-4">
                주식회사 브릭업(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와
                관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립,
                공개합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제1조(개인정보의 처리목적)</h4>
              <p className="mb-4">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
                조치를 이행할 예정입니다.
                <br />
                <br />
                1. 서비스 제공: 프랜차이즈 창업 컨설팅, 브랜드 매칭, 상권 분석 등의 서비스 제공
                <br />
                2. 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용
                방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달
                <br />
                3. 마케팅 및 광고에 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회
                제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의
                서비스 이용에 대한 통계
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제2조(개인정보의 처리 및 보유기간)</h4>
              <p className="mb-4">
                1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                보유·이용기간 내에서 개인정보를 처리·보유합니다.
                <br />
                2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                <br />- 서비스 이용 계약 이행: 계약 종료 시까지
                <br />- 대금 결제 및 재화 등의 공급: 대금 결제 및 재화 등의 공급 완료 시까지
                <br />- 소비자 불만 또는 분쟁처리: 소비자의 불만 또는 분쟁처리 완료 시까지
                <br />- 관계 법령에 따른 보존: 전자상거래 등에서의 소비자보호에 관한 법률, 국세기본법 등 관계 법령의
                규정에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제3조(처리하는 개인정보의 항목)</h4>
              <p className="mb-4">
                회사는 다음의 개인정보 항목을 처리하고 있습니다:
                <br />
                1. 필수항목: 성명, 연락처(전화번호, 이메일 주소), 회사명, 브랜드명
                <br />
                2. 선택항목: 주소, 사업자등록번호, 창업 희망 지역, 예산 규모
                <br />
                3. 자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제4조(개인정보의 제3자 제공)</h4>
              <p className="mb-4">
                1. 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의
                동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
                제공합니다.
                <br />
                2. 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
                <br />- 제공받는 자: 프랜차이즈 본사
                <br />- 제공 목적: 브랜드 매칭 및 창업 상담
                <br />- 제공 항목: 성명, 연락처, 창업 희망 지역, 예산 규모
                <br />- 보유 및 이용 기간: 상담 완료 시까지
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제5조(개인정보처리의 위탁)</h4>
              <p className="mb-4">
                1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
                <br />- 위탁받는 자: 고객센터 운영 업체
                <br />- 위탁하는 업무의 내용: 고객 상담 및 문의 응대
                <br />
                2. 회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·
                관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에
                명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제6조(정보주체의 권리·의무 및 행사방법)</h4>
              <p className="mb-4">
                1. 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                <br />
                2. 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편,
                모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
                <br />
                3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제7조(개인정보의 파기)</h4>
              <p className="mb-4">
                1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
                개인정보를 파기합니다.
                <br />
                2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에
                따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나
                보관장소를 달리하여 보존합니다.
                <br />
                3. 개인정보 파기의 절차 및 방법은 다음과 같습니다:
                <br />- 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을
                받아 개인정보를 파기합니다.
                <br />- 파기방법: 회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며,
                종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제8조(개인정보의 안전성 확보조치)</h4>
              <p className="mb-4">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
                <br />
                1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
                <br />
                2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
                보안프로그램 설치
                <br />
                3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제9조(개인정보 보호책임자)</h4>
              <p className="mb-4">
                1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:
                <br />- 개인정보 보호책임자: 홍길동
                <br />- 연락처: 02-1234-5678, privacy@brickup.com
                <br />
                2. 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제
                등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이
                답변 및 처리해드릴 것입니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제10조(개인정보 처리방침 변경)</h4>
              <p className="mb-4">
                이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이
                있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
