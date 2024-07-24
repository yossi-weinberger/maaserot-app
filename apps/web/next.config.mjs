/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
};
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
  }
  return config;
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   distDir: "out",
// };

// export default nextConfig;
