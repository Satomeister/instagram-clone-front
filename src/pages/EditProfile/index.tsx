import React, { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import "./EditProfile.scss";

import {
  selectAuthUserData, selectEditProfileError,
  selectEditProfileLoadingStatus,
  selectIsAuth,
  selectUpdateAvatarLoadingStatus,
} from "../../store/ducks/user/selectors";
import {
  Avatar,
  Input,
  Notification,
  Preloader,
  Textarea,
} from "../../components";
import { useForm, ValidationsEnum } from "../../hooks/useForm";
import {
  fetchEditProfile,
  setEditProfileLoadingStatus,
} from "../../store/ducks/user/actionCreators";
import { LoadingStatus } from "../../store/types";
import { ChangeAvatar } from "./components";

const EditProfile: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectAuthUserData);
  const editProfileLoadingStatus = useSelector(selectEditProfileLoadingStatus);
  const editProfileError = useSelector(selectEditProfileError)
  const updateAvatarLoadingStatus = useSelector(
    selectUpdateAvatarLoadingStatus
  );
  const [notification, setNotification] = useState<string>("");

  const config = {
    fields: {
      fullname: {
        initialValue: userData?.fullname,
        validations: {
          [ValidationsEnum.IS_REQUIRED]: { message: "Fullname is required" },
          [ValidationsEnum.MIN]: {
            value: 4,
            message: "Name must be at least 4 characters",
          },
        },
      },
      username: {
        initialValue: userData?.username,
        validations: {
          [ValidationsEnum.IS_REQUIRED]: { message: "Username is required" },
          [ValidationsEnum.MIN]: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
        },
      },
      bio: {
        initialValue: userData?.bio,
        validations: {}
      },
      email: {
        initialValue: userData?.email,
        validations: {
          [ValidationsEnum.IS_REQUIRED]: { message: "E-mail is required" },
          [ValidationsEnum.IS_EMAIL]: { message: "E-mail is invalid" },
        },
      },
    },
  };

  useEffect(() => {
    document.title = `Edit Profile • Instagram`;
  }, []);

  useEffect(() => {
    if (editProfileLoadingStatus === LoadingStatus.SUCCESS) {
      history.push(`/${userData?.username}`);
      dispatch(setEditProfileLoadingStatus(LoadingStatus.NEVER));
    }
  }, [editProfileLoadingStatus, history, userData, dispatch]);

  useEffect(() => {
    if (updateAvatarLoadingStatus === LoadingStatus.SUCCESS) {
      setNotification("Profile photo changed.");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } else if (updateAvatarLoadingStatus === LoadingStatus.ERROR) {
      setNotification("Profile photo wasn't changed.");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  }, [updateAvatarLoadingStatus]);

  const { getFieldProps, values } = useForm(config);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchEditProfile(values));
  };

  if (!isAuth) {
    return <Redirect to="/auth/signin" />;
  }

  if (userData) {
    return (
      <div className="edit-profile">
        <div className="edit-profile__user-data">
          {updateAvatarLoadingStatus !== LoadingStatus.LOADING ? (
            <Avatar url={userData.avatar} size={38} />
          ) : (
            <Preloader size={38} />
          )}
          <div>
            <span>{userData.username}</span>
            <ChangeAvatar />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <ul className="edit-profile__list">
            <li className="edit-profile__item">
              <div className="edit-profile__item-inner">
                <div className="edit-profile__item-label">Name</div>
                <Input
                  {...getFieldProps("fullname")}
                  type="text"
                  name={"name"}
                  placeholder="Name"
                />
              </div>
              <p className="edit-profile__item-extra-text">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </p>
            </li>
            <li className="edit-profile__item">
              <div className="edit-profile__item-inner">
                <div className="edit-profile__item-label">User Name</div>
                <Input
                  {...getFieldProps("username")}
                  type="text"
                  name={"username"}
                  placeholder="User Name"
                />
              </div>
            </li>
            <li className="edit-profile__item">
              <div className="edit-profile__item-inner">
                <div className="edit-profile__item-label">Bio</div>
                <Textarea {...getFieldProps("bio")} name={"bio"} />
              </div>
              <p className="edit-profile__item-extra-text">
                <span>Personal Information</span>
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </p>
            </li>
            <li className="edit-profile__item">
              <div className="edit-profile__item-inner">
                <div className="edit-profile__item-label">E-mail</div>
                <Input
                  {...getFieldProps("email")}
                  type="text"
                  name={"email"}
                  placeholder="E-mail"
                />
              </div>
            </li>
          </ul>
          <button
            disabled={editProfileLoadingStatus === LoadingStatus.LOADING}
            type="submit"
            className="button primary-button submit-button"
          >
            Submit
          </button>
          <div className='submit-error'>
            {editProfileError}
          </div>
        </form>
        {notification && <Notification text={notification} />}
      </div>
    );
  } else {
    return <div>You are not authorized</div>;
  }
};

export default EditProfile;
