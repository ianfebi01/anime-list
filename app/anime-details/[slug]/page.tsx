"use client";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { Fragment, useContext, useEffect, useState } from "react";

import GET_ANIME_BY_ID from "@/graphql/queries/getAnimeById.gql";
import { AnimeDetails } from "@/types/animeList";
import { DefaultContext } from "@/context/defaultContext";
import { css } from "@emotion/react";
import { breakpoints, mq } from "@/assets/breakpoint";
import ModalAddCollection from "@/components/Organisms/ModalAddCollection";
import { useRouter } from "next/navigation";
import BannerDetails from "@/components/Molecules/BannerDetails";
import ImageCoverDetails from "@/components/Atoms/ImageCoverDetails";
import InfoDetailsAnime from "@/components/Molecules/InfoDetailsAnime";
import AnimeDetailsSkeleton from "@/components/Organisms/AnimeDetailsSkeleton";
import { CollectionAdded, Collections } from "@/types/collections";
import { SelectOption } from "@/types/reactSelect";
import { type } from "os";

export default function Page({ params }: { params: { slug: string } }) {
  // Context
  const { state, dispatch } = useContext(DefaultContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  // route
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // GetData
  const [getDataById, { loading }] = useLazyQuery(GET_ANIME_BY_ID, {
    variables: {
      id: params.slug,
    },
    onCompleted(datas) {
      dispatch({
        type: "SET_ANIME_DETAILS",
        payload: {
          ...datas.Media,
        },
      });
      setSelectedValue();
    },
  });
  useEffect(() => {
    getDataById({
      variables: {
        id: params.slug,
      },
    });
  }, []);

  // remove initial loader
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  // Add collection
  const handleAddCollection = (data: AnimeDetails) => {
    // localStorage.setItem("collection", JSON.stringify(data));
    setShowModal(true);
  };

  // set collection
  const [collection, setCollection] = useState<Collections[]>();

  useEffect(() => {
    setCollectionFromStorageFirstMount();
  }, [collection]);

  const setCollectionFromStorageFirstMount = async () => {
    const tmp: Collections[] = await JSON.parse(
      localStorage.getItem("collection") as string
    );

    if (!tmp) {
      await window.localStorage.setItem("collection", JSON.stringify([]));
      if (!collection) {
        setCollection([]);
      }
    } else {
      if (!collection) {
        setCollection(tmp);
      }
    }
  };

  // set collection already added

  const [selectValue, setSelectValue] = useState<CollectionAdded[]>();

  useEffect(() => {
    setSelectedValue();
  }, [selectValue]);

  const setSelectedValue = async () => {
    let alreadyAdded = [];
    if (!collection) return;
    for (const item of collection) {
      const index = await item.datas.findIndex(
        (value) => value.id === Number(params.slug)
      );

      if (index != -1) {
        alreadyAdded.push({
          name: item.name,
          id: item.id,
        });
      }
    }
    if (!selectValue) {
      setSelectValue(alreadyAdded);
    }
    mapCollectionAdded();
  };
  const [collectionAdded, setCollectionAdded] = useState<CollectionAdded[]>();

  const mapCollectionAdded = () => {
    const tmp = selectValue?.map((item) => item);
    setCollectionAdded(tmp);
  };

  return (
    <>
      {loading ? (
        <AnimeDetailsSkeleton />
      ) : (
        <Fragment>
          <ModalAddCollection
            show={showModal}
            setShow={(e: boolean) => setShowModal(e)}
            loading={loading}
            disable={false}
            data={state?.defaultState?.animeDetails as AnimeDetails}
          />
          <div
            css={css`
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
            `}
          >
            <BannerDetails
              handleBack={() => handleBack()}
              banner={state?.defaultState?.animeDetails?.bannerImage as string}
              cover={
                state?.defaultState?.animeDetails?.coverImage?.large as string
              }
            />
            <div
              css={css`
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <div
                css={css`
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  flex-grow: 1;
                  gap: 10px;
                  position: relative;
                  ${mq[3]} {
                    max-width: ${breakpoints[3]}px;
                  }
                  padding: 0 20px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    grid-template-columns: 100px auto;
                    ${mq[0]} {
                      display: grid;
                      grid-template-columns: 212px auto;
                    }
                    position: relative;
                    height: 100%;
                  `}
                >
                  <div
                    css={css`
                      position: relative;
                      height: 100%;
                    `}
                  >
                    <ImageCoverDetails
                      cover={
                        state.defaultState?.animeDetails?.coverImage
                          ?.large as string
                      }
                    />
                  </div>
                  <InfoDetailsAnime
                    datas={state?.defaultState?.animeDetails as AnimeDetails}
                    handleAddCollection={() =>
                      handleAddCollection(
                        state?.defaultState?.animeDetails as AnimeDetails
                      )
                    }
                    collectionAdded={collectionAdded as CollectionAdded[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
}

// export default AnimeList;
