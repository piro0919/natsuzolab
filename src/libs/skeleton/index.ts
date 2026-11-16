import type { Asset, EntryFieldTypes } from "contentful";

// contentful 10 以降の getEntries と Entry は、フィールドを EntryFieldTypes で
// 書いた「skeleton」を受け取る。contentful-typescript-codegen が出す
// contentful.d.ts（と CI のスタブ）は値の型そのままの v9 の形なので、ここで変換する。
type FieldType<T> = T extends string
  ? EntryFieldTypes.Symbol
  : T extends number
    ? EntryFieldTypes.Number
    : T extends boolean
      ? EntryFieldTypes.Boolean
      : T extends Asset
        ? EntryFieldTypes.AssetLink
        : never;

export type Skeleton<Fields> = {
  contentTypeId: Contentful.CONTENT_TYPE;
  fields: { [Key in keyof Fields]-?: FieldType<NonNullable<Fields[Key]>> };
};
