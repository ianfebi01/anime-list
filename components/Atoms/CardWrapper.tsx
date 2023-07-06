import { mq } from "@/assets/breakpoint";
import { css } from "@emotion/react";
import React from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  fullWidth: boolean;
}

const CardWrapper = ({ children, fullWidth = false }: Props) => {
  const path = usePathname();
  return (
    <div
      css={css`
        visibility: ${path.includes("anime-details") ? "hidden" : "visible"};
        ${mq[0]} {
          visibility: visible;
        }
        padding: 10px 20px;
        background: #fff;
        width: ${fullWidth ? "100%" : "fit-content"};
      `}
      className="shadow"
    >
      {children}
    </div>
  );
};

export default CardWrapper;
