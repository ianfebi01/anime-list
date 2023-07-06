import { AnimeDetails, AnimePage, AnimeParams } from "@/types/animeList";
import { Actions, DefaultStateType } from "@/types/context/defaultContext";
import { Reducer } from "react";

export const defaultReducer: Reducer<
  DefaultStateType | null,
  Actions<ActionMapDefaultReducer>
> = (state, { payload, type }) => {
  switch (type) {
    case "SET_PAGE":
      return {
        ...state,
        ...payload,
      };
    case "SET_ANIME_DATAS":
      return {
        ...state,
        animeList: { ...payload },
      };
    case "SET_ANIME_DETAILS":
      return {
        ...state,
        animeDetails: { ...payload },
      };
    case "SET_ANIME_PARAMS":
      let tmpPayload: AnimeParams | null = payload;

      if (payload?.search === "") {
        tmpPayload = {
          ...tmpPayload,
          search: null,
        };
      }
      return {
        ...state,
        animeParams: {
          ...state?.animeParams,
          ...tmpPayload,
        },
      };
    default:
      return state;
  }
};

type SET_PAGE = {
  page?: string;
};

export type ActionMapDefaultReducer = {
  SET_PAGE: SET_PAGE | null;
  SET_ANIME_PARAMS: AnimeParams | null;
  SET_ANIME_DATAS: AnimePage | null;
  SET_ANIME_DETAILS: AnimeDetails | null;
};
