export default function IntroPage() {
  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      <div className="absolute inset-0 z-0">
        <img src="/intro-background.png" alt="Brickup intro background" className="h-full w-full object-cover" />
      </div>

      {/* Left Side - Franchise Incubating */}
      <div className="group relative z-10 flex min-h-screen w-full flex-col items-center justify-center md:w-1/2">
        {/* Dim overlay on hover */}
        <div className="absolute inset-0 bg-[#16469E] opacity-0 transition-opacity duration-500 group-hover:opacity-40"></div>

        <div className="relative z-10 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">프랜차이즈 인큐베이팅</h2>
          <p className="mb-2 text-xl text-[#d9d9d9] md:text-2xl">본사</p>
          <p className="mb-8 text-sm text-[#d9d9d9] md:text-base">Franchise Incubating</p>

          <button className="cursor-pointer border-2 border-white bg-transparent px-10 py-3 text-base text-white opacity-0 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#16469E] group-hover:opacity-100 md:text-lg">
            바로가기
          </button>
        </div>

        <div className="absolute left-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm text-white">
          2-1
        </div>
      </div>

      {/* Right Side - Franchise Matching */}
      <div className="group relative z-10 flex min-h-screen w-full flex-col items-center justify-center md:w-1/2">
        {/* Dim overlay on hover */}
        <div className="absolute inset-0 bg-[#16469E] opacity-0 transition-opacity duration-500 group-hover:opacity-60"></div>

        <div className="relative z-10 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">프랜차이즈 매칭</h2>
          <p className="mb-2 text-xl text-white md:text-2xl">예비창업자</p>
          <p className="mb-8 text-sm text-white md:text-base">Personal Consulting</p>

          <button className="cursor-pointer border-2 border-white bg-white px-10 py-3 text-base text-[#16469E] opacity-0 transition-all duration-300 hover:scale-110 hover:bg-[#16469E] hover:text-white group-hover:opacity-100 md:text-lg">
            바로가기
          </button>
        </div>

        <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm text-white">
          3-1
        </div>
      </div>

      {/* Logo - Centered at top */}
      <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
        <div className="flex items-center gap-1">
          <span className="text-3xl font-bold text-white md:text-4xl">Brick</span>
          <span className="text-3xl font-bold text-white md:text-4xl">up</span>
          <span className="text-3xl font-bold text-[#fff200] md:text-4xl">.</span>
        </div>
        <div className="absolute -right-12 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs text-white">
          1
        </div>
      </div>
    </div>
  )
}
