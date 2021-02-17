import React, { FC, useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineTable as TableIcon,
  BsBookmark as BookmarkIcon,
} from "react-icons/all";
import classNames from "classnames";

import "./Profile.scss";

import { Avatar } from "../../components";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { fetchFollow } from "../../store/ducks/users/actionCreators";
import { Followers, Following, Unfollow } from "./components";
import { selectIsAuth } from "../../store/ducks/user/selectors";
import ModalWrapper from "../../components/ModalWrapper";

const Profile: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const params = useParams<{ username: string }>();
  const canvasBorderRef = useRef<HTMLCanvasElement>(null);
  const { user, authUser, isMe } = useGetUserProfile(params.username);
  const [following, setFollowing] = useState<boolean>(false);
  const [unauthModalOpen, setUnauthModalOpen] = useState<boolean>(false);
  const isAuth = useSelector(selectIsAuth);
  const isStory = true;

  useEffect(() => {
    if (!isMe && authUser && user) {
      if (
        authUser.following.some(
          (followingUser) => followingUser._id === user._id
        )
      ) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
  }, [user, authUser, isMe]);

  useEffect(() => {
    if (user) {
      document.title = `${user.fullname} (@${user.username}) • Instagram photos and videos`;
    }
  }, [user]);

  useEffect(() => {
    if (isStory && canvasBorderRef.current?.getContext) {
      const ctx = canvasBorderRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(0, 20, 50, 50);

        gradient.addColorStop(0, "#fa7e1e");
        gradient.addColorStop(1, "#d62976");

        ctx.strokeStyle = gradient;

        ctx.arc(80, 80, 78, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }, [canvasBorderRef, isStory]);

  const handleFollow = () => {
    if (!isAuth) {
      setUnauthModalOpen(true);
    }
    if (user && authUser) {
      dispatch(fetchFollow(user._id));
    }
  };

  if (user) {
    return (
      <div className="profile">
        {unauthModalOpen && (
          <ModalWrapper onClose={() => setUnauthModalOpen(false)}>
            <div className="unauth-modal">
              <h3>You are not Logged in</h3>
              <Link to="/auth/signin">Log in</Link>
            </div>
          </ModalWrapper>
        )}
        <div className="profile__top">
          {!isMe && isStory ? (
            <div
              className={classNames("profile__avatar", {
                "profile__avatar--withborder": true,
              })}
            >
              <canvas
                width={172}
                height={172}
                ref={canvasBorderRef}
                className="profile__avatar-border"
              />
              <Avatar size={150} url={user.avatar} />
            </div>
          ) : (
            <div className="profile__avatar">
              <Avatar size={150} url={user.avatar} />
            </div>
          )}

          <div className="profile__top-content">
            <h2 className="profile__top-username">
              {user?.username}
              {isMe ? (
                <Link
                  to="/account/edit"
                  className="button secondary-button edit-profile__button"
                >
                  Edit Profile
                </Link>
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
            </h2>
            <ul className="profile__top-actions-list">
              <li className="profile__top-actions-item">
                <span>{user?.posts.length}</span>
                <span>posts</span>
              </li>
              <Followers
                followers={user.followers}
                openUnauthModal={() => setUnauthModalOpen(true)}
              />
              <Following
                following={user.following}
                openUnauthModal={() => setUnauthModalOpen(true)}
              />
            </ul>
            <h3 className="profile__top-fullname">{user?.fullname}</h3>
            <p className="profile__top-about">{user?.bio}</p>
          </div>
        </div>
        <div className="profile__bottom">
          <nav className="profile__bottom-navigation">
            <ul>
              <li>
                <NavLink activeClassName="item-active" exact to={"/username"}>
                  <TableIcon />
                  <span>Posts</span>
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="item-active" to={"/username/saved"}>
                  <BookmarkIcon />
                  <span>Saved</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else return <div />;
};

export default Profile;
