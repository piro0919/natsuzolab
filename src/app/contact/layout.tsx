// eslint-disable-next-line filenames/match-exported
import { ReactNode } from "react";
import createMetadata from "libs/createMetadata";

/* ページ本体が "use client" なので metadata を置けない。
   この階層だけレイアウトを挟んで持たせている。 */
export const metadata = createMetadata({
  description:
    "作曲家・成田旬へのお仕事のご依頼・お問い合わせはこちらからお願いします。",
  path: "/contact",
  title: "Contact",
});

export type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({
  children,
}: ContactLayoutProps): JSX.Element {
  return <>{children}</>;
}
