/* eslint-disable filenames/match-exported */
// eslint-disable-next-line camelcase
import { Zen_Kaku_Gothic_New } from "@next/font/google";
import { type Metadata } from "next";
import { ReactNode } from "react";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "ress/dist/ress.min.css";
// eslint-disable-next-line postcss-modules/no-unused-class
import "./globals.scss";
import "./mq-settings.scss";
import Analytics from "components/Analytics";
import Layout from "components/Layout";
import Toast from "components/Toast";
import createMetadata from "libs/createMetadata";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  ...createMetadata(),
  icons: { icon: "/favicon.ico" },
};

export type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ja">
      <body className={zenKakuGothicNew.className}>
        <Analytics />
        <Toast />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
