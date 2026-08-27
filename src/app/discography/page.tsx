import * as contentful from "contentful";
import Discography from "components/Discography";
import client from "libs/client";
import createMetadata from "libs/createMetadata";

export const metadata = createMetadata({
  description:
    "作曲家・成田旬のディスコグラフィです。参加作品と音源をまとめています。",
  path: "/discography",
  title: "Discography",
});

// revalidate every hour
export const revalidate = 3600;

type AppleMusicData = contentful.EntryCollection<Contentful.IAppleMusicFields>;

async function getAppleMusic(): Promise<AppleMusicData> {
  const contentType: Contentful.CONTENT_TYPE = "appleMusic";
  const entries = await client.getEntries<Contentful.IAppleMusicFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type BoothData = contentful.EntryCollection<Contentful.IBoothFields>;

async function getBooth(): Promise<BoothData> {
  const contentType: Contentful.CONTENT_TYPE = "booth";
  const entries = await client.getEntries<Contentful.IBoothFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type SpotifyData = contentful.EntryCollection<Contentful.ISpotifyFields>;

async function getSpotify(): Promise<SpotifyData> {
  const contentType: Contentful.CONTENT_TYPE = "spotify";
  const entries = await client.getEntries<Contentful.ISpotifyFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

type YouTubeData = contentful.EntryCollection<Contentful.IYouTubeFields>;

async function getYouTube(): Promise<YouTubeData> {
  const contentType: Contentful.CONTENT_TYPE = "youTube";
  const entries = await client.getEntries<Contentful.IYouTubeFields>({
    content_type: contentType,
    order: "-sys.createdAt",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
}

export default async function Page(): Promise<JSX.Element> {
  const [appleMusicData, boothData, spotifyData, youTubeData] =
    await Promise.all([
      getAppleMusic(),
      getBooth(),
      getSpotify(),
      getYouTube(),
    ]);
  const appleMusicList = appleMusicData.items
    .map(({ fields: { longUrl, url } }) => url || longUrl)
    .filter((url): url is string => !!url)
    .map((url) => ({ url }));
  const boothList = boothData.items.map(
    ({
      fields: {
        jacket: {
          fields: {
            file: { url: jacketUrl },
          },
        },
        title,
        url,
      },
    }) => ({
      jacketUrl,
      title,
      url,
    })
  );
  const spotifyList = spotifyData.items.map(({ fields: { url } }) => ({
    url,
  }));
  const youTubeList = youTubeData.items.map(({ fields: { title, url } }) => ({
    title,
    url,
  }));

  return (
    <Discography
      appleMusicList={appleMusicList}
      boothList={boothList}
      spotifyList={spotifyList}
      youTubeList={youTubeList}
    />
  );
}
