"use client";
import { breakpoints, mq } from "@/assets/breakpoint";
import { colors } from "@/assets/colors";
import Button from "@/components/Atoms/Button";
import CollectionList from "@/components/Molecules/CollectionList";
import ModalAddNewCollection from "@/components/Organisms/ModalAddNewCollection";
import ModalDelete from "@/components/Organisms/ModalDelete";
import { Collections } from "@/types/collections";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { number } from "yup";

export default function Page({ params }: { params: { slug: string } }) {
  // remove initial loader
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
    collectionMap();
  };
  const setCollectionFromStorage = async () => {
    const tmp: Collections[] = await JSON.parse(
      localStorage.getItem("collection") as string
    );

    if (!tmp) {
      await window.localStorage.setItem("collection", JSON.stringify([]));

      setCollection([]);
    } else {
      setCollection(tmp);
    }
    collectionMap();
  };

  // remove collection

  const [idCollection, setIdCollection] = useState<string>();

  const enableModalDelete = (id: string) => {
    setShow(true);
    setIdCollection(id);
  };

  const removeCollection = async (id: string) => {
    const index = await collection?.findIndex((item) => item.id === id);
    if (index != -1) {
      const tmp = collection;
      tmp?.splice(index as number, 1);
      await setCollection(tmp);
      await localStorage.setItem("collection", JSON.stringify(collection));
      collectionMap();
    }
    setShow(false);
  };

  // maping collection
  const [datassss, setDatassss] = useState<Collections[]>();
  const collectionMap = () => {
    const tmp: Collections[] | undefined = collection?.map((item) => item);
    return setDatassss(tmp);
  };

  // modal delete
  const [show, setShow] = useState<boolean>(false);

  // Modal Add New Collection
  const [showModalCollection, setShowModalCollection] =
    useState<boolean>(false);

  const handleHiddenModalAddNewCollection = () => {
    setShowModalCollection(false);
    setCollectionFromStorage();
  };

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 52.83px;
        padding: 30px 20px;
      `}
    >
      <ModalDelete
        show={show}
        actionNegative={() => setShow(false)}
        actionPositive={() => removeCollection(idCollection as string)}
        disable={false}
      />
      <ModalAddNewCollection
        show={showModalCollection}
        disable={false}
        setShow={() => handleHiddenModalAddNewCollection()}
      />
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 10px;
          position: relative;
          color: ${colors.black};

          ${mq[3]} {
            max-width: ${breakpoints[3]}px;
          }
          padding: 0 20px;
        `}
      >
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
            Collection
          </h1>
          <div>
            <Button onClick={() => setShowModalCollection(true)}>
              Add Collection
            </Button>
          </div>
        </div>

        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 10px;
          `}
        >
          {datassss?.map((item, i) => (
            <div key={item.id}>
              <CollectionList
                data={item}
                onClick={() => router.push("collection/" + item?.id)}
                remove={() => enableModalDelete(item.id as string)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
