"use client";
// eslint-disable-next-line camelcase
import { Sawarabi_Gothic } from "@next/font/google";
import { useMemo } from "react";
import useCollapse from "react-collapsed";
import {
  IoChevronDownCircleSharp,
  IoChevronUpCircleSharp,
} from "react-icons/io5";
import styles from "./style.module.scss";

const sawarabiGothic = Sawarabi_Gothic({
  subsets: ["latin"],
  weight: "400",
});

type Work = {
  title: string;
  url: string;
};

type ArticleProps = {
  heading: string;
  initialCount?: number;
  works: Work[];
};

function Article({
  heading,
  initialCount = 3,
  works,
}: ArticleProps): JSX.Element {
  const collapse = useCollapse();
  const items = useMemo(
    () =>
      works.map(({ title, url }) => (
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
      )),
    [works]
  );

  return (
    <article className={styles.article}>
      <h2 className={sawarabiGothic.className}>{heading}</h2>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {items.filter((_, index) => index < initialCount)}
        </ul>
        <ul {...collapse.getCollapseProps()}>
          {items.filter((_, index) => index >= initialCount)}
        </ul>
      </div>
      <div className={styles.bottomWrapper}>
        {items.at(initialCount) ? (
          <button {...collapse.getToggleProps()}>
            {collapse.isExpanded ? (
              <IoChevronUpCircleSharp color="#fff" size={24} />
            ) : (
              <IoChevronDownCircleSharp color="#fff" size={24} />
            )}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export type WorksProps = {
  andMoreList: ArticleProps["works"];
  dramaCdList: ArticleProps["works"];
  gameMusicList: ArticleProps["works"];
  incidentalMusicList: ArticleProps["works"];
  instrumentPlayingList: ArticleProps["works"];
  songMusicList: ArticleProps["works"];
};

export default function Works({
  andMoreList,
  dramaCdList,
  gameMusicList,
  incidentalMusicList,
  instrumentPlayingList,
  songMusicList,
}: WorksProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.incidentalMusicArticleWrapper}>
          <Article
            heading="劇伴"
            initialCount={5}
            works={incidentalMusicList}
          />
        </div>
        <div>
          <Article heading="ゲーム" works={gameMusicList} />
        </div>
        <div>
          <Article heading="ボーカル楽曲" works={songMusicList} />
        </div>
        <div>
          <Article heading="演奏" works={instrumentPlayingList} />
        </div>
        <div>
          <Article heading="ドラマCD" works={dramaCdList} />
        </div>
        <div>
          <Article heading="その他" works={andMoreList} />
        </div>
      </div>
    </div>
  );
}
