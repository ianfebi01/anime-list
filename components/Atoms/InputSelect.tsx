import React, { FunctionComponent, useState } from "react";

import Select, { MultiValue, StylesConfig } from "react-select";
import { css } from "@emotion/react";
import { colors } from "@/assets/colors";
import { SelectOption } from "@/types/reactSelect";

interface Props {
  option?: readonly SelectOption[];
  onChange: (e: MultiValue<unknown>) => void;
  value?: SelectOption[];
  label?: string;
  id?: string;
}

const InputSelect: FunctionComponent<Props> = ({
  option,
  onChange,
  value,
  label,
  id,
}) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const customStyles: StylesConfig = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      width: "100%",
      minHeight: "38px",
      padding: "0 10px",
      border: state.isFocused
        ? `1px solid ${colors.secondary}`
        : `1px solid ${colors.stroke}`,
      outline: "none",
      borderRadius: "8px",
      transition: "all 0.3s ease-in-out",
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused
          ? `1px solid ${colors.secondary}`
          : `1px solid ${colors.stroke}`,
      },
    }),
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
      <Select
        id={id}
        css={css`
          border-radius: 8px;
        `}
        className="basic-single"
        classNamePrefix="select"
        defaultValue={"Select collection"}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="collection"
        options={option as SelectOption[]}
        styles={customStyles}
        isMulti
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
};

export default InputSelect;
