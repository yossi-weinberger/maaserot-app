/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "",
  assetPrefix: "./",
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   distDir: "out",
//   images: { unoptimized: true },
//   trailingSlash: true,
//   basePath: "",
//   assetPrefix: "./", // זה חשוב כדי שהנתיבים יהיו יחסיים
// };

// export default nextConfig;
