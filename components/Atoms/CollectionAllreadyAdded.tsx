import { colors } from "@/assets/colors";
import { CollectionAdded } from "@/types/collections";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";

interface Props {
  data: CollectionAdded[];
  onClick: (id: string) => void;
}

const CollectionAllreadyAdded: FunctionComponent<Props> = ({
  data,
  onClick,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        height: max-content;
      `}
    >
      {data?.map((item, i) => (
        <span
          key={i}
          css={css`
            font-weight: 300;
            background-color: ${colors.button};
            padding: 5px 10px;
            color: ${colors.secondary};
            border-radius: 4px;
            cursor: pointer;
          `}
          className="text-14"
          onClick={() => onClick(item.id)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default CollectionAllreadyAdded;
