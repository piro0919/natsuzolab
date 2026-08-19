const { loadEnvConfig } = require("@next/env");
const contentful = require("contentful-management");

module.exports = async function () {
  loadEnvConfig(process.env.PWD);

  // contentful-management は v12 で createClient の返り値が変わり、既定が
  // プレーンクライアントになった。型生成が使う getContentTypes と getLocales は
  // 従来の形にしか無いので、legacy を明示する。v10 でも同じ形が返る。
  const client = contentful.createClient(
    {
      accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
    },
    { type: "legacy" },
  );

  return client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
};
