import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";

interface Props {
  data: string[];
}

const Genre: FunctionComponent<Props> = ({ data }) => {
  return (
    <div
      css={css`
        display: flex;
        padding: 10px 0;
      `}
    >
      {data?.map((item, i) => (
        <div key={i}>
          <span
            css={css`
              font-weight: 300;
              color: ${colors.black};
              margin-right: 5px;
              background-color: ${colors.stroke};
              padding: 5px 10px;
              color: ${colors.black};
              border-radius: 4px;
            `}
            className="text-14"
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Genre;
