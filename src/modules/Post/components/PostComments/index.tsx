import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsHeart as LikeIcon,
  BsHeartFill as HeartIconFilled,
} from "react-icons/all";

import "./PostComments.scss";

import { IComment } from "../../../../store/ducks/posts/contracts/state";
import {
  fetchLikeComment,
  fetchUnLikeComment,
} from "../../../../store/ducks/posts/actionCreators";
import { selectAuthUserId } from "../../../../store/ducks/authUser/selectors";

interface PostCommentsProps {
  postId: string;
  lastComments?: IComment[];
  commentsCount: number;
  onOpenFullPostModal: () => void;
}

const PostComments: FC<PostCommentsProps> = ({
  postId,
  lastComments,
  commentsCount,
  onOpenFullPostModal,
}): JSX.Element => {
  const dispatch = useDispatch();

  const authUserId = useSelector(selectAuthUserId);

  const handleLikeComment = (id: string) => {
    if (authUserId) {
      dispatch(fetchLikeComment({ postId, commentId: id, userId: authUserId }));
    }
  };

  const handleUnLikeComment = (id: string) => {
    if (authUserId) {
      dispatch(
        fetchUnLikeComment({ postId, commentId: id, userId: authUserId })
      );
    }
  };

  return (
    <>
      {!!lastComments?.length && (
        <div className="post-comments">
          {commentsCount > 2 && (
            <span
              onClick={onOpenFullPostModal}
              className="post-comments__view-all"
            >
              View all {commentsCount} comments
            </span>
          )}
          {lastComments.map((comment) => (
            <div key={comment._id} className="post-comments__item">
              <span className="post-comments__item-username">
                {comment.author.username}{" "}
              </span>
              <span className="post-comments__item-text">{comment.text}</span>
              {authUserId && comment.likes.includes(authUserId) ? (
                <button
                  onClick={() => handleUnLikeComment(comment._id)}
                  className="post-comments__item-likes liked"
                >
                  <HeartIconFilled />
                </button>
              ) : (
                <button
                  onClick={() => handleLikeComment(comment._id)}
                  className="post-comments__item-likes"
                >
                  <LikeIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostComments;
