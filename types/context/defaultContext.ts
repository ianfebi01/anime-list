import { AnimeDetails, AnimePage, AnimeParams } from "../animeList";

export type DefaultStateType = {
  page?: string;
  animeParams?: AnimeParams;
  animeList?: AnimePage | null;
  animeDetails?: AnimeDetails | null;
};
export type DefaultContextType = {
  defaultState: DefaultStateType | null;
};

export type Actions<T> = {
  [Key in keyof T]: {
    type: Key;
    payload: T[Key];
  };
}[keyof T];
