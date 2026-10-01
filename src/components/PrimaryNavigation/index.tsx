import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function PrimaryNavigation(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav>
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
    </nav>
  );
}
