import { type JSX } from "react";
import { SocialIcon } from "react-social-icons";
import Spacer from "react-spacer";
import styles from "./style.module.scss";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copyright}>&copy; 2015 Natsuzolab</span>
        <Spacer grow={1} />
        <div className={styles.socialIconsWrapper}>
          <SocialIcon
            className={styles.socialIcon}
            fgColor="#fff"
            rel="noreferrer"
            target="_blank"
            url="https://twitter.com/UsugataNY"
          />
          <SocialIcon
            className={styles.socialIcon}
            fgColor="#fff"
            rel="noreferrer"
            target="_blank"
            url="https://www.youtube.com/channel/UCyPuV9c2QKLAQcK9JEIsVfQ"
          />
        </div>
      </div>
    </footer>
  );
}
