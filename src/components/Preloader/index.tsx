import React, { FC } from "react";
import classNames from "classnames";

import "./Preloader.scss";

import preloader from "../../assets/preloader.png";

interface PreloaderProps {
  size?: number;
  centered?: boolean;
  className?: string;
}

const Preloader: FC<PreloaderProps> = ({
  size,
  centered,
  className,
}): JSX.Element => {
  return (
    <div
      className={classNames(`preloader ${className || ""}`, {
        centered: centered,
      })}
      style={{ width: size || 20, height: size || 20 }}
    >
      <img
        width={size || 20}
        height={size || 20}
        src={preloader}
        alt="loading..."
      />
    </div>
  );
};

export default Preloader;
