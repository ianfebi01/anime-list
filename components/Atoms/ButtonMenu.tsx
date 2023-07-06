import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";
import { ArrowDown, Star } from "../Icons";

interface Props {
  label?: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const ButtonMenu: FunctionComponent<Props> = ({
  label = "Label",
  active = true,
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      css={css`
        border: none;
        background-color: ${active ? colors.button : "#fff"};
        cursor: pointer;
        padding: 8px 12px;
        color: ${active ? colors.secondary : colors.black};
        cursor: ${disabled ? "auto" : "pointer"};
        opacity: ${disabled && "0.6"};
      `}
      className="border-8 transition--03"
      disabled={disabled}
      onClick={() => onClick()}
    >
      <div
        css={css`
          display: flex;
        `}
        className="gap-12"
      >
        {children}
        {label}
      </div>
    </button>
  );
};

export default ButtonMenu;
