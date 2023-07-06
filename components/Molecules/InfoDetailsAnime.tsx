import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent, useState } from "react";
import { boolean } from "yup";
import Button from "../Atoms/Button";
import { AnimeDetails } from "@/types/animeList";
import Genre from "../Atoms/Genre";
import { mq } from "@/assets/breakpoint";
import { CollectionAdded } from "@/types/collections";
import CollectionAllreadyAdded from "../Atoms/CollectionAllreadyAdded";
import { useRouter } from "next/navigation";

interface Props {
  datas: AnimeDetails;
  handleAddCollection: () => void;
  collectionAdded: CollectionAdded[];
}

const InfoDetailsAnime: FunctionComponent<Props> = ({
  datas,
  handleAddCollection,
  collectionAdded,
}) => {
  // rputer
  const router = useRouter();
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);
  return (
    <div
      css={css`
        height: 100%;

        ${mq[0]} {
          margin-left: 50px;
        }
        padding-top: 30px;
        padding-bottom: 30px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <span
          css={css`
            font-weight: 500;
            color: ${colors.black};
          `}
          className="text-24"
        >
          {datas?.title?.romaji}
        </span>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          <Genre data={datas?.genres as string[]} />
          <div>
            <span
              css={css`
                font-weight: 500;
                color: ${colors.black};
                margin-right: 5px;
              `}
              className="text-14"
            >
              {datas?.seasonYear}
            </span>
            <span
              css={css`
                font-weight: 300;
                color: ${colors.black};
                margin-right: 5px;
              `}
              className="text-14"
            >
              {" " + datas?.episodes + " Episode"}
            </span>
          </div>
          <div>
            <span
              css={css`
                font-weight: 500;
                color: ${colors.black};
                margin-right: 5px;
              `}
              className="text-14"
            >
              {datas?.averageScore}
            </span>
            <span
              css={css`
                font-weight: 300;
                color: ${colors.black};
                margin-right: 5px;
              `}
              className="text-14"
            >
              {" " + " Average Score"}
            </span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 10px;
            `}
          >
            <span
              css={css`
                font-weight: 500;
                color: ${colors.black};
              `}
              className="text-14"
            >
              Collection:
            </span>
            <CollectionAllreadyAdded
              data={collectionAdded as CollectionAdded[]}
              onClick={(id) => router.push("/collection/" + id)}
            />
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
          <Button
            rounded={true}
            block={true}
            color={colors.secondary}
            onClick={() => handleAddCollection()}
          >
            <span className="text-16"> Add To Collection</span>
          </Button>
        </div>
        <div>
          <span
            css={css`
              max-height: ${showFullDesc ? "auto" : "100px"};
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 14px !important;

              @supports (-webkit-line-clamp: 2) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: initial;
                display: -webkit-box;
                -webkit-line-clamp: ${showFullDesc ? "auto" : "5"};
                -webkit-box-orient: vertical;
              }
            `}
            className="text-14"
            dangerouslySetInnerHTML={{
              __html: datas?.description as TrustedHTML,
            }}
          ></span>
          <span
            css={css`
              color: ${colors.secondary};
              text-decoration: underline;
              cursor: pointer;
            `}
            className="text-14"
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            {showFullDesc ? "Show less description" : "Show full description"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoDetailsAnime;
