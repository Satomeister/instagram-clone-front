import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import { AiOutlineMessage as MessageIcon } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";

import "./SendCommentInput.scss";

import {
  fetchCommentPost,
  fetchReplyComment,
  setFetchCommentPostLoadingStatus,
  setFetchReplyCommentLoadingStatus,
} from "../../../../store/ducks/posts/actionCreators";
import {
  selectFetchCommentPostLoadingStatus,
  selectFetchReplyCommentLoadingStatus,
} from "../../../../store/ducks/posts/selector";
import { Preloader } from "../../../../components";
import { LoadingStatus } from "../../../../store/types";
import { CommentReplyProps } from "../../../../pages/PostPage";
import { selectIsAuth } from "../../../../store/ducks/authUser/selectors";
import {
  NotificationContext,
  setUnAuthNotification,
} from "../../../../context/notification";

interface SendCommentInputProps {
  postId: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  scrollComments?: () => void;
  commentReply?: CommentReplyProps | undefined;
}

const SendCommentInput: FC<SendCommentInputProps> = ({
  postId,
  textareaRef,
  scrollComments,
  commentReply,
}): JSX.Element => {
  const dispatch = useDispatch();

  const notificationDispatch = useContext(NotificationContext);

  const [value, setValue] = useState<string>("");

  const isAuth = useSelector(selectIsAuth);
  const sendCommentLoadingStatus = useSelector(
    selectFetchCommentPostLoadingStatus
  );
  const sendReplyLoadingStatus = useSelector(
    selectFetchReplyCommentLoadingStatus
  );

  useEffect(() => {
    if (commentReply && textareaRef.current) {
      setValue(`@${commentReply.username} `);
      textareaRef.current.focus();
    }
  }, [commentReply, textareaRef]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleInputClick = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleInputBlur = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 18 + "px";
      textareaRef.current.scroll(0, textareaRef.current.scrollHeight);
    }
  };

  const handleSendComment = () => {
    if (!isAuth) {
      return notificationDispatch(setUnAuthNotification());
    }
    if (value.trim()) {
      if (commentReply) {
        dispatch(
          fetchReplyComment({
            postId: postId,
            commentId: commentReply.commentId,
            usernameTo: commentReply.username,
            text: value,
          })
        );
      } else {
        dispatch(fetchCommentPost({ postId, text: value }));
      }
    }
  };

  const handleTextAreaKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  useEffect(() => {
    if (sendCommentLoadingStatus === LoadingStatus.SUCCESS) {
      setValue("");
      scrollComments && scrollComments();
      dispatch(setFetchCommentPostLoadingStatus(LoadingStatus.NEVER));
    }
    if (sendReplyLoadingStatus === LoadingStatus.SUCCESS) {
      setValue("");
      dispatch(setFetchReplyCommentLoadingStatus(LoadingStatus.NEVER));
    }
  }, [
    sendCommentLoadingStatus,
    sendReplyLoadingStatus,
    scrollComments,
    dispatch,
  ]);

  return (
    <div className="send-comment-input">
      <MessageIcon />
      <textarea
        onKeyPress={handleTextAreaKeyPress}
        ref={textareaRef}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        value={value}
        placeholder="Add a comment..."
      />
      {sendCommentLoadingStatus === LoadingStatus.LOADING ||
      sendReplyLoadingStatus === LoadingStatus.LOADING ? (
        <div style={{ marginRight: 12 }}>
          <Preloader />
        </div>
      ) : (
        <button
          onClick={handleSendComment}
          disabled={value.trim().length === 0}
        >
          Post
        </button>
      )}
    </div>
  );
};

export default SendCommentInput;
