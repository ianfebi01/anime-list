import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";
import Button from "../Atoms/Button";
import { PageInfo } from "@/types/animeList";

const PaginationSkeleton: FunctionComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        z-index: 10;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      `}
    >
      <span
        css={css`
          font-weight: 300;
          margin-right: 5px;
          width: 130px;
          height: 38px;
          border-radius: 4px;
        `}
        className="skeleton"
      ></span>
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <span
          css={css`
            font-weight: 300;
            margin-right: 5px;
            width: 100px;
            height: 38px;
            border-radius: 4px;
          `}
          className="skeleton"
        ></span>
        <span
          css={css`
            font-weight: 300;
            margin-right: 5px;
            width: 100px;
            height: 38px;
            border-radius: 4px;
          `}
          className="skeleton"
        ></span>
      </div>
    </div>
  );
};

export default PaginationSkeleton;
