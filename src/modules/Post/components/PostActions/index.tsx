import React, { FC } from "react";

import "./PostActions.scss";

import {
  BsHeart as LikeIcon,
  GoComment as CommentIcon,
  BsBookmark as BookmarkIcon,
} from "react-icons/all";

interface PostActionsProps {
  likesCount: number;
}

const PostActions: FC<PostActionsProps> = ({ likesCount }): JSX.Element => {
  return (
    <div className='post-actions__wrapper'>
      <div className="post-actions">
        <div className="post-actions__left">
          <button>
            <LikeIcon />
          </button>
          <button>
            <CommentIcon />
          </button>
        </div>
        <div className="post-actions__right">
          <button>
            <BookmarkIcon />
          </button>
        </div>
      </div>
      {likesCount > 0 && (
        <div className="likes-count">
          <span>{likesCount}</span> {likesCount === 1 ? "like" : "likes"}
        </div>
      )}
      <p className='post__date'>27 december 2021</p>
    </div>
  );
};
export default PostActions;
