import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { GrUserExpert } from "react-icons/all";

import "./Unfollow.scss";

import { Avatar } from "../index";
import ModalWrapper from "../ModalWrapper";
import { fetchUnFollow } from "../../store/ducks/users/actionCreators";
import { IShortUser, IUser } from "../../store/ducks/authUser/contracts/state";
import ModalWindow from "../ModalWindow";
import { ButtonItem, ButtonList } from "../ModalButtons";

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
          <ModalWindow>
            <div className="unfollow-modal">
              <div className="unfollow-modal__user">
                <Avatar url={user?.avatar} size={90} />
                <span>Unfollow @{user?.username}</span>
              </div>
              <ButtonList>
                <ButtonItem
                  text="Unfollow"
                  onButtonClick={handleUnfollow}
                  color="red"
                />
                <ButtonItem
                  text="Cancel"
                  onButtonClick={() => setUnfollowModalOpen(false)}
                />
              </ButtonList>
            </div>
          </ModalWindow>
        </ModalWrapper>
      )}
    </>
  );
};

export default Unfollow;
