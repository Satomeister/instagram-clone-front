import React, { FC } from "react";
import { Link } from "react-router-dom";

import "./UserItem.scss";

import Avatar from "../Avatar";
import { IShortUser, IUser } from "../../store/ducks/user/contracts/state";

interface UserItemProps {
  avatarSize?: number;
  user: IShortUser | IUser;
}

const UserItem: FC<UserItemProps> = ({ user, avatarSize }): JSX.Element => {
  return (
    <Link to={`/${user.username}`} className="user-item">
      <Avatar size={avatarSize} url={user.avatar} />
      <div className="user-item__data">
        <span className="user-item__data-name">{user.username}</span>
        <span className="user-item__data-fullname">{user.fullname}</span>
      </div>
    </Link>
  );
};

export default UserItem;
