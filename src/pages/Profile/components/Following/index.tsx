import React, { FC, useState } from "react";
import {IShortUser} from "../../../../store/ducks/user/contracts/state";
import UsersModal from "../UsersModal";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../../../store/ducks/user/selectors";

interface FollowersProps {
  following: IShortUser[];
  openUnauthModal: () => void
}

const Following: FC<FollowersProps> = ({ following, openUnauthModal }): JSX.Element => {
  const isAuth = useSelector(selectIsAuth)
  const [followingModalOpen, setFollowingModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (isAuth) {
      setFollowingModalOpen(true)
    } else {
      openUnauthModal()
    }
  }

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

export default Following