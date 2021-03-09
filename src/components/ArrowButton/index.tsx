import React, { FC } from "react";
import classNames from "classnames";

import "./ArrowButton.scss";

interface ArrowButtonProps {
  show: boolean;
  direction: "right" | "left";
  onClick: () => void;
  size?: number;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  show,
  direction,
  size,
  onClick,
}): JSX.Element => {
  return (
    <>
      {show && (
        <button
          style={{ width: size, height: size }}
          onClick={onClick}
          className={classNames("arrow", {
            "arrow--right": direction === "right",
            "arrow--left": direction === "left",
          })}
        >
          <div />
        </button>
      )}
    </>
  );
};

export default ArrowButton;
