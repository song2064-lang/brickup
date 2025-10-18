import Link from "next/link"

export default function FranchiseIncubating() {
  return (
    <div className="relative min-h-screen bg-[#3b3b3b]">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-20 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-colors rounded"
      >
        ← 홈으로
      </Link>

      {/* Image Placeholder */}
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="w-full aspect-video bg-white/10 border-4 border-dashed border-white/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl font-medium mb-2">프랜차이즈 인큐베이팅 이미지</p>
              <p className="text-white/70 text-lg">Full Image Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
