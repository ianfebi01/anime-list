import { AnimeDetails } from "./animeList";

export interface Collections {
  name: string;
  datas: AnimeDetails[];
  id: string;
}

export interface CollectionAdded {
  name: string;
  id: string;
}
