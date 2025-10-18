import Link from "next/link"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-48 h-16 bg-white/10 border-2 border-dashed border-white/50 rounded flex items-center justify-center backdrop-blur-sm">
          <span className="text-white text-sm font-medium">Logo Image</span>
        </div>
      </div>

      {/* Left Section - Franchise Incubating */}
      <section className="group/left relative flex-1 min-h-screen flex items-center justify-center bg-[#3b3b3b]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/dark-glowing-sphere-planet-purple-orange-cosmic.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#16469E] opacity-0 group-hover/left:opacity-40 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 text-center px-8 cursor-default">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">프랜차이즈 인큐베이팅</h1>
          <p className="text-2xl lg:text-3xl text-white/90 mb-4">본사</p>
          <p className="text-lg lg:text-xl text-white/70 mb-8">Franchise Incubating</p>

          <Link
            href="/franchise-incubating"
            className="group relative inline-block px-8 py-3 border-2 border-white text-white text-lg font-medium overflow-hidden transition-colors duration-300 hover:text-[#16469E] cursor-pointer"
          >
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10">바로가기</span>
          </Link>
        </div>
      </section>

      {/* Right Section - Franchise Matching */}
      <section className="group/right relative flex-1 min-h-screen flex items-center justify-center bg-[#d9d9d9]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/light-blue-soft-circular-gradient-abstract-clean.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#16469E] opacity-0 group-hover/right:opacity-60 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 text-center px-8 cursor-default">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">프랜차이즈 매칭</h1>
          <p className="text-2xl lg:text-3xl text-white/90 mb-4">예비창업자</p>
          <p className="text-lg lg:text-xl text-white/80 mb-8">Personal Consulting</p>

          <Link
            href="/franchise-matching"
            className="group relative inline-block px-8 py-3 bg-white text-[#16469E] text-lg font-medium overflow-hidden transition-colors duration-300 hover:text-white cursor-pointer"
          >
            <span className="absolute inset-0 bg-[#16469E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10">바로가기</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
