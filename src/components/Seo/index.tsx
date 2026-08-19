"use client";
import { usePathname } from "next/navigation";
import { NextSeo, NextSeoProps } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";

const SITE_URL = "https://www.natsuzolab.com";
const DEFAULT_DESCRIPTION =
  "作曲家、成田旬のウェブサイトNatsuzolabです。歌物、劇伴、ゲームのBGMなど様々な業務を行っております。";

export type SeoProps = Pick<NextSeoProps, "title"> &
  Pick<OpenGraph, "type"> & {
    /** 省略するとサイト全体の説明が入る */
    description?: string;
  };

export default function Seo({
  description = DEFAULT_DESCRIPTION,
  title,
  type = "article",
}: SeoProps): JSX.Element {
  const pathname = usePathname();
  // og:url をトップに固定していたため、下層ページが自分自身を指していなかった
  const url = `${SITE_URL}${pathname || ""}`;

  return (
    <>
      <NextSeo
        canonical={url}
        defaultTitle="Natsuzolab"
        description={description}
        openGraph={{
          description,
          type,
          url,
          images: [
            {
              alt: "Natsuzolab",
              height: 630,
              type: "image/png",
              url: `${SITE_URL}/ogp.png`,
              width: 1200,
            },
          ],
        }}
        title={title}
        titleTemplate="%s - Natsuzolab"
        twitter={{
          cardType: "summary_large_image",
        }}
        useAppDir={true}
      />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link href="/favicon.ico" rel="icon" />
    </>
  );
}
