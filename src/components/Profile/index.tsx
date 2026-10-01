import Image from "next/image";
import { type JSX } from "react";
import styles from "./style.module.scss";

type WorkInCharge = {
  title: string;
  url: string;
};

export type ProfileProps = {
  workInChargeList: WorkInCharge[];
};

export default function Profile({
  workInChargeList,
}: ProfileProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <article>
          <div className={styles.articleInner}>
            <div>
              <h2>
                成田 旬<small>（なりた しゅん）</small>
              </h2>
              <div className={styles.descriptionWrapper}>
                <p>
                  Composer & Arranger
                  <br />
                  劇伴から歌物など幅広く業務を行なっております。
                  <br />
                  Vocaloid Mayuの開発者です。
                </p>
                <article className={styles.article}>
                  <h3>業務内容</h3>
                  <p>
                    作曲・編曲・ギター、ベースの録音・サンプリング
                    ・歌のお直し・波形編集など
                  </p>
                </article>
                <article className={styles.article}>
                  <h3>主な担当作品</h3>
                  <ul className={styles.list}>
                    {workInChargeList.map(({ title, url }) => (
                      <li className={styles.item} key={url}>
                        {url ? (
                          <a
                            className={styles.link}
                            href={url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                alt="成田 旬"
                fill={true}
                src="/e85bb4_eac637d969084926ac5ae7bbde535365~mv2.jpg"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
