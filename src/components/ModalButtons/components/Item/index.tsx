import React, { FC } from "react";
import { Link } from "react-router-dom";

import "../../ButtonList.scss";

export enum ColorList {
  blue = "#0095f6",
  red = "#ff7875",
  black = "#262626",
}

interface ButtonItemProps {
  withoutBorder?: boolean;
  text: string;
  href?: string;
  onButtonClick?: () => void;
  color?: "red" | "blue" | "black";
}

const ButtonItem: FC<ButtonItemProps> = ({
  withoutBorder,
  text,
  href,
  onButtonClick,
  color = "black",
}): JSX.Element => {
  if (href) {
    return (
      <li
        className="button-list__item"
        style={{ borderTop: withoutBorder ? "none" : undefined }}
      >
        <Link to={href} style={{ color: ColorList[color] }} className="button">
          {text}
        </Link>
      </li>
    );
  }
  return (
    <li
      className="button-list__item"
      style={{ borderTop: withoutBorder ? "none" : undefined }}
    >
      <button
        onClick={onButtonClick}
        style={{ color: ColorList[color] }}
        className="button"
      >
        {text}
      </button>
    </li>
  );
};

export default ButtonItem;
