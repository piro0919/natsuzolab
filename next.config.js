/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  sassOptions: {
    additionalData: async (content, { resourcePath }) => {
      if (resourcePath.includes("node_modules")) {
        return content;
      }

      if (resourcePath.endsWith("mq-settings.scss")) {
        return process.env.NODE_ENV === "production" ? "" : content;
      }

      return "@use 'styles/mq' as mq;" + content;
    },
  },
};

module.exports = nextConfig;
