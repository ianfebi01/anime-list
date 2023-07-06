import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";
import Button from "../Atoms/Button";
import { PageInfo } from "@/types/animeList";

interface Props {
  pageInfo: PageInfo | undefined;
  handleClickNext: () => void;
  handleClickPrevious: () => void;
}

const Pagination: FunctionComponent<Props> = ({
  pageInfo,
  handleClickPrevious,
  handleClickNext,
}) => {
  return (
    <div
      css={css`
        display: flex;
        z-index: 10;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      `}
    >
      <Button
        color={colors.button}
        textColor={colors.secondary}
        onClick={() => null}
        block={false}
        size="small"
      >
        {"Page " + pageInfo?.currentPage + " from " + pageInfo?.lastPage}
      </Button>
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <Button
          primary={false}
          color={colors.secondary}
          onClick={() => handleClickPrevious()}
          block={false}
          size="small"
          disabled={pageInfo?.currentPage === 1}
        >
          Previous
        </Button>
        <Button
          primary={false}
          color={colors.secondary}
          onClick={() => handleClickNext()}
          block={false}
          size="small"
          disabled={!pageInfo?.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
