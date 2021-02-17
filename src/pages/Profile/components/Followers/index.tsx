import React, { FC, useState } from "react";
import { IShortUser } from "../../../../store/ducks/user/contracts/state";
import UsersModal from "../UsersModal";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../../../store/ducks/user/selectors";

interface FollowersProps {
  followers: IShortUser[];
  openUnauthModal: () => void
}

const Followers: FC<FollowersProps> = ({ followers, openUnauthModal }): JSX.Element => {
  const isAuth = useSelector(selectIsAuth)
  const [followersModalOpen, setFollowersModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (isAuth) {
      setFollowersModalOpen(true)
    } else {
      openUnauthModal()
    }
  }

  return (
    <>
      <li
        onClick={handleOpenModal}
        className="profile__top-actions-item"
      >
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

export default Followers