import * as contentful from "contentful";
import Works, { WorksProps } from "components/Works";
import client from "libs/client";
import createMetadata from "libs/createMetadata";

export const metadata = createMetadata({
  description:
    "作曲家・成田旬のこれまでの仕事をまとめています。歌物、劇伴、ゲームBGM、楽器演奏などの実績をご覧いただけます。",
  path: "/works",
  title: "Works",
});

// revalidate every hour
export const revalidate = 3600;

type AndMoreData = contentful.EntryCollection<Contentful.IAndMoreFields>;

async function getAndMore(): Promise<AndMoreData> {
  const contentType: Contentful.CONTENT_TYPE = "andMore";
  const entries = await client.getEntries<Contentful.IAndMoreFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type DramaCdData = contentful.EntryCollection<Contentful.IDramaCdFields>;

async function getDramaCd(): Promise<DramaCdData> {
  const contentType: Contentful.CONTENT_TYPE = "dramaCd";
  const entries = await client.getEntries<Contentful.IDramaCdFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type GameMusicData = contentful.EntryCollection<Contentful.IGameMusicFields>;

async function getGameMusic(): Promise<GameMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "gameMusic";
  const entries = await client.getEntries<Contentful.IGameMusicFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type IncidentalMusicData =
  contentful.EntryCollection<Contentful.IIncidentalMusicFields>;

async function getIncidentalMusic(): Promise<IncidentalMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "incidentalMusic";
  const entries = await client.getEntries<Contentful.IIncidentalMusicFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type InstrumentPlayingData =
  contentful.EntryCollection<Contentful.IInstrumentPlayingFields>;

async function getInstrumentPlaying(): Promise<InstrumentPlayingData> {
  const contentType: Contentful.CONTENT_TYPE = "instrumentPlaying";
  const entries = await client.getEntries<Contentful.IInstrumentPlayingFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type SongMusicData = contentful.EntryCollection<Contentful.ISongMusicFields>;

async function getSongMusic(): Promise<SongMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "songMusic";
  const entries = await client.getEntries<Contentful.ISongMusicFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    })
  );
  const dramaCdList: WorksProps["dramaCdList"] = dramaCdData.items.map(
    ({ fields: { title, url } }) => ({
      title,
      url: url || "",
    })
  );
  const gameMusicList: WorksProps["gameMusicList"] = gameMusicData.items.map(
    ({ fields: { title, url } }) => ({
      title,
      url: url || "",
    })
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
    })
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
