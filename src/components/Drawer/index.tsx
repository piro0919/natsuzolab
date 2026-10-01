import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactModernDrawer from "react-modern-drawer";
import styles from "./style.module.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export type DrawerProps = {
  onClose: () => void;
  open: boolean;
};

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const pathname = usePathname();

  return (
    <ReactModernDrawer
      className={styles.drawer}
      direction="left"
      onClose={onClose}
      open={open}
    >
      <ul className={`${poppins.className} ${styles.list}`}>
        {[
          {
            title: "Home",
            url: "/",
          },
          {
            title: "Discography",
            url: "/discography",
          },
          {
            title: "Works",
            url: "/works",
          },
          {
            title: "Profile",
            url: "/profile",
          },
          {
            title: "Contact",
            url: "/contact",
          },
        ].map(({ title, url }) => (
          <li key={url}>
            <Link
              className={`${styles.link} ${
                pathname === url ? styles.active : ""
              }`}
              href={url}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </ReactModernDrawer>
  );
}
