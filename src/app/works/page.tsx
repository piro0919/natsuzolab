import * as contentful from "contentful";
import { type JSX } from "react";
import Works, { WorksProps } from "components/Works";
import client from "libs/client";
import type { Skeleton } from "libs/skeleton";
import createMetadata from "libs/createMetadata";

export const metadata = createMetadata({
  description:
    "作曲家・成田旬のこれまでの仕事をまとめています。歌物、劇伴、ゲームBGM、楽器演奏などの実績をご覧いただけます。",
  path: "/works",
  title: "Works",
});

// revalidate every hour
export const revalidate = 3600;

type AndMoreData = contentful.EntryCollection<
  Skeleton<Contentful.IAndMoreFields>,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

async function getAndMore(): Promise<AndMoreData> {
  const contentType: Contentful.CONTENT_TYPE = "andMore";
  const entries = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.IAndMoreFields>
  >({
    content_type: contentType,
    order: ["-sys.createdAt"],
  });

  return entries;
}

type DramaCdData = contentful.EntryCollection<
  Skeleton<Contentful.IDramaCdFields>,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

async function getDramaCd(): Promise<DramaCdData> {
  const contentType: Contentful.CONTENT_TYPE = "dramaCd";
  const entries = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.IDramaCdFields>
  >({
    content_type: contentType,
    order: ["-sys.createdAt"],
  });

  return entries;
}

type GameMusicData = contentful.EntryCollection<
  Skeleton<Contentful.IGameMusicFields>,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

async function getGameMusic(): Promise<GameMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "gameMusic";
  const entries = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.IGameMusicFields>
  >({
    content_type: contentType,
    order: ["-sys.createdAt"],
  });

  return entries;
}

type IncidentalMusicData = contentful.EntryCollection<
  Skeleton<Contentful.IIncidentalMusicFields>,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

async function getIncidentalMusic(): Promise<IncidentalMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "incidentalMusic";
  const entries = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.IIncidentalMusicFields>
  >({
    content_type: contentType,
    order: ["-sys.createdAt"],
  });

  return entries;
}

type InstrumentPlayingData = contentful.EntryCollection<
  Skeleton<Contentful.IInstrumentPlayingFields>,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

async function getInstrumentPlaying(): Promise<InstrumentPlayingData> {
  const contentType: Contentful.CONTENT_TYPE = "instrumentPlaying";
  const entries = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.IInstrumentPlayingFields>
  >({
    content_type: contentType,
    order: ["-sys.createdAt"],
  });

  return entries;
}

type SongMusicData = contentful.EntryCollection<
  Skeleton<Contentful.ISongMusicFields>,
  "WITHOUT_UNRESOLVABLE_LINKS"
>;

async function getSongMusic(): Promise<SongMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "songMusic";
  const entries = await client.withoutUnresolvableLinks.getEntries<
    Skeleton<Contentful.ISongMusicFields>
  >({
    content_type: contentType,
    order: ["-sys.createdAt"],
  });

  return entries;
}

export default async function Page(): Promise<JSX.Element> {
  const [
    andMoreData,
    dramaCdData,
    gameMusicData,
    incidentalMusicData,
    instrumentPlayingData,
    songMusicData,
  ] = await Promise.all([
    getAndMore(),
    getDramaCd(),
    getGameMusic(),
    getIncidentalMusic(),
    getInstrumentPlaying(),
    getSongMusic(),
  ]);
  const andMoreList: WorksProps["andMoreList"] = andMoreData.items.map(
    ({ fields: { title, url } }) => ({
      title,
      url: url || "",
    }),
  );
  const dramaCdList: WorksProps["dramaCdList"] = dramaCdData.items.map(
    ({ fields: { title, url } }) => ({
      title,
      url: url || "",
    }),
  );
  const gameMusicList: WorksProps["gameMusicList"] = gameMusicData.items.map(
    ({ fields: { title, url } }) => ({
      title,
      url: url || "",
    }),
  );
  const incidentalMusicList: WorksProps["incidentalMusicList"] =
    incidentalMusicData.items.map(({ fields: { title, url } }) => ({
      title,
      url: url || "",
    }));
  const instrumentPlayingList: WorksProps["instrumentPlayingList"] =
    instrumentPlayingData.items.map(({ fields: { title, url } }) => ({
      title,
      url: url || "",
    }));
  const songMusicList: WorksProps["songMusicList"] = songMusicData.items.map(
    ({ fields: { title, url } }) => ({
      title,
      url: url || "",
    }),
  );

  return (
    <Works
      andMoreList={andMoreList}
      dramaCdList={dramaCdList}
      gameMusicList={gameMusicList}
      incidentalMusicList={incidentalMusicList}
      instrumentPlayingList={instrumentPlayingList}
      songMusicList={songMusicList}
    />
  );
}
