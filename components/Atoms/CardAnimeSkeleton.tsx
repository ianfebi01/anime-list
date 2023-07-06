import { colors } from "@/assets/colors";
import { Anime } from "@/types/animeList";
import { css } from "@emotion/react";
import Image from "next/image";
import React, { FunctionComponent } from "react";

interface Props {}
const CardAnimeSkeleton: FunctionComponent = () => {
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
    >
      <div
        css={css`
          height: 155px;
          width: 104px;
          cursor: pointer;
          position: relative;
        `}
        className="skeleton"
      ></div>
      <div
        css={css`
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 10px;
        `}
      >
        <span
          css={css`
            font-weight: 300;
            margin-right: 5px;
            width: 100%;
            height: 20px;
            border-radius: 4px;
          `}
          className="skeleton"
        ></span>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <span
            css={css`
              font-weight: 300;
              margin-right: 5px;
              width: 80px;
              height: 20px;
              border-radius: 4px;
            `}
            className="skeleton"
          ></span>
          <span
            css={css`
              font-weight: 300;
              margin-right: 5px;
              width: 80px;
              height: 20px;
              border-radius: 4px;
            `}
            className="skeleton"
          ></span>
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
              font-weight: 300;
              margin-right: 5px;
              width: 80px;
              height: 20px;
              border-radius: 4px;
            `}
            className="skeleton"
          ></span>
          <span
            css={css`
              font-weight: 300;
              margin-right: 5px;
              width: 80px;
              height: 20px;
              border-radius: 4px;
            `}
            className="skeleton"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default CardAnimeSkeleton;
