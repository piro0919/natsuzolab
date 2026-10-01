"use client";
import queryString from "query-string";
import { type JSX, useState } from "react";
import useScrollbarSize from "react-scrollbar-size";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBoolean, useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";
import YouTubeModal from "components/YouTubeModal";

type News = {
  date: string;
  title: string;
  url: string;
};

type YouTube = {
  url: string;
};

export type HomeProps = {
  newsList: News[];
  youTubeList: YouTube[];
};

export default function Home({
  newsList,
  youTubeList,
}: HomeProps): JSX.Element {
  const { width: scrollbarWidth } = useScrollbarSize();
  const { width } = useWindowSize();
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean();
  const [url, setUrl] = useState("");
  // 閉じたら URL も空にして、次に開くまで動画を読み込ませない
  const handleClose = (): void => {
    offIsOpen();
    setUrl("");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.inner}
          style={{ width: `calc(100dvw - ${scrollbarWidth}px)` }}
        >
          <Swiper
            autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
            centeredSlides={true}
            className={styles.swiper}
            loop={true}
            modules={[Autoplay, Navigation]}
            navigation={true}
            slidesPerView={1.4}
            spaceBetween={width >= 980 ? 48 : 24}
          >
            {youTubeList.map(({ url }) => (
              <SwiperSlide key={url}>
                <div
                  className={styles.iframeWrapper}
                  onClick={(): void => {
                    setUrl(url);
                    onIsOpen();
                  }}
                >
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                    className={styles.iframe}
                    src={`https://www.youtube.com/embed/${
                      queryString.parseUrl(url).query.v?.toString() || ""
                    }?controls=0&modestbranding=1`}
                    title="YouTube video player"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.newsBlock}>
          <div className={styles.inner}>
            <ul className={styles.list}>
              {newsList.map(({ date, title, url }) => (
                <li className={styles.item} key={title}>
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
                    <div>{title}</div>
                  )}
                  <div className={styles.date}>{date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <YouTubeModal
        isOpen={isOpen}
        onClose={handleClose}
        videoId={queryString.parseUrl(url).query.v?.toString() || ""}
      />
    </>
  );
}
