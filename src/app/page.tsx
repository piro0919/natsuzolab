import * as contentful from "contentful";
import { type JSX } from "react";
import Home, { HomeProps } from "components/Home";
import client from "libs/client";

// revalidate every hour
export const revalidate = 3600;

type NewsData = contentful.EntryCollection<Contentful.INewsFields>;

async function getNews(): Promise<NewsData> {
  const contentType: Contentful.CONTENT_TYPE = "news";
  const entries = await client.getEntries<Contentful.INewsFields>({
    content_type: contentType,
    limit: 5,
    order: "-fields.date",
  });

  return entries;
}

type YouTubeData = contentful.EntryCollection<Contentful.IYouTubeFields>;

async function getYouTube(): Promise<YouTubeData> {
  const contentType: Contentful.CONTENT_TYPE = "youTube";
  const entries = await client.getEntries<Contentful.IYouTubeFields>({
    content_type: contentType,
    limit: 6,
    order: "-sys.createdAt",
  });

  return entries;
}

export default async function Page(): Promise<JSX.Element> {
  const [newsData, youTubeData] = await Promise.all([getNews(), getYouTube()]);
  const newsList: HomeProps["newsList"] = newsData.items.map(
    ({ fields: { date, title, url } }) => ({
      date,
      title,
      url: url || "",
    })
  );
  const youTubeList: HomeProps["youTubeList"] = youTubeData.items.map(
    ({ fields: { url } }) => ({
      url,
    })
  );

  return <Home newsList={newsList} youTubeList={youTubeList} />;
}
