import { colors } from "@/assets/colors";
import { Collections } from "@/types/collections";
import { css } from "@emotion/react";
import React, { FunctionComponent, MouseEvent } from "react";
import { Trash } from "../Icons";
import ButtonIcon from "../Atoms/ButtonIcon";

interface Props {
  data: Collections;
  onClick: () => void;
  remove: () => void;
}

const CollectionList: FunctionComponent<Props> = ({
  data,
  onClick,
  remove,
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
  return (
    <div
      css={css`
        border: 1.5px solid ${colors.stroke};
        border-radius: 8px;
        padding: 20px 20px;
        z-index: 10;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100px;
        cursor: pointer;
        &:hover {
          background-color: #f9f9f9;
        }
      `}
      className="shadow transition--03"
      onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
        handleClickCard(e)
      }
    >
      <div>
        <span
          css={css`
            color: ${colors.black};
            font-weight: bold;
            font-size: 18px;
          `}
        >
          {data?.name}
        </span>
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
  );
};

export default CollectionList;
