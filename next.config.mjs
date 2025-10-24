/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',          // ✅ 정적 HTML export 필수
    trailingSlash: true,       // ✅ /about → /about/index.html 형태로
    images: {
        unoptimized: true,       // ✅ 정적 호스팅에서 필요
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
