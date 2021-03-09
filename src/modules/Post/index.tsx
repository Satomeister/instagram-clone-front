import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";

import "./Post.scss";

import { FullPostModal, ModalWindow } from "../../components";
import { IPost } from "../../store/ducks/posts/contracts/state";
import {
  PostActions,
  PostComments,
  PostMedia,
  PostUserInfo,
  SendCommentInput,
} from "./components";
import ModalWrapper from "../../components/ModalWrapper";
import { ButtonItem, ButtonList } from "../../components/ModalButtons";
import { selectAuthUserData } from "../../store/ducks/authUser/selectors";
import { isFollowing } from "../../utils";
import {
  fetchFollow,
  fetchUnFollow,
} from "../../store/ducks/users/actionCreators";

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [fullDescription, setFullDescription] = useState<boolean>(true);
  const [fullPostModalOpen, setFullPostModalOpen] = useState<boolean>(false);
  const [linksModalOpen, setLinksModalOpen] = useState<boolean>(false);
  const [previousUrl, setPreviousUrl] = useState<string>("");

  const authUserData = useSelector(selectAuthUserData);

  const handleCommentIconClick = () => {
    history.push(`/post/${post._id}`);
  };

  const handleFollow = () => {
    dispatch(fetchFollow(post.author._id));
  };

  const handleUnFollow = () => {
    dispatch(fetchUnFollow(post.author._id));
  };

  const handleOpenFullPostModal = () => {
    setPreviousUrl(history.location.pathname);
    window.history.pushState("", "", `/post/${post._id}`);
    setFullPostModalOpen(true);
  };

  const handleCloseFullPostModal = () => {
    window.history.pushState("", "", previousUrl);
    setPreviousUrl("");
    setFullPostModalOpen(false);
  };

  return (
    <>
      {fullPostModalOpen && (
        <FullPostModal postId={post._id} onClose={handleCloseFullPostModal} />
      )}
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
              <ButtonItem href={`/post/${post._id}`} text="Go to post" />
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
      <div className="post">
        <PostUserInfo
          user={post.author}
          openMenu={() => setLinksModalOpen(true)}
        />
        <PostMedia post={post} />
        <PostActions post={post} onCommentIconClick={handleCommentIconClick} />
        {post.description ? (
          fullDescription ? (
            <div className="post__description">
              <span className="post__description-username">
                {post.author.username}{" "}
              </span>
              <span className="post__description-text">{post.description}</span>
              {post.description.length > 40 && (
                <span
                  onClick={() => setFullDescription(false)}
                  className="post__description-more"
                >
                  show less
                </span>
              )}
            </div>
          ) : (
            <div className="post__description">
              <span className="post__description-username">
                {post.author.username}{" "}
              </span>
              <span className="post__description-text">
                {post.description?.slice(0, 40).concat(" ...")}
              </span>
              <span
                onClick={() => setFullDescription(true)}
                className="post__description-more"
              >
                more
              </span>
            </div>
          )
        ) : null}
        <PostComments
          postId={post._id}
          commentsCount={post.commentsCount}
          onOpenFullPostModal={handleOpenFullPostModal}
          lastComments={post.comments.concat().reverse()}
        />
        <p className="post__date">
          {formatDistanceToNowStrict(new Date(post.createdAt))}
        </p>
        <SendCommentInput postId={post._id} textareaRef={textareaRef} />
      </div>
    </>
  );
};
export default Post;
