import React, { FC, useContext, useEffect, useState } from "react";
import { Link, NavLink, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineTable as TableIcon,
  BsBookmark as BookmarkIcon,
} from "react-icons/all";

import "./Profile.scss";

import { Avatar, Preloader } from "../../components";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { fetchFollow } from "../../store/ducks/users/actionCreators";
import {
  Followers,
  Following,
  ProfilePosts,
  SavedPosts,
  Unfollow,
} from "./components";
import {
  selectGetMeLoadingStatus,
  selectIsAuth,
} from "../../store/ducks/authUser/selectors";
import { isFollowing } from "../../utils";
import {
  NotificationContext,
  setUnAuthNotification,
} from "../../context/notification";
import {
  selectFetchGetUserLoadingStatus,
  selectGetUserError,
} from "../../store/ducks/users/selector";
import { LoadingStatus } from "../../store/types";
import ErrorPage from "../ErrorPage";
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle";

const ProfilePage: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const params = useParams<{ username: string }>();

  const notificationDispatch = useContext(NotificationContext);

  const [following, setFollowing] = useState<boolean>(false);

  const isAuth = useSelector(selectIsAuth);
  const getUserLoadingStatus = useSelector(selectFetchGetUserLoadingStatus);
  const getMeLoadingStatus = useSelector(selectGetMeLoadingStatus);
  const getUserError = useSelector(selectGetUserError);

  const { user, authUser, isMe } = useGetUserProfile(params.username);

  useEffect(() => {
    if (!isMe && authUser && user) {
      if (isFollowing(authUser, user._id)) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
  }, [user, authUser, isMe]);

  useSetDocumentTitle(
    `${user?.fullname} (@${user?.username}) • Instagram photos and videos`
  );

  const handleFollow = () => {
    if (!isAuth) {
      notificationDispatch(setUnAuthNotification());
    }
    if (user && authUser) {
      dispatch(fetchFollow(user._id));
    }
  };

  if (getUserError === "404") {
    return <ErrorPage />;
  }

  if (user) {
    return (
      <div className="profile">
        {getUserLoadingStatus === LoadingStatus.LOADING ||
        getMeLoadingStatus === LoadingStatus.LOADING ? (
          <div style={{ height: "90vh" }}>
            <Preloader size={30} centered />
          </div>
        ) : (
          <>
            <div className="profile__top">
              <div className="profile__avatar">
                <Avatar size={150} url={user.avatar} story={user.story} />
              </div>
              <div className="profile__top-content">
                <div className="profile__top-username">
                  <h2>{user?.username}</h2>
                  {isMe ? (
                    <>
                      <Link
                        to="/account/edit"
                        className="button secondary-button edit-profile__button"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        className="button primary-button edit-profile__button"
                        to="/post/create"
                      >
                        Create post
                      </Link>
                      <Link
                        className="button primary-button edit-profile__button"
                        to="/story/create"
                      >
                        Create story
                      </Link>
                    </>
                  ) : following ? (
                    <Unfollow user={user} authUser={authUser} />
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="button primary-button profile-follow__button"
                    >
                      Follow
                    </button>
                  )}
                </div>

                <ul className="profile__top-actions">
                  <li className="profile__top-actions-item">
                    <span>{user?.posts.length}</span>
                    <span>posts</span>
                  </li>
                  <Followers followers={user.followers} />
                  <Following following={user.following} />
                </ul>
                <h3 className="profile__top-fullname">{user?.fullname}</h3>
                <p className="profile__top-about">{user?.bio}</p>
              </div>
            </div>
            <div className="profile__bottom">
              <nav className="profile__bottom-navigation">
                <ul className="profile__bottom-navigation-list">
                  <li className="profile__bottom-navigation-item">
                    <NavLink
                      activeClassName="item-active"
                      exact
                      to={`/${user.username}`}
                    >
                      <TableIcon />
                      <span>Posts</span>
                    </NavLink>
                  </li>
                  {isMe && (
                    <li className="profile__bottom-navigation-item">
                      <NavLink
                        activeClassName="item-active"
                        to={`/${user.username}/saved`}
                      >
                        <BookmarkIcon />
                        <span>Saved</span>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </nav>
              <Switch>
                <Route exact path={`/${user.username}`}>
                  <ProfilePosts posts={user.posts} />
                </Route>
                <Route
                  exact
                  path={`/${user.username}/saved`}
                  component={SavedPosts}
                />
              </Switch>
            </div>
          </>
        )}
      </div>
    );
  } else return <div />;
};

export default ProfilePage;
