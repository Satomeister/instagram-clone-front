import React, { FC } from "react";

import "./Avatar.scss";

import noavatar from "../../assets/noavatar.jpg";
import {Preloader} from "../index";

interface AvatarProps {
  url?: string;
  size?: number;
}

const Avatar: FC<AvatarProps> = ({ size, url }): JSX.Element => {
  return (
    <div className="avatar-wrapper">
      <img
        style={{ width: size, height: size }}
        src={url || noavatar}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar