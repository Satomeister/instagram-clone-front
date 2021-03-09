import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BsHeart as HeartIcon,
  BsHeartFill as HeartIconFilled,
} from "react-icons/all";
import { formatDistanceToNowStrict } from "date-fns";

import "./FullComment.scss";

import { IComment } from "../../store/ducks/posts/contracts/state";
import {
  fetchGetReplies,
  fetchLikeComment,
  fetchUnLikeComment,
  setFetchReplyCommentLoadingStatus,
} from "../../store/ducks/posts/actionCreators";
import { selectAuthUserId } from "../../store/ducks/authUser/selectors";
import { CommentReplyProps } from "../../pages/PostPage";
import { Likes, Reply } from "./components";
import { selectFetchReplyCommentLoadingStatus } from "../../store/ducks/posts/selector";
import { LoadingStatus } from "../../store/types";
import Avatar from "../Avatar";

interface FullCommentProps {
  postId: string;
  comment: IComment;
  setReply: (data: CommentReplyProps | undefined) => void;
  commentReply: CommentReplyProps | undefined;
}

const FullComment: FC<FullCommentProps> = ({
  commentReply,
  comment,
  postId,
  setReply,
}): JSX.Element => {
  const dispatch = useDispatch();

  const [repliesOpen, setRepliesOpen] = useState<boolean>(false);

  const authUserId = useSelector(selectAuthUserId);
  const sendReplyLoadingStatus = useSelector(
    selectFetchReplyCommentLoadingStatus
  );

  const handleLikeComment = () => {
    if (authUserId) {
      dispatch(
        fetchLikeComment({
          userId: authUserId,
          commentId: comment._id,
          postId,
        })
      );
    }
  };

  const handleUnLikeComment = () => {
    if (authUserId) {
      dispatch(
        fetchUnLikeComment({
          userId: authUserId,
          commentId: comment._id,
          postId,
        })
      );
    }
  };

  const handleOpenReplies = useCallback(() => {
    dispatch(
      fetchGetReplies({
        postId,
        commentId: comment._id,
        repliesCount: comment.replies ? comment.replies.length : 0,
      })
    );
    setRepliesOpen(true);
  }, [dispatch, comment._id, comment.replies, postId]);

  useEffect(() => {
    if (
      sendReplyLoadingStatus === LoadingStatus.SUCCESS &&
      commentReply?.commentId === comment._id
    ) {
      if (comment.replies.length === 1) {
        handleOpenReplies();
        setReply(undefined);
        dispatch(setFetchReplyCommentLoadingStatus(LoadingStatus.NEVER));
      }
    }
  }, [
    comment,
    sendReplyLoadingStatus,
    handleOpenReplies,
    setReply,
    commentReply,
    dispatch,
  ]);

  return (
    <li className="fullcomment">
      <Link to={`/${comment.author.username}`} className="fullcomment__avatar">
        <Avatar url={comment.author.avatar} />
      </Link>
      <div className="fullcomment__inner">
        <div className="fullcomment__content">
          <div>
            <Link
              to={`/${comment.author.username}`}
              className="fullcomment__username"
            >
              {comment.author.username}{" "}
            </Link>
            <span className="fullcomment__content-text">{comment.text}</span>
          </div>
        </div>
        <div className="fullcomment__data">
          <span>{formatDistanceToNowStrict(new Date(comment.createdAt))}</span>
          <Likes likes={comment.likes} />
          <button
            onClick={() => {
              setReply({
                commentId: comment._id,
                username: comment.author.username,
              });
            }}
          >
            Reply
          </button>
        </div>
        {comment.repliesCount > 0 && (
          <>
            {repliesOpen &&
            comment.replies &&
            comment.repliesCount === comment.replies.length ? (
              <button
                onClick={() => setRepliesOpen(false)}
                className="fullcomment__more-button"
              >
                Hide replies
              </button>
            ) : (
              <button
                onClick={handleOpenReplies}
                className="fullcomment__more-button"
              >
                View replies (
                {repliesOpen
                  ? comment.replies
                    ? comment.repliesCount - comment.replies.length
                    : comment.repliesCount
                  : comment.repliesCount}
                )
              </button>
            )}
            {repliesOpen && (
              <ul className="fullcomment__replies">
                {comment.replies?.length &&
                  comment.replies.map((reply) => (
                    <Reply
                      key={reply._id}
                      postId={postId}
                      commentId={comment._id}
                      setReply={setReply}
                      reply={reply}
                    />
                  ))}
              </ul>
            )}
          </>
        )}
      </div>
      {authUserId && comment.likes.includes(authUserId) ? (
        <div
          onClick={handleUnLikeComment}
          className="fullcomment__like-btn liked"
        >
          <HeartIconFilled />
        </div>
      ) : (
        <div onClick={handleLikeComment} className="fullcomment__like-btn">
          <HeartIcon />
        </div>
      )}
    </li>
  );
};

export default FullComment;
