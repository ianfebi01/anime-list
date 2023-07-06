import { css } from "@emotion/react";
import React from "react";
import ParagraphSkeleton from "../Atoms/ParagraphSkeleton";
import { breakpoints, mq } from "@/assets/breakpoint";
import GenreSkeleton from "../Atoms/GenreSkeleton";

const AnimeDetailsSkeleton = () => {
  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          height: 300px;
          position: relative;
        `}
        className="skeleton"
      ></div>
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 10px;
          position: relative;
          ${mq[3]} {
            max-width: ${breakpoints[3]}px;
          }
          padding: 0 20px;
        `}
      >
        <div
          css={css`
            display: flex;
            grid-template-columns: 100px auto;
            ${mq[0]} {
              display: grid;
              grid-template-columns: 212px auto;
            }
            position: relative;
            height: 100%;
          `}
        >
          <div
            css={css`
              position: relative;
              height: 100%;
            `}
          >
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
                border-radius: 16px;
                /* SHADOW */
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
                z-index: 10;
              `}
              className="skeleton"
            ></div>
          </div>

          <div
            css={css`
              height: 100%;
              margin-left: 0;
              ${mq[0]} {
                margin-left: 50px;
              }
              padding-top: 30px;
              padding-bottom: 30px;
              flex-grow: 1;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;
              `}
            >
              <div
                css={css`
                  width: 100px;
                  height: 20px;
                `}
                className="skeleton"
              ></div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
                `}
              >
                <GenreSkeleton />

                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <span
                    css={css`
                      margin-right: 5px;
                      height: 20px;
                      width: 40px !important;
                      border-radius: 4px;
                    `}
                    className="skeleton"
                  ></span>
                  <span
                    css={css`
                      margin-right: 5px;
                      height: 20px;
                      width: 80px !important;
                      border-radius: 4px;
                    `}
                    className="skeleton"
                  ></span>
                </div>
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <span
                    css={css`
                      margin-right: 5px;
                      height: 20px;
                      width: 40px !important;
                      border-radius: 4px;
                    `}
                    className="skeleton"
                  ></span>
                  <span
                    css={css`
                      margin-right: 5px;
                      height: 20px;
                      width: 80px !important;
                      border-radius: 4px;
                    `}
                    className="skeleton"
                  ></span>
                </div>
              </div>

              <div
                css={css`
                  width: 100%;
                  ${mq[0]} {
                    width: fit-content;
                  }
                  margin-top: 30px;
                  margin-bottom: 20px;
                `}
              >
                <div
                  css={css`
                    margin-right: 5px;
                    height: 44px;
                    width: 150px !important;
                    border-radius: 9999px;
                  `}
                  className="skeleton"
                ></div>
              </div>
              <ParagraphSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsSkeleton;
