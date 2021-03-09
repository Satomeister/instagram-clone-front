import React, { FC } from "react";
import { Link } from "react-router-dom";

import "./UserItem.scss";

import Avatar from "../Avatar";
import { IShortUser, IUser } from "../../store/ducks/authUser/contracts/state";

interface UserItemProps {
  avatarSize?: number;
  user: IShortUser | IUser;
  withFullname?: boolean;
  withPadding?: boolean;
}

const UserItem: FC<UserItemProps> = ({
  user,
  avatarSize,
  withFullname = true,
  withPadding = true,
}): JSX.Element => {
  return (
    <Link
      to={`/${user.username}`}
      style={{ padding: withPadding ? "10px 15px" : "" }}
      className="user-item"
    >
      <Avatar size={avatarSize} url={user.avatar} story={user.story} />
      <div className="user-item__data">
        <span className="user-item__data-name">{user.username}</span>
        {withFullname && (
          <span className="user-item__data-fullname">{user.fullname}</span>
        )}
      </div>
    </Link>
  );
};

export default UserItem;
