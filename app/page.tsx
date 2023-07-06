"use client";
import { useContext, useEffect } from "react";
import { DefaultContext } from "@/context/defaultContext";
import GET_ANIME from "@/graphql/queries/getAnimeList.gql";
import { Anime, AnimePage } from "@/types/animeList";
import { useLazyQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { breakpoints, mq } from "@/assets/breakpoint";
import CardAnime from "@/components/Atoms/CardAnime";
import Pagination from "@/components/Molecules/Pagination";
import { useRouter } from "next/navigation";
import AnimeListSkeleton from "@/components/Molecules/AnimeListSkeleton";
import Search from "@/components/Atoms/Search";

export default function Home() {
  const { state, dispatch } = useContext(DefaultContext);

  // Get Data
  const [getData, { data, loading }] = useLazyQuery<AnimePage>(GET_ANIME, {
    variables: {
      ...state.defaultState?.animeParams,
    },
    onCompleted(datas) {
      dispatch({
        type: "SET_ANIME_DATAS",
        payload: {
          ...datas,
        },
      });
    },
  });

  useEffect(() => {
    getData({
      variables: {
        ...state.defaultState?.animeParams,
      },
    });
  }, [state.defaultState?.animeParams]);

  // remove initial loader
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  // route
  const router = useRouter();

  const handleClickCard = (id: number) => {
    router.push(`/anime-details/${id}`);
  };

  // pagination
  const handleClickNext = () => {
    console.log("click");
    if (data?.Page?.pageInfo?.currentPage) {
      dispatch({
        type: "SET_ANIME_PARAMS",
        payload: {
          page: data?.Page?.pageInfo?.currentPage + 1,
        },
      });
    }
  };
  const handleClickPrevious = () => {
    console.log("click");
    if (data?.Page?.pageInfo?.currentPage) {
      if (data?.Page?.pageInfo?.currentPage > 1) {
        dispatch({
          type: "SET_ANIME_PARAMS",
          payload: {
            page: data?.Page?.pageInfo?.currentPage - 1,
          },
        });
      }
    }
  };

  // search
  const setParams = (e: string) => {
    dispatch({
      type: "SET_ANIME_PARAMS",
      payload: {
        search: e,
        page: 1,
      },
    });
  };

  return (
    <main
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: scroll;
        ${mq[3]} {
          max-width: ${breakpoints[3]}px;
        }
        margin-top: 52.83px;
        padding: 20px 20px;
      `}
    >
      <Search onChange={(e) => setParams(e)} />
      {loading ? (
        <AnimeListSkeleton />
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            position: relative;

            flex-grow: 1;
          `}
        >
          <div
            css={css`
              display: grid;
              gap: 10px;
              grid-template-columns: auto;
              ${mq[0]} {
                grid-template-columns: auto auto;
              }
              ${mq[1]} {
                grid-template-columns: auto auto;
              }
              ${mq[2]} {
                grid-template-columns: auto auto;
              }
            `}
          >
            {state.defaultState?.animeList?.Page?.media?.map((item: Anime) => {
              return (
                <CardAnime
                  key={item?.id}
                  item={item}
                  onClick={() => handleClickCard(item.id)}
                />
              );
            })}
          </div>

          <div
            css={css`
              margin: 20px 0;
            `}
          >
            <Pagination
              pageInfo={state?.defaultState?.animeList?.Page?.pageInfo}
              handleClickNext={() => handleClickNext()}
              handleClickPrevious={() => handleClickPrevious()}
            />
          </div>
        </div>
      )}
    </main>
  );
}
