import React, { Fragment, FunctionComponent, useEffect, useState } from "react";

import OutsideClickHandler from "react-outside-click-handler";
import Button from "../Atoms/Button";
import Loader from "../Atoms/Loader";
import { css } from "@emotion/react";
import { colors } from "@/assets/colors";
import { mq } from "@/assets/breakpoint";

interface Props {
  title?: string;
  children: React.ReactNode;
  show: boolean;
  actionPositive: () => void;
  loading?: boolean;
  subtitle?: string;
  disable: boolean;
  actionNegative: () => void;
}

const Modal: FunctionComponent<Props> = ({
  title = "Tambah List Item",
  children,
  show,
  actionPositive,
  loading,
  subtitle,
  disable,
  actionNegative,
}) => {
  const [isShow, setIsShow] = useState<boolean>();

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setIsShow(show);
      }, 500);
    } else {
      setIsShow(show);
    }
  }, [show]);
  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99;
          width: 100%;
          padding: 8px 0;
          overflow: hidden;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          color: ${colors.black};
          opacity: ${show ? 1 : 0};
          transform: ${isShow ? "translateY(0)" : "translateY(100%)"};
          transition: opacity 0.5s ease-in-out;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <OutsideClickHandler
            onOutsideClick={() => {
              actionNegative();
            }}
          >
            <div
              css={css`
                position: relative;
                flex-direction: column;
                display: flex;
                gap: 4px;
                width: calc(100% - 20px);
                margin-left: 10px;
                ${mq[0]} {
                  width: 500px;
                }
                height: auto;
                background-color: #fff;
                border-radius: 16px;
                /* SHADOW */
                box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.2);
                padding: 12px 0;
                transform: ${show
                  ? "translateY(0) scale(1)"
                  : "translateY(100%) scale(0)"};
              `}
              className="transition--03"
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  border-bottom: 1px solid #e5e5e5;
                  padding: 8px 20px;
                  padding-bottom: 16px;
                  gap: 8px;
                `}
              >
                <span
                  css={css`
                    font-weight: 500;
                    font-size: 18px;
                    color: ${colors.black};
                  `}
                >
                  {title}
                </span>
                {subtitle && (
                  <span
                    css={css`
                      font-weight: 400;
                      font-size: 12px;
                      color: ${colors.textSecondary};
                    `}
                  >
                    {subtitle}
                  </span>
                )}
              </div>

              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  padding: 16px 20px;
                  gap: 32px;
                `}
              >
                {children}
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: flex-end;
                  border-top: 1px solid #e5e5e5;
                  padding: 8px 10px;
                  gap: 8px;
                `}
              >
                <Button
                  block={false}
                  onClick={() => actionNegative()}
                  disabled={disable}
                  size="small"
                  primary={false}
                >
                  {loading ? (
                    <Fragment>
                      <div
                        css={css`
                          display: flex;
                          align-content: center;
                          justify-content: center;
                          gap: 10px;
                          visibility: hidden;
                        `}
                      >
                        Cancel
                      </div>
                      <div
                        className="absolute"
                        css={css`
                          position: absolute;
                        `}
                      >
                        <Loader />
                      </div>
                    </Fragment>
                  ) : (
                    "Cancel"
                  )}
                </Button>
                <Button
                  block={false}
                  onClick={() => actionPositive()}
                  disabled={disable}
                  size="small"
                >
                  {loading ? (
                    <Fragment>
                      <div
                        css={css`
                          display: flex;
                          align-content: center;
                          justify-content: center;
                          gap: 10px;
                          visibility: hidden;
                        `}
                      >
                        Save
                      </div>
                      <div
                        className="absolute"
                        css={css`
                          position: absolute;
                        `}
                      >
                        <Loader />
                      </div>
                    </Fragment>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
};

export default Modal;
