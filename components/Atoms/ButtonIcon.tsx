import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";

interface Props {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<Element, globalThis.MouseEvent>) => void;
}

const ButtonIcon: FunctionComponent<Props> = ({ children, onClick }) => {
  return (
    <button
      css={css`
        color: ${colors.secondary};
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        cursor: pointer;
        z-index: 15;
        &:hover {
          background-color: ${colors.button};
        }
      `}
      className="transition--03"
      onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
        onClick(e)
      }
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
