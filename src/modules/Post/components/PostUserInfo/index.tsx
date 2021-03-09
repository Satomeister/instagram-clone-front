import React, { FC, useContext } from "react";
import { useSelector } from "react-redux";

import "./PostUserInfo.scss";

import {
  IShortUser,
  IUser,
} from "../../../../store/ducks/authUser/contracts/state";
import { DotsButton, UserItem } from "../../../../components";
import { selectIsAuth } from "../../../../store/ducks/authUser/selectors";
import {
  NotificationContext,
  setUnAuthNotification,
} from "../../../../context/notification";

interface PostUserInfoProps {
  user: IUser | IShortUser;
  openMenu: () => void;
}

const PostUserInfo: FC<PostUserInfoProps> = ({
  user,
  openMenu,
}): JSX.Element => {
  const notificationDispatch = useContext(NotificationContext);

  const isAuth = useSelector(selectIsAuth);

  const handleOpenMenu = () => {
    if (isAuth) {
      openMenu();
    } else {
      notificationDispatch(setUnAuthNotification());
    }
  };

  return (
    <div className="user-info">
      <UserItem user={user} withFullname={false} withPadding={false} />
      <DotsButton onButtonClick={handleOpenMenu} />
    </div>
  );
};

export default PostUserInfo;
