const path = require("path");

const isDev = process.env.NODE_ENV === "development";

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
    /* Turbopack は関数を渡せないので文字列で前置する。$is-dev は
       mq-settings.scss が開発中だけブレークポイントを表示するのに使う。 */
    additionalData: `$is-dev: ${isDev};\n@use 'styles/mq' as mq;\n`,
    loadPaths: [path.join(__dirname, "src")],
  },
};

module.exports = nextConfig;
