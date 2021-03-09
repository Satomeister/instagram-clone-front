import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BsHeart as HeartIcon,
  BsHeartFill as HeartIconFilled,
} from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";

import { IReply } from "../../../../store/ducks/posts/contracts/state";
import Avatar from "../../../Avatar";
import { Likes, ReplyText } from "../index";
import { selectAuthUserId } from "../../../../store/ducks/authUser/selectors";
import {
  fetchLikeReply,
  fetchUnLikeReply,
} from "../../../../store/ducks/posts/actionCreators";
import { CommentReplyProps } from "../../../../pages/PostPage";

interface ReplyProps {
  postId: string;
  commentId: string;
  setReply: (data: CommentReplyProps | undefined) => void;
  reply: IReply;
}

const Reply: FC<ReplyProps> = ({
  postId,
  commentId,
  setReply,
  reply,
}): JSX.Element => {
  const dispatch = useDispatch();

  const authUserId = useSelector(selectAuthUserId);

  const handleLikeReply = (replyId: string) => {
    if (authUserId) {
      dispatch(
        fetchLikeReply({
          userId: authUserId,
          postId: postId,
          commentId,
          replyId,
        })
      );
    }
  };

  const handleUnLikeReply = (replyId: string) => {
    if (authUserId) {
      dispatch(
        fetchUnLikeReply({
          userId: authUserId,
          postId: postId,
          commentId,
          replyId,
        })
      );
    }
  };

  return (
    <li key={reply._id} className="fullcomment">
      <Link to={`/${reply.author.username}`} className="fullcomment__avatar">
        <Avatar url={reply.author.avatar} />
      </Link>
      <div className="fullcomment__inner">
        <div className="fullcomment__content">
          <div>
            <Link
              to={`/${reply.author.username}`}
              className="fullcomment__username"
            >
              {reply.author.username}
            </Link>
            <ReplyText text={reply.text} />
          </div>
        </div>
        <div className="fullcomment__data">
          <span>{formatDistanceToNowStrict(new Date(reply.createdAt))}</span>
          <Likes likes={reply.likes} />
          <button
            onClick={() =>
              setReply({
                commentId: commentId,
                username: reply.author.username,
              })
            }
          >
            Reply
          </button>
        </div>
      </div>
      {authUserId && reply.likes.includes(authUserId) ? (
        <div
          onClick={() => handleUnLikeReply(reply._id)}
          className="fullcomment__like-btn liked"
        >
          <HeartIconFilled />
        </div>
      ) : (
        <div
          onClick={() => handleLikeReply(reply._id)}
          className="fullcomment__like-btn"
        >
          <HeartIcon />
        </div>
      )}
    </li>
  );
};

export default Reply;
