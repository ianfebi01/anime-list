import React from "react";
import CardAnimeSkeleton from "../Atoms/CardAnimeSkeleton";
import { css } from "@emotion/react";
import { mq } from "@/assets/breakpoint";
import PaginationSkeleton from "../Atoms/PaginationSkeleton";

const AnimeListSkeleton = () => {
  const mockLooping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
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
        {mockLooping?.map((item) => {
          return <CardAnimeSkeleton key={item} />;
        })}
      </div>

      <div
        css={css`
          margin: 20px 0;
        `}
      >
        <PaginationSkeleton />
      </div>
    </div>
  );
};

export default AnimeListSkeleton;
