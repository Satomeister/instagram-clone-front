import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsPlusCircle as PlusIcon } from "react-icons/bs";

import "./FullPost.scss";

import {
  PostActions,
  PostMedia,
  PostUserInfo,
  SendCommentInput,
} from "../../modules/Post/components";
import { Avatar, FullComment, Preloader } from "../index";
import { LoadingStatus } from "../../store/types";
import { CommentReplyProps } from "../../pages/PostPage";
import { IPost } from "../../store/ducks/posts/contracts/state";
import { selectFetchGetNewCommentsChunkLoadingStatus } from "../../store/ducks/posts/selector";
import { fetchGetNewCommentsChunk } from "../../store/ducks/posts/actionCreators";
import ModalWrapper from "../ModalWrapper";
import ModalWindow from "../ModalWindow";
import { ButtonItem, ButtonList } from "../ModalButtons";
import { isFollowing } from "../../utils";
import { selectAuthUserData } from "../../store/ducks/authUser/selectors";
import {
  fetchFollow,
  fetchUnFollow,
} from "../../store/ducks/users/actionCreators";

interface FullPostProps {
  post: IPost;
}

const FullPost: FC<FullPostProps> = ({ post }): JSX.Element => {
  const dispatch = useDispatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const [linksModalOpen, setLinksModalOpen] = useState<boolean>(false);
  const [commentReply, setCommentReply] = useState<
    CommentReplyProps | undefined
  >();

  const authUserData = useSelector(selectAuthUserData);
  const getNewCommentsChunkLoadingStatus = useSelector(
    selectFetchGetNewCommentsChunkLoadingStatus
  );

  const handleCommentIconClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleScrollCommentsDown = () => {
    if (commentsRef.current) {
      commentsRef.current.scroll(0, commentsRef.current.scrollHeight);
    }
  };

  const handleGetNewCommentsChunk = () => {
    if (post) {
      if (post.commentsCountWithoutReplies > post.comments.length) {
        dispatch(
          fetchGetNewCommentsChunk({
            postId: post._id,
            count: post.comments.length,
          })
        );
      }
    }
  };

  const handleFollow = () => {
    dispatch(fetchFollow(post.author._id));
  };

  const handleUnFollow = () => {
    dispatch(fetchUnFollow(post.author._id));
  };

  return (
    <>
      {linksModalOpen && authUserData && (
        <ModalWrapper onClose={() => setLinksModalOpen(false)}>
          <ModalWindow>
            <ButtonList>
              {isFollowing(authUserData, post.author._id) ? (
                <ButtonItem
                  onButtonClick={handleUnFollow}
                  color={"red"}
                  text="Unfollow"
                  withoutBorder
                />
              ) : (
                <ButtonItem
                  onButtonClick={handleFollow}
                  color={"blue"}
                  text="Follow"
                  withoutBorder
                />
              )}
              <ButtonItem
                href={`/${authUserData.username}`}
                text="Go to author"
              />
              <ButtonItem
                onButtonClick={() => setLinksModalOpen(false)}
                text="Cancel"
              />
            </ButtonList>
          </ModalWindow>
        </ModalWrapper>
      )}
      <div className="full-post">
        {post && (
          <>
            <PostMedia post={post} />
            <div className="full-post__right">
              <PostUserInfo
                user={post.author}
                openMenu={() => setLinksModalOpen(true)}
              />
              <div ref={commentsRef} className="full-post__feedback">
                <ul className="full-post__comments">
                  <>
                    {post.description && (
                      <li className="full-post__description">
                        <Link
                          to={`/${post.author.username}`}
                          className="full-post__description-avatar"
                        >
                          <Avatar
                            url={post.author.avatar}
                            story={post.author.story}
                          />
                        </Link>
                        <div className="full-post__description-inner">
                          <div className="full-post__description-content">
                            <div>
                              <Link
                                to={`/${post.author.username}`}
                                className="full-post__description-username"
                              >
                                {post.author.username}{" "}
                              </Link>
                              <span>{post.description}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {post.commentsCountWithoutReplies >
                      post.comments.length && (
                      <div className="full-post__feedback-plus-icon">
                        {getNewCommentsChunkLoadingStatus !==
                        LoadingStatus.LOADING ? (
                          <PlusIcon onClick={handleGetNewCommentsChunk} />
                        ) : (
                          <Preloader />
                        )}
                      </div>
                    )}
                    {post?.comments.map((comment) => (
                      <FullComment
                        commentReply={commentReply}
                        setReply={(data: CommentReplyProps | undefined) =>
                          setCommentReply(data)
                        }
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                      />
                    ))}
                  </>
                </ul>
              </div>
              <PostActions
                onCommentIconClick={handleCommentIconClick}
                post={post}
                withDate
              />
              <SendCommentInput
                postId={post._id}
                textareaRef={textareaRef}
                commentReply={commentReply}
                scrollComments={handleScrollCommentsDown}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FullPost;
