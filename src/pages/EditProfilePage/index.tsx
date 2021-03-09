import React, { FC, FormEvent, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import "./EditProfile.scss";

import {
  selectAuthUserData,
  selectEditProfileError,
  selectEditProfileLoadingStatus,
  selectIsAuth,
  selectUpdateAvatarLoadingStatus,
} from "../../store/ducks/authUser/selectors";
import { Avatar, Input, Preloader, Textarea } from "../../components";
import { useForm, ValidationsEnum } from "../../hooks/useForm";
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle";
import {
  fetchEditProfile,
  setEditProfileLoadingStatus,
} from "../../store/ducks/authUser/actionCreators";
import { LoadingStatus } from "../../store/types";
import { ChangeAvatar } from "./components";
import {
  deleteNotification,
  NotificationContext,
  setTextNotification,
} from "../../context/notification";

const EditProfilePage: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notificationDispatch = useContext(NotificationContext);

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectAuthUserData);
  const editProfileLoadingStatus = useSelector(selectEditProfileLoadingStatus);
  const editProfileError = useSelector(selectEditProfileError);
  const updateAvatarLoadingStatus = useSelector(
    selectUpdateAvatarLoadingStatus
  );

  useSetDocumentTitle("Edit Profile • Instagram");

  const config = useMemo(
    () => ({
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
          validations: {},
        },
        email: {
          initialValue: userData?.email,
          validations: {
            [ValidationsEnum.IS_REQUIRED]: { message: "E-mail is required" },
            [ValidationsEnum.IS_EMAIL]: { message: "E-mail is invalid" },
          },
        },
      },
    }),
    [userData]
  );

  const { getFieldProps, values } = useForm(config);

  useEffect(() => {
    if (editProfileLoadingStatus === LoadingStatus.SUCCESS) {
      notificationDispatch(setTextNotification("Profile changed."));
      history.push(`/${userData?.username}`);
      dispatch(setEditProfileLoadingStatus(LoadingStatus.NEVER));
      setTimeout(() => {
        notificationDispatch(deleteNotification());
      }, 2000);
    }
  }, [
    editProfileLoadingStatus,
    history,
    userData,
    dispatch,
    notificationDispatch,
  ]);

  useEffect(() => {
    if (updateAvatarLoadingStatus === LoadingStatus.SUCCESS) {
      notificationDispatch(setTextNotification("ProfilePage photo changed."));
      setTimeout(() => {
        notificationDispatch(setTextNotification(""));
      }, 3000);
    } else if (updateAvatarLoadingStatus === LoadingStatus.ERROR) {
      notificationDispatch(
        setTextNotification("ProfilePage photo wasn't changed.")
      );
      setTimeout(() => {
        notificationDispatch(setTextNotification(""));
      }, 3000);
    }
  }, [updateAvatarLoadingStatus, notificationDispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchEditProfile(values));
  };

  if (!isAuth) {
    return <Redirect to="/auth/signin" />;
  }

  if (userData) {
    return (
      <div className="page-common edit-profile">
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
          <ul>
            <li className="page-common-form__item">
              <div className="page-common-form__item-inner">
                <div className="page-common-form__item-label">Name</div>
                <Input
                  {...getFieldProps("fullname")}
                  type="text"
                  name={"name"}
                  placeholder="Name"
                />
              </div>
              <p className="page-common-form__item-extra-text">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </p>
            </li>
            <li className="page-common-form__item">
              <div className="page-common-form__item-inner">
                <div className="page-common-form__item-label">User Name</div>
                <Input
                  {...getFieldProps("username")}
                  type="text"
                  name={"username"}
                  placeholder="User Name"
                />
              </div>
            </li>
            <li className="page-common-form__item">
              <div className="page-common-form__item-inner">
                <div className="page-common-form__item-label">Bio</div>
                <Textarea {...getFieldProps("bio")} name={"bio"} />
              </div>
              <p className="page-common-form__item-extra-text">
                <span>Personal Information</span>
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </p>
            </li>
            <li className="page-common-form__item">
              <div className="page-common-form__item-inner">
                <div className="page-common-form__item-label">E-mail</div>
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
          <div className="submit-error">{editProfileError}</div>
        </form>
      </div>
    );
  } else {
    return <div>You are not authorized</div>;
  }
};

export default EditProfilePage;
