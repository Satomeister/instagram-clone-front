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
  following: IShortUser[];
}

const Following: FC<FollowersProps> = ({ following }): JSX.Element => {
  const notificationDispatch = useContext(NotificationContext);

  const [followingModalOpen, setFollowingModalOpen] = useState<boolean>(false);

  const isAuth = useSelector(selectIsAuth);

  const handleOpenModal = () => {
    if (isAuth) {
      setFollowingModalOpen(true);
    } else {
      notificationDispatch(setUnAuthNotification());
    }
  };

  return (
    <>
      <li onClick={handleOpenModal} className="profile__top-actions-item">
        <span>{following.length}</span>
        <span>following</span>
      </li>
      {followingModalOpen && (
        <UsersModal
          users={following}
          title={"Following"}
          onClose={() => setFollowingModalOpen(false)}
        />
      )}
    </>
  );
};

export default Following;
