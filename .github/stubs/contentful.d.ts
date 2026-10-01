// CI 専用のスタブ。本物は `npm run contentful-typescript-codegen` が
// Contentful の Management API から @types/generated/contentful.d.ts に生成する
// （トークンが要る）。CI には Secrets を置いていないので、lint と型検査の
// 前にこのファイルを同じ場所へ複写して代わりに使う。
// フィールドはコードが読んでいるものだけを書いている。Contentful 側で
// コンテンツモデルを変えたら、ここも合わせる。

declare namespace Contentful {
  type Asset = import("contentful").Asset;
  type Entry<T> = import("contentful").Entry<T>;

  export interface IAndMoreFields {
    title: string;
    url?: string;
  }

  export interface IAppleMusicFields {
    longUrl?: string;
    url?: string;
  }

  export interface IBoothFields {
    jacket: Asset;
    title: string;
    url: string;
  }

  export interface IDramaCdFields {
    title: string;
    url?: string;
  }

  export interface IGameMusicFields {
    title: string;
    url?: string;
  }

  export interface IIncidentalMusicFields {
    title: string;
    url?: string;
  }

  export interface IInstrumentPlayingFields {
    title: string;
    url?: string;
  }

  export interface INewsFields {
    date: string;
    title: string;
    url?: string;
  }

  export interface ISongMusicFields {
    title: string;
    url?: string;
  }

  export interface ISpotifyFields {
    url: string;
  }

  export interface IWorkInChargeFields {
    title: string;
    url?: string;
  }

  export interface IYouTubeFields {
    title: string;
    url: string;
  }

  export type IEntry = Entry<
    | IAndMoreFields
    | IAppleMusicFields
    | IBoothFields
    | IDramaCdFields
    | IGameMusicFields
    | IIncidentalMusicFields
    | IInstrumentPlayingFields
    | INewsFields
    | ISongMusicFields
    | ISpotifyFields
    | IWorkInChargeFields
    | IYouTubeFields
  >;

  export type CONTENT_TYPE =
    | "andMore"
    | "appleMusic"
    | "booth"
    | "dramaCd"
    | "gameMusic"
    | "incidentalMusic"
    | "instrumentPlaying"
    | "news"
    | "songMusic"
    | "spotify"
    | "workInCharge"
    | "youTube";
}
