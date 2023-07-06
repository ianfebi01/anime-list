import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  /**
   * primary or secondary button
   */
  primary?: boolean;
  /**
   * size of the button
   */
  size?: "small" | "medium" | "large";
  /**
   * background color of the button
   */
  color?: string;
  block?: boolean;
  textColor?: string;
  disabled?: boolean;
  rounded?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
const Button: FunctionComponent<Props> = ({
  children,
  onClick,
  primary = true,
  size = "medium",
  color = colors.secondary,
  block = true,
  textColor = "#fff",
  disabled = false,
  rounded = false,
  type = "button",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      css={css`
        color: ${primary ? textColor : color};
        background-color: ${primary ? color : "#fff"};
        height: ${size === "small"
          ? "38px"
          : size === "medium"
          ? "44px"
          : "50px"};
        border: ${primary ? "none" : "1px solid " + color};
        padding: 4px 20px;
        width: ${block ? "100%" : "auto"};
        cursor: ${disabled ? "auto" : "pointer"};
        opacity: ${disabled && "0.6"};

        border-radius: ${rounded ? "999px" : "8px"};
      `}
      disabled={disabled}
      type={type}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

export default Button;
