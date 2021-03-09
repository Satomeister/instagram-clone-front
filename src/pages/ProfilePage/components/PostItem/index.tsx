import React, { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BiMerge,
  FaComment as CommentIcon,
  FaHeart as LikeIcon,
  IoVideocam,
} from "react-icons/all";

import "./PostItem.scss";

import { IShortPost } from "../../../../store/ducks/posts/contracts/state";
import { selectIsAuth } from "../../../../store/ducks/authUser/selectors";
import {
  NotificationContext,
  setUnAuthNotification,
} from "../../../../context/notification";

interface PostItemProps {
  post: IShortPost;
}

const PostItem: FC<PostItemProps> = ({ post }): JSX.Element => {
  const history = useHistory();

  const notificationDispatch = useContext(NotificationContext);

  const isAuth = useSelector(selectIsAuth);

  const handleClick = () => {
    if (isAuth) {
      history.push(`/post/${post._id}`);
    } else {
      notificationDispatch(setUnAuthNotification());
    }
  };

  return (
    <li onClick={handleClick} className="post-item">
      {post.media[0].type === "image" ? (
        <img src={post.media[0].url} alt="post" className="post-item__image" />
      ) : (
        <video src={post.media[0].url} className="post-item__image" />
      )}
      <div className="post-item__type">
        {post.media[0].type === "video" ? (
          <IoVideocam />
        ) : post.media.length > 1 ? (
          <BiMerge />
        ) : (
          ""
        )}
      </div>
      <div className="post-item__mask">
        <ul className="post-item__mask-list">
          <li className="post-item__mask-item">
            <LikeIcon />
            <span>{post.likesCount}</span>
          </li>
          <li className="post-item__mask-item">
            <CommentIcon />
            <span>{post.commentsCount}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default PostItem;
