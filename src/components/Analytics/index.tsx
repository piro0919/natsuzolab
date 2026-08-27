"use client";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

/**
 * 計測は client 側でしか動かない。レイアウトごと "use client" にすると
 * metadata を書き出せなくなるので、こちらへ寄せている。
 *
 * @return {JSX.Element} 計測タグ
 */
export default function Analytics(): JSX.Element {
  usePageViews({ gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID });

  return <GoogleAnalytics />;
}
