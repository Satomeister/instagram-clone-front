import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChangeAvatar.scss";

import ModalWrapper from "../../../../components/ModalWrapper";
import { fetchUpdateAvatar } from "../../../../store/ducks/user/actionCreators";
import { selectAuthUserData } from "../../../../store/ducks/user/selectors";

const ChangeAvatar: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const userData = useSelector(selectAuthUserData);
  const [modal, setModal] = useState<boolean>();

  const handleUploadAvatar = (files: FileList | null) => {
    if (files?.length) {
      const formData = new FormData();
      formData.set("avatar", files[0]);
      dispatch(fetchUpdateAvatar(formData));
      setModal(false);
    }
  };

  const handleRemoveAvatar = () => {
    dispatch(fetchUpdateAvatar(null));
    setModal(false);
  };

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="button edit-profile-photo__button"
      >
        Edit Profile Photo
      </button>
      {modal && (
        <ModalWrapper onClose={() => setModal(false)}>
          <div className="change-avatar-modal">
            <h3>Change Profile Photo</h3>
            <ul className="change-avatar-modal__button-list">
              <li className="change-avatar-modal__item">
                <input
                  onChange={(e) => handleUploadAvatar(e.target.files)}
                  ref={inputRef}
                  type="file"
                  hidden
                  accept="image/x-png,image/jpg,image/jpeg"
                />
                <button
                  onClick={() => inputRef.current?.click()}
                  className="button"
                >
                  Upload Photo
                </button>
              </li>
              {userData?.avatar && (
                <li className="change-avatar-modal__item">
                  <button
                    onClick={handleRemoveAvatar}
                    style={{ color: "#ff7875" }}
                    className="button"
                  >
                    Remove Current Photo
                  </button>
                </li>
              )}
              <li className="change-avatar-modal__item">
                <button
                  style={{ color: "#262626" }}
                  className="button"
                  onClick={() => setModal(false)}
                >
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

export default ChangeAvatar;
