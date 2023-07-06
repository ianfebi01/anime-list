import React, { Fragment, useContext, useEffect, useState } from "react";
import CardWrapper from "../Atoms/CardWrapper";

import { colors } from "@/assets/colors";
import { css } from "@emotion/react";
import ButtonMenu from "../Atoms/ButtonMenu";
import { Home, Star } from "../Icons";
import { DefaultContext } from "@/context/defaultContext";
import Search from "../Atoms/Search";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [active, setActive] = useState<boolean>(false);
  const { state, dispatch } = useContext(DefaultContext);

  // route
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  const handleChangePage = (page: string) => {
    if (page === "anime-list") {
      router.push("/");
    } else if (page === "collection") {
      router.push("/collection");
    }
    dispatch({
      type: "SET_PAGE",
      payload: {
        page: page,
      },
    });
  };

  // path
  const path = usePathname();

  useEffect(() => {
    if (path.includes("anime-list")) {
      dispatch({
        type: "SET_PAGE",
        payload: {
          page: "anime-list",
        },
      });
    } else if (path.includes("collection")) {
      dispatch({
        type: "SET_PAGE",
        payload: {
          page: "collection",
        },
      });
    }
    console.log(path);
  }, []);

  return (
    <CardWrapper fullWidth={true}>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
        className="gap-12"
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
          className="gap-8"
        >
          <span
            css={css`
              font-weight: bold;
              color: ${colors.secondary};
              cursor: pointer;
            `}
            onClick={() => handleChangePage("anime-list")}
          >
            Top Anime
          </span>
        </div>
        <div>
          <ButtonMenu
            active={state.defaultState?.page === "anime-list"}
            onClick={() => handleChangePage("anime-list")}
            label="Anime List"
            disabled={!path.includes("collection")}
          >
            <div
              css={css`
                color: ${colors.secondary};
              `}
            >
              <Home />
            </div>
          </ButtonMenu>
          <ButtonMenu
            active={state.defaultState?.page === "collection"}
            onClick={() => handleChangePage("collection")}
            label="Collection"
            disabled={path.includes("collection")}
          >
            <div
              css={css`
                color: ${colors.secondary};
              `}
            >
              <Star />
            </div>
          </ButtonMenu>
        </div>
      </div>
    </CardWrapper>
  );
};

export default Navbar;
