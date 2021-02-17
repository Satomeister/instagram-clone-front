import React, { Dispatch, FC, SetStateAction } from "react";

import "./PostComments.scss";

import { IComment } from "../../index";
import { BsHeart as LikeIcon } from "react-icons/all";

interface PostCommentsProps {
  lastComments?: IComment[];
  commentsCount: number;
  handleSetFullPostModalOpen: Dispatch<SetStateAction<boolean>>;
}

const PostComments: FC<PostCommentsProps> = ({
  lastComments,
  commentsCount,
  handleSetFullPostModalOpen,
}): JSX.Element => {
  return (
    <>
      {lastComments?.length && (
        <div className="post-comments">
          {commentsCount > 2 && (
            <span
              onClick={() => handleSetFullPostModalOpen(true)}
              className="post-comments__view-all"
            >
              View all {commentsCount} comments
            </span>
          )}
          {lastComments.map((comment) => (
            <div key={comment._id} className="post-comments__item">
              <span className="post-comments__item-username">
                {comment.sender.username}{" "}
              </span>
              <span className="post-comments__item-text">{comment.text}</span>
              <button className="post-comments__item-likes">
                <LikeIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostComments;
