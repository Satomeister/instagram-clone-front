import React, { FC, useContext, useState } from "react";
import { useSelector } from "react-redux";

import { IShortUser } from "../../../../store/ducks/authUser/contracts/state";
import UsersModal from "../UsersModal";
import { selectIsAuth } from "../../../../store/ducks/authUser/selectors";
import {
  NotificationContext,
  setUnAuthNotification,
} from "../../../../context/notification";

interface FollowersProps {
  followers: IShortUser[];
}

const Followers: FC<FollowersProps> = ({ followers }): JSX.Element => {
  const notificationDispatch = useContext(NotificationContext);

  const [followersModalOpen, setFollowersModalOpen] = useState<boolean>(false);

  const isAuth = useSelector(selectIsAuth);

  const handleOpenModal = () => {
    if (isAuth) {
      setFollowersModalOpen(true);
    } else {
      notificationDispatch(setUnAuthNotification());
    }
  };

  return (
    <>
      <li onClick={handleOpenModal} className="profile__top-actions-item">
        <span>{followers.length}</span>
        <span>followers</span>
      </li>
      {followersModalOpen && (
        <UsersModal
          users={followers}
          title={"Followers"}
          onClose={() => setFollowersModalOpen(false)}
        />
      )}
    </>
  );
};

export default Followers;
