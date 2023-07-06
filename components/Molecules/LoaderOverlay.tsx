import React, { FunctionComponent, useEffect, useState } from "react";
import Loader from "../Atoms/Loader";
import { css } from "@emotion/react";

interface Props {
  show: boolean;
}

// const isOpen = ref<boolean>(props.modelValue)

// watch(() => props.modelValue, () => {
//   if (!props.modelValue) {
//     setTimeout(() => {
//       isOpen.value = props.modelValue
//     }, 500)
//   } else {
//     isOpen.value = props.modelValue
//   }

// })

const LoaderOverlay: FunctionComponent<Props> = ({ show }) => {
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
    <div
      css={css`
        z-index: 30;
        border: 1px solid blue;
        height: 100%;
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        background-color: rgba(171, 171, 171, 0.5);
        opacity: ${show ? 1 : 0};
        transform: ${isShow ? "translateY(0)" : "translateY(100%)"};
        transition: opacity 0.5s ease-in-out;
      `}
    >
      <Loader />
    </div>
  );
};

export default LoaderOverlay;
