import { mq } from "@/assets/breakpoint";
import { css } from "@emotion/react";
import Image from "next/image";
import React, { FunctionComponent } from "react";

interface Props {
  cover: string;
}

const ImageCoverDetails: FunctionComponent<Props> = ({ cover }) => {
  return (
    <div
      css={css`
        width: 100px;
        height: 150px;
        visibility: hidden;
        ${mq[0]} {
          visibility: visible;
          width: 212px;
          height: 315px;
        }
        overflow: hidden;
        position: absolute;
        top: -30px;

        /* SHADOW */
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
        z-index: 10;
      `}
      className="border-16"
    >
      <Image
        src={cover as string}
        fill
        alt="Banner Image"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default ImageCoverDetails;
