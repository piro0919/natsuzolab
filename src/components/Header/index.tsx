import { Comfortaa } from "next/font/google";
import Link from "next/link";
import { type JSX, MouseEventHandler, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import Spacer from "react-spacer";
import { useScrollYPosition } from "react-use-scroll-position";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";
import PrimaryNavigation from "components/PrimaryNavigation";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: "400",
});

export type HeaderProps = {
  onOpen: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ onOpen }: HeaderProps): JSX.Element {
  const scrollY = useScrollYPosition();
  const { setValue: setIsTop, value: isTop } = useBoolean(true);

  useEffect(() => {
    console.log(scrollY);

    setIsTop(scrollY < 144);
  }, [scrollY, setIsTop]);

  return (
    <header className={`${styles.header} ${isTop ? "" : styles.narrow}`}>
      <div className={styles.inner}>
        <Link href="/">
          <h1 className={`${comfortaa.className} ${styles.h1}`}>Natsuzolab</h1>
        </Link>
        <Spacer grow={1} />
        <div className={styles.primaryNavigationWrapper}>
          <PrimaryNavigation />
        </div>
        <button className={styles.button} onClick={onOpen}>
          <RiMenu3Fill color="#fff" size={24} />
        </button>
      </div>
    </header>
  );
}
