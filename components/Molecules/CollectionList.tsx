import { colors } from "@/assets/colors";
import { Collections } from "@/types/collections";
import { css } from "@emotion/react";
import React, { FunctionComponent, MouseEvent } from "react";
import { Pen, Trash } from "../Icons";
import ButtonIcon from "../Atoms/ButtonIcon";
import Image from "next/image";

interface Props {
  data: Collections;
  onClick: () => void;
  remove: () => void;
  edit: () => void;
}

const CollectionList: FunctionComponent<Props> = ({
  data,
  onClick,
  remove,
  edit,
}) => {
  const handleClickCard = (
    e: React.MouseEvent<Element, globalThis.MouseEvent>
  ) => {
    e.cancelable = true;
    if (e.stopPropagation) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleClickRemove = (
    e: React.MouseEvent<Element, globalThis.MouseEvent>
  ) => {
    e.cancelable = true;
    if (e.stopPropagation) {
      e.stopPropagation();
      remove();
    }
  };
  const handleClickEdit = (
    e: React.MouseEvent<Element, globalThis.MouseEvent>
  ) => {
    e.cancelable = true;
    if (e.stopPropagation) {
      e.stopPropagation();
      edit();
    }
  };
  return (
    <div
      css={css`
        border: 1.5px solid ${colors.stroke};
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        z-index: 10;
        background-color: #fff;
        display: flex;
        height: 103px;
        cursor: pointer;
        overflow: hidden;
        &:hover {
          background-color: #f9f9f9;
          overflow: hidden;
        }
      `}
      className="shadow transition--03"
      onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
        handleClickCard(e)
      }
    >
      <div
        css={css`
          height: 100%;
          min-width: 80px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        `}
      >
        {data?.datas[0]?.coverImage?.large ? (
          <Image
            src={data.datas[0].coverImage.large}
            alt="Cover image"
            style={{ objectFit: "cover" }}
            fill
            priority={true}
            sizes="100%"
          />
        ) : (
          <Image
            src="https://res.cloudinary.com/djyp9rr7s/image/upload/v1671439956/Pngtree_no_image_vector_illustration_isolated_4979075_ncvayj.png"
            alt="Cover image"
            style={{ objectFit: "cover" }}
            fill
            priority={true}
            sizes="100%"
          />
        )}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 15px 10px;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              color: ${colors.black};
              font-weight: bold;
              font-size: 18px;
            `}
          >
            {data?.name}
          </span>
          <ButtonIcon onClick={(e) => handleClickEdit(e)}>
            <Pen />
          </ButtonIcon>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              color: ${colors.textSecondary};
              font-size: 12px;
            `}
          >
            {data?.datas?.length + " data in collection"}
          </span>
          <ButtonIcon
            onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
              handleClickRemove(e)
            }
          >
            <Trash />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
