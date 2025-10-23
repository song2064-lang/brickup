"use client"
import Image from "next/image"

const row1Logos = [
  "/logos/01-mrgalbi.png",
  "/logos/02-shabu.png",
  "/logos/03-buan.png",
  "/logos/04-chungyang.png",
  "/logos/05-yangmun.png",
  "/logos/06-chadol.png",
  "/logos/07-bigstar.png",
]

const row2Logos = [
  "/logos/08-sotddu.png",
  "/logos/09-monanpetit.png",
  "/logos/10-gogijangsu.png",
  "/logos/11-blue25.png",
  "/logos/12-cspace.png",
  "/logos/13-bearstaco.png",
]

const row3Logos = [
  "/logos/14-hanmaum.png",
  "/logos/15-granmajjukkumi.png",
  "/logos/16-selectocoffee.png",
  "/logos/17-jipbap.png",
  "/logos/18-dalkomm.png",
  "/logos/19-jaksal.png",
  "/logos/20-wanna.png",
]

export function LogoSlider() {
  const row1Repeated = Array(10).fill(row1Logos).flat()
  const row2Repeated = Array(10).fill(row2Logos).flat()
  const row3Repeated = Array(10).fill(row3Logos).flat()

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-8 space-y-6">
      <div className="relative flex overflow-hidden">
        <div className="flex animate-slide-right gap-8">
          {row1Repeated.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-14 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image src={logo || "/placeholder.svg"} alt="Brand logo" fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-slide-left gap-8">
          {row2Repeated.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-14 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image src={logo || "/placeholder.svg"} alt="Brand logo" fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-slide-right gap-8">
          {row3Repeated.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-14 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image src={logo || "/placeholder.svg"} alt="Brand logo" fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
