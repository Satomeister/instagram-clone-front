import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GrClose as CloseIcon,
  IoPersonAddOutline as AddPersonIcon,
} from "react-icons/all";

import "./UsersModal.scss";

import { ModalWindow, Unfollow, UserItem } from "../../../../components";
import { selectAuthUserData } from "../../../../store/ducks/authUser/selectors";
import { fetchFollow } from "../../../../store/ducks/users/actionCreators";
import { isFollowing } from "../../../../utils";
import ModalWrapper from "../../../../components/ModalWrapper";
import { IShortUser } from "../../../../store/ducks/authUser/contracts/state";

interface UsersModalProps {
  title: string;
  users: IShortUser[];
  onClose: () => void;
}

const UsersModal: FC<UsersModalProps> = ({
  title,
  users,
  onClose,
}): JSX.Element => {
  const dispatch = useDispatch();

  const authUser = useSelector(selectAuthUserData);

  const handleFollow = (userId: string) => {
    dispatch(fetchFollow(userId));
  };

  return (
    <ModalWrapper onClose={onClose}>
      <ModalWindow height={400}>
        <div className="users-modal">
          <div className="users-modal__header">
            <div />
            <h3 className="users-modal__header-title">{title}</h3>
            <CloseIcon onClick={onClose} />
          </div>
          {users.length ? (
            <ul className="users-modal__list">
              {users.map((user) => (
                <li key={user._id} className="users-modal__item">
                  <div onClick={onClose}>
                    <UserItem avatarSize={30} user={user} />
                  </div>
                  {user._id !== authUser?._id ? (
                    isFollowing(authUser, user._id) ? (
                      <Unfollow user={user} authUser={authUser} />
                    ) : (
                      <button
                        onClick={() => handleFollow(user._id)}
                        className="button primary-button"
                      >
                        Follow
                      </button>
                    )
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="users-modal__empty">
              <AddPersonIcon />
              <h3>{title}</h3>
              <p>You'll see all the people who {title} you here.</p>
            </div>
          )}
        </div>
      </ModalWindow>
    </ModalWrapper>
  );
};
export default UsersModal;
