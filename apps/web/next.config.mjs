/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: "out",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "",
  assetPrefix: "",
  cleanDistDir: true,
  env: {
    siteTitle: "מחשבון מעשרות",
    siteDescription: "אפליקציית מחשבון מעשרות",
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   distDir: "out",
//   images: { unoptimized: true },
//   trailingSlash: true,
//   basePath: "",
//   assetPrefix: "./",
//   env: {
//     siteTitle: "מחשבון מעשרות",
//     siteDescription: "אפליקציית מחשבון מעשרות",
//   },
// };

// export default nextConfig;
