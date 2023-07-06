import React, { FunctionComponent } from "react";
import { ArrowLeft } from "../Icons";
import { css } from "@emotion/react";
import Image from "next/image";
import { mq } from "@/assets/breakpoint";

interface Props {
  handleBack: () => void;
  cover: string;
  banner: string;
}

const BannerDetails: FunctionComponent<Props> = ({
  handleBack,
  cover,
  banner,
}) => {
  return (
    <div
      css={css`
        display: flex;
        height: 300px;
        position: relative;
      `}
    >
      <div
        css={css`
          color: #fff;
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1;
          background-color: rgba(30, 30, 30, 0.4);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          ${mq[0]} {
            top: 60px;
          }
        `}
        onClick={() => handleBack()}
      >
        <ArrowLeft
          css={css`
            transform: translateX(2px);
          `}
        />
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: static;
          ${mq[0]} {
            display: none;
            width: 212px;
            height: 315px;
          }
          overflow: hidden;
          position: relative;
        `}
      >
        {cover && (
          <Image
            src={cover as string}
            fill
            alt="Banner Image"
            style={{ objectFit: "cover" }}
            priority
            sizes="100%"
          />
        )}
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          ${mq[0]} {
            width: 100%;
            height: 194px;
            margin-top: 52.83px;
          }
          position: relative;
        `}
      >
        {banner && (
          <Image
            src={banner as string}
            fill
            alt="Banner Image"
            style={{ objectFit: "cover" }}
            priority
            sizes="100%"
          />
        )}
      </div>
    </div>
  );
};

export default BannerDetails;
