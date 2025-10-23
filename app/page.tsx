import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:block absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <Image src="/brickup-logo-wy.png" alt="Brickup Logo" width={192} height={64} className="w-48 h-auto" priority />
      </div>

      <section className="group/left relative flex-1 h-[50vh] lg:min-h-screen flex items-center justify-center bg-[#3b3b3b]">
        <Image
          src="/left-dark-sphere-background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-[#16469E] opacity-0 lg:group-hover/left:opacity-40 transition-opacity duration-500" />

        <div className="lg:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <Image
            src="/brickup-logo-wy.png"
            alt="Brickup Logo"
            width={120}
            height={40}
            className="w-32 h-auto"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-6 sm:px-8 cursor-default">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 lg:mb-6 whitespace-nowrap leading-tight">
            프랜차이즈 인큐베이팅
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-1 sm:mb-3 lg:mb-4">본사</p>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/70 mb-5 sm:mb-8 lg:mb-10">
            Franchise Incubating
          </p>

          <div className="flex items-center justify-center gap-3 lg:block">
            <Link
              href="/franchise-incubating"
              className="group inline-block px-8 py-2.5 sm:px-10 sm:py-3.5 bg-white lg:bg-transparent border-2 border-white text-[#16469E] lg:text-white text-base sm:text-lg font-medium lg:opacity-0 lg:group-hover/left:opacity-100 relative overflow-hidden transition-all duration-500 cursor-pointer"
            >
              <span className="hidden lg:block absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10 transition-colors duration-500 lg:group-hover:text-[#16469E]">
                바로가기
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="group/right relative flex-1 h-[50vh] lg:min-h-screen flex items-center justify-center bg-[#d9d9d9]">
        <Image
          src="/right-light-blue-background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-[#16469E] opacity-0 lg:group-hover/right:opacity-60 transition-opacity duration-500" />

        <div className="relative z-10 text-center px-6 sm:px-8 cursor-default">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3b3b3b] lg:text-white mb-2 sm:mb-4 lg:mb-6 whitespace-nowrap leading-tight">
            프랜차이즈 매칭
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-[#3b3b3b]/90 lg:text-white/90 mb-1 sm:mb-3 lg:mb-4">
            예비창업자
          </p>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#3b3b3b]/70 lg:text-white/80 mb-5 sm:mb-8 lg:mb-10">
            Personal Consulting
          </p>

          <Link
            href="/franchise-matching"
            className="group inline-block px-8 py-2.5 sm:px-10 sm:py-3.5 bg-white text-[#16469E] text-base sm:text-lg font-medium lg:opacity-0 lg:group-hover/right:opacity-100 relative overflow-hidden transition-all duration-500 cursor-pointer lg:border-2 lg:border-white lg:bg-transparent lg:text-white"
          >
            <span className="hidden lg:block absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10 transition-colors duration-500 lg:group-hover:text-[#16469E]">바로가기</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
