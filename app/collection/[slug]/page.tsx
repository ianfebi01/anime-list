"use client";
import { breakpoints, mq } from "@/assets/breakpoint";
import { colors } from "@/assets/colors";
import Button from "@/components/Atoms/Button";
import CardAnime from "@/components/Atoms/CardAnime";
import { ArrowLeft } from "@/components/Icons";
import Pagination from "@/components/Molecules/Pagination";
import ModalDelete from "@/components/Organisms/ModalDelete";
import ModalEditCollection from "@/components/Organisms/ModalEditCollection";
import { Anime, AnimeDetails } from "@/types/animeList";
import { Collections } from "@/types/collections";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import css from "styled-jsx/css";

export default function Page({ params }: { params: { slug: string } }) {
  const [datas, setDatas] = useState<Collections>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  // router
  const router = useRouter();

  //   set collection to state
  const [collection, setCollection] = useState<Collections[]>();

  useEffect(() => {
    setCollectionFromStorage();
  }, [collection]);

  const setCollectionFromStorage = async () => {
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
    findCollectionById();
  };

  const findCollectionById = () => {
    const id: string = params.slug;

    const tmp: Collections | undefined = collection?.find(
      (item) => item.id === id
    );
    setDatas(tmp as Collections);
    collectionMap(tmp as Collections);
  };

  // maping collection
  const [datassss, setDatassss] = useState<AnimeDetails[]>();

  const collectionMap = (data: Collections) => {
    const tmp: AnimeDetails[] | undefined = data?.datas?.map((item) => item);
    return setDatassss(tmp);
  };

  //   modal edit collection
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  //   modal delete
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const handleClickRmove = (id: number) => {
    setShowModalDelete(true);
    setAnimeId(id);
  };
  //   remove from collection

  const [animeId, setAnimeId] = useState<number>();
  const handleRemove = async (id: number) => {
    if (collection) {
      const tmp: Collections[] = collection;
      const index = await tmp.findIndex((item) => item.id === datas?.id);
      if (index != -1) {
        const datasIndex = await tmp[index]?.datas?.findIndex(
          (item) => item.id === id
        );

        if (datasIndex != -1) {
          tmp[index].datas.splice(datasIndex, 1);
          setCollection(tmp);
          localStorage.setItem("collection", JSON.stringify(collection));
          findCollectionById();
          setShowModalDelete(false);
        }
      }
    }
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
      <ModalEditCollection
        show={showModalEdit}
        setShow={() => setShowModalEdit(false)}
        disable={false}
        data={datas as Collections}
        setData={(values) => setDatas(values)}
      />
      <ModalDelete
        show={showModalDelete}
        actionPositive={() => handleRemove(animeId as number)}
        actionNegative={() => setShowModalDelete(false)}
        disable={false}
      />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;
          flex-grow: 1;
          gap: 20px;
        `}
      >
        <div
          css={css`
            max-width: fit-content;
          `}
        >
          <Button
            block={false}
            color={colors.secondary}
            primary={false}
            onClick={() => router.push("/collection")}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
              `}
            >
              <div
                css={css`
                  transform: translateY(1.5px);
                `}
              >
                <ArrowLeft />
              </div>
              <span>Back</span>
            </div>
          </Button>
        </div>
        <div
          css={css`
            padding: 10px 0;
            z-index: 10;
            border-bottom: 1.5px solid ${colors.stroke};
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <h1
            css={css`
              font-weight: bold;
              font-size: 22px;
            `}
          >
            {datas?.name}
          </h1>
          <div>
            <Button onClick={() => setShowModalEdit(true)}>
              Edit Collection
            </Button>
          </div>
        </div>
        <div
          css={css`
            display: grid;
            gap: 10px;
            grid-template-columns: auto;

            ${mq[0]} {
              grid-template-columns: ${datassss?.length === 1
                ? "1fr"
                : "1fr 1fr"};
            }
            ${mq[1]} {
              grid-template-columns: ${datassss?.length === 1
                ? "1fr"
                : "1fr 1fr"};
            }

            ${mq[2]} {
              grid-template-columns: ${datassss?.length === 1
                ? "1fr"
                : "1fr 1fr"};
            }
          `}
        >
          {datassss?.map((item: AnimeDetails) => {
            return (
              <CardAnime
                key={item?.id}
                item={item as Anime}
                onClick={() => router.push("/anime-details/" + item.id)}
                remove={() => handleClickRmove(item?.id as number)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
