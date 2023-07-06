import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";

const GenreSkeleton: FunctionComponent = () => {
  const mockData: number[] = [1, 2, 3, 4];
  return (
    <div
      css={css`
        display: flex;
        padding: 10px 0;
      `}
    >
      {mockData.map((item, i) => (
        <span
          key={i}
          css={css`
            margin-right: 5px;
            height: 20px;
            width: 80px !important;
            border-radius: 4px;
          `}
          className="skeleton"
        ></span>
      ))}
    </div>
  );
};

export default GenreSkeleton;
