import { css } from "@emotion/react";
import React from "react";

const ParagraphSkeleton = () => {
  const mockData: number[] = [1, 2, 3, 4, 5, 6];
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {mockData.map((i) => (
        <div
          key={i}
          css={css`
            margin-right: 5px;
            height: 20px;
            width: 100%;
            border-radius: 4px;
          `}
          className="skeleton"
        ></div>
      ))}
    </div>
  );
};

export default ParagraphSkeleton;
