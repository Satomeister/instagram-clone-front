import React, { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsHeart as LikeIcon,
  BsHeartFill as FilledLikeIcon,
  GoComment as CommentIcon,
  BsBookmark as BookmarkIcon,
  BsBookmarkFill as FilledBookmarkIcon,
} from "react-icons/all";
import { formatDistanceToNowStrict } from "date-fns";

import "./PostActions.scss";

import {
  fetchLikePost,
  fetchUnLikePost,
} from "../../../../store/ducks/posts/actionCreators";
import { IPost } from "../../../../store/ducks/posts/contracts/state";
import {
  selectAuthUserData,
  selectIsAuth,
} from "../../../../store/ducks/authUser/selectors";
import {
  fetchSavePost,
  fetchUnSavePost,
} from "../../../../store/ducks/authUser/actionCreators";
import {
  NotificationContext,
  setUnAuthNotification,
} from "../../../../context/notification";

interface PostActionsProps {
  post: IPost;
  onCommentIconClick: () => void;
  withDate?: boolean;
}

const PostActions: FC<PostActionsProps> = ({
  post,
  onCommentIconClick,
  withDate,
}): JSX.Element => {
  const dispatch = useDispatch();

  const notificationDispatch = useContext(NotificationContext);

  const isAuth = useSelector(selectIsAuth);
  const authUser = useSelector(selectAuthUserData);

  const handleLike = () => {
    if (isAuth) {
      dispatch(fetchLikePost(post._id));
    } else {
      notificationDispatch(setUnAuthNotification());
    }
  };

  const handleUnLike = () => {
    dispatch(fetchUnLikePost(post._id));
  };

  const handleSavePost = () => {
    if (isAuth) {
      dispatch(
        fetchSavePost({
          _id: post._id,
          media: post.media,
          likesCount: post.likesCount,
          commentsCount: post.commentsCount,
        })
      );
    } else {
      notificationDispatch(setUnAuthNotification());
    }
  };

  const handleUnSavePost = () => {
    dispatch(
      fetchUnSavePost({
        _id: post._id,
        media: post.media,
        likesCount: post.likesCount,
        commentsCount: post.commentsCount,
      })
    );
  };

  return (
    <div className="post-actions__wrapper">
      <div className="post-actions">
        <div className="post-actions__left">
          {authUser && post.likes.includes(authUser._id) ? (
            <button onClick={handleUnLike} className="liked">
              <FilledLikeIcon />
            </button>
          ) : (
            <button onClick={handleLike}>
              <LikeIcon />
            </button>
          )}
          <button onClick={() => onCommentIconClick()}>
            <CommentIcon />
          </button>
        </div>
        <div className="post-actions__right">
          {authUser?.saved && authUser.saved.includes(post._id) ? (
            <button onClick={handleUnSavePost}>
              <FilledBookmarkIcon />
            </button>
          ) : (
            <button onClick={handleSavePost}>
              <BookmarkIcon />
            </button>
          )}
        </div>
      </div>

      <div className="likes-count">
        <span>{post.likesCount}</span>{" "}
        {post.likesCount === 1 ? "like" : "likes"}
      </div>

      {withDate && (
        <p className="post__date">
          {formatDistanceToNowStrict(new Date(post.createdAt))}
        </p>
      )}
    </div>
  );
};
export default PostActions;
