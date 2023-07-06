import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";
import debounce from "lodash.debounce";

interface Props {
  onChange: (e: string) => void;
  id: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
}
const Input: FunctionComponent<Props> = ({
  onChange,
  id = "input",
  label,
  placeholder,
  errorMessage,
  value,
}) => {
  const handleChange = (e: string) => {
    onChange(e);
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      <label
        css={css`
          font-size: 12px;
        `}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        css={css`
          width: 100%;
          height: 38px;
          padding: 0 10px;
          border: 1px solid ${colors.stroke};
          outline: none;
          &:focus {
            border: 1px solid ${colors.primary};
          }
          border-radius: 8px;
        `}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        className="transition--03"
      />
      <span
        css={css`
          font-size: 10px;
          color: red;
        `}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default Input;
