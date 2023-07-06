import { css } from "@emotion/react";
import React from "react";

const Loader = () => {
  return (
    <div
      className="loader"
      css={css`
        z-index: 50;
      `}
    ></div>
  );
};

export default Loader;
