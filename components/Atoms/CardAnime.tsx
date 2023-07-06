import { colors } from "@/assets/colors";
import { Anime } from "@/types/animeList";
import { css } from "@emotion/react";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { Trash } from "../Icons";
import ButtonIcon from "./ButtonIcon";

interface Props {
  onClick: () => void;
  item: Anime;
  remove?: () => void;
}
const CardAnime: FunctionComponent<Props> = ({ onClick, item, remove }) => {
  const handleRemove = () => {
    if (remove != undefined) {
      remove();
    }
  };

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
      handleRemove();
    }
  };
  return (
    <div
      css={css`
        border: 1.5px solid ${colors.stroke};
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        z-index: 10;
        background-color: #fff;
        display: flex;
        flex-direction: row;

        cursor: pointer;
        &:hover {
          background-color: #f9f9f9;
        }
      `}
      className="shadow"
      onClick={(e) => handleClickCard(e)}
    >
      <div
        css={css`
          background: #fff;
          height: 155px;
          min-width: 104px;
          cursor: pointer;
          position: relative;
        `}
      >
        {item.coverImage.large && (
          <Image
            src={item.coverImage.large}
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
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <span
            css={css`
              color: ${colors.black};
              font-weight: bold;
              font-size: 18px;
            `}
          >
            {item?.title?.romaji}
          </span>
          {remove != undefined && (
            <ButtonIcon
              onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
                handleClickRemove(e)
              }
            >
              <Trash />
            </ButtonIcon>
          )}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <span
            css={css`
              color: ${colors.textSecondary};
              font-size: 12px;
            `}
          >
            Popularity
          </span>
          <span
            css={css`
              font-weight: 300;
              color: ${colors.secondary};
              margin-right: 5px;
              background-color: ${colors.button};
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 12px;
            `}
          >
            {item?.popularity}
          </span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <span
            css={css`
              color: ${colors.textSecondary};
              font-size: 12px;
            `}
          >
            Average Score
          </span>
          <span
            css={css`
              font-weight: 300;
              color: ${colors.secondary};
              margin-right: 5px;
              background-color: ${colors.button};
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 12px;
            `}
          >
            {item?.averageScore}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardAnime;
