/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 사이트 export 설정
  output: 'export',

  // 닷홈 호환 위해 URL 뒤에 슬래시 붙이기 (예: /about → /about/)
  trailingSlash: true,

  // 이미지 최적화 비활성화 (정적 export에서 필요함)
  images: {
    unoptimized: true,
  },

  // TypeScript 빌드 오류 무시 (선택)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
