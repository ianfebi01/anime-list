import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";
import debounce from "lodash.debounce";

interface Props {
  onChange: (e: string) => void;
}
const Search: FunctionComponent<Props> = ({ onChange }) => {
  const handleChange = debounce((e) => {
    onChange(e);
  }, 500);
  return (
    <div>
      <input
        css={css`
          height: 32.83px;
          padding: 0 10px;
          border: 1px solid ${colors.stroke};
          outline: none;
          &:focus {
            border: 1px solid ${colors.primary};
          }
          border-radius: 8px;
        `}
        className="transition--03"
        placeholder="Search anime"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      />
    </div>
  );
};

export default Search;
