import { css } from "@emotion/react";
import Image from "next/image";
import React, { FunctionComponent } from "react";

interface Props {
  img?: string;
}

const CardImageDetails: FunctionComponent<Props> = ({ img }) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 194px;
        overflow: hidden;
        position: relative;
        margin-top: 52.83px;
      `}
    >
      <Image
        src={img as string}
        fill
        alt="Banner Image"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default CardImageDetails;
