import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./PostPage.scss";

import { FullPost, Preloader } from "../../components";
import { fetchGetSelectedPost } from "../../store/ducks/posts/actionCreators";
import {
  selectFetchGetSelectedPostLoadingStatus,
  selectGetSelectedPostError,
  selectSelectedPost,
} from "../../store/ducks/posts/selector";
import { LoadingStatus } from "../../store/types";
import ErrorPage from "../ErrorPage";
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle";
import { IPost } from "../../store/ducks/posts/contracts/state";

export interface CommentReplyProps {
  username: string;
  commentId: string;
}

const getDocumentTitle = (post: IPost | undefined) => {
  if (post) {
    if (post.description) {
      return `${post.author.fullname}: ${post.description}`;
    } else {
      return post.media[0].type === "image"
        ? `Instagram photo by ${post.author.username}`
        : `Instagram video by ${post.author.username}`;
    }
  }
  return "";
};

const PostPage: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const params = useParams<{ postId: string }>();

  const selectedPost = useSelector(selectSelectedPost);
  const fetchGetSelectedPostLoadingStatus = useSelector(
    selectFetchGetSelectedPostLoadingStatus
  );
  const getSelectedPostError = useSelector(selectGetSelectedPostError);

  useSetDocumentTitle(getDocumentTitle(selectedPost));

  useEffect(() => {
    if (selectedPost?._id !== params.postId) {
      dispatch(fetchGetSelectedPost(params.postId));
    }
  }, [params.postId, selectedPost?._id, dispatch]);

  if (getSelectedPostError === "404") {
    return <ErrorPage />;
  }

  return (
    <div className="full-post__wrapper">
      {fetchGetSelectedPostLoadingStatus === LoadingStatus.LOADING ||
      !selectedPost ? (
        <div className="full-post__preloader">
          <Preloader centered />
        </div>
      ) : (
        <FullPost post={selectedPost} />
      )}
    </div>
  );
};

export default PostPage;
