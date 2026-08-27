import { type Metadata } from "next";

export const SITE_NAME = "Natsuzolab";

export const SITE_URL = "https://www.natsuzolab.com";

export const DEFAULT_DESCRIPTION =
  "作曲家、成田旬のウェブサイトNatsuzolabです。歌物、劇伴、ゲームのBGMなど様々な業務を行っております。";

export type CreateMetadataParams = {
  /** 省略するとサイト全体の説明が入る */
  description?: string;
  /** 先頭に "/" を付けた実際のパス。canonical と og:url に使う */
  path?: string;
  /** 省略するとサイト名だけになる。渡すと "Works - Natsuzolab" の形 */
  title?: string;
  type?: "article" | "website";
};

/**
 * 各ページの metadata を組み立てる。
 *
 * og の中身は親から引き継がれないので、下層でも images まで書く。
 * 以前は next-seo を head.tsx から呼んでいたが、その経路は Next 13.2 で
 * 非推奨になり、本番では meta が1つも出ていなかった。
 *
 * @return {Metadata} そのページの metadata
 */
export default function createMetadata({
  description = DEFAULT_DESCRIPTION,
  path = "/",
  title,
  type = "website",
}: CreateMetadataParams = {}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    description,
    alternates: { canonical: url },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      description,
      type,
      url,
      images: [
        {
          alt: SITE_NAME,
          height: 630,
          type: "image/png",
          url: "/ogp.png",
          width: 1200,
        },
      ],
      siteName: SITE_NAME,
      title: title === undefined ? SITE_NAME : `${title} - ${SITE_NAME}`,
    },
    /* 親が template を持つので、下層は短い題名だけ渡せば
       "Works - Natsuzolab" になる。 */
    title:
      title === undefined
        ? { default: SITE_NAME, template: `%s - ${SITE_NAME}` }
        : title,
    twitter: { card: "summary_large_image" },
  };
}
