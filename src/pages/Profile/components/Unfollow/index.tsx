import React, { FC, useState } from "react";
import { Avatar } from "../../../../components";
import ModalWrapper from "../../../../components/ModalWrapper";
import { fetchUnFollow } from "../../../../store/ducks/users/actionCreators";
import {IShortUser, IUser} from "../../../../store/ducks/user/contracts/state";
import { useDispatch } from "react-redux";
import { GrUserExpert } from "react-icons/all";

interface UnfollowProps {
  user: IUser | IShortUser | undefined;
  authUser: IUser | undefined;
}

const Unfollow: FC<UnfollowProps> = ({ user, authUser }): JSX.Element => {
  const dispatch = useDispatch();
  const [unfollowModalOpen, setUnfollowModalOpen] = useState<boolean>(false);

  const handleUnfollow = () => {
    if (user && authUser) {
      dispatch(fetchUnFollow(user._id));
    }
  };

  return (
    <>
      <button
        onClick={() => setUnfollowModalOpen(true)}
        style={{ marginLeft: 20 }}
        className="button secondary-button edit-profile__button"
      >
        <GrUserExpert /> following
      </button>
      {unfollowModalOpen && (
        <ModalWrapper onClose={() => setUnfollowModalOpen(false)}>
          <div className="unfollow-modal">
            <div className="unfollow-modal__user">
              <Avatar url={user?.avatar} size={90} />
              <span>Unfollow @{user?.username}</span>
            </div>
            <ul>
              <li onClick={handleUnfollow} className="unfollow-modal__item">
                <button style={{ color: "#ff7875" }} className="button">
                  Unfollow
                </button>
              </li>
              <li
                onClick={() => setUnfollowModalOpen(false)}
                className="unfollow-modal__item"
              >
                <button style={{ color: "#262626" }} className="button">
                  Cancel
                </button>
              </li>
            </ul>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default Unfollow;
