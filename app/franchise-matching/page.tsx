import Link from "next/link"

export default function FranchiseMatching() {
  return (
    <div className="relative min-h-screen bg-[#d9d9d9]">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-20 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-[#16469E] hover:bg-white/20 transition-colors rounded"
      >
        ← 홈으로
      </Link>

      {/* Image Placeholder */}
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="w-full aspect-video bg-white/10 border-4 border-dashed border-[#16469E]/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#16469E] text-2xl font-medium mb-2">프랜차이즈 매칭 이미지</p>
              <p className="text-[#16469E]/70 text-lg">Full Image Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
