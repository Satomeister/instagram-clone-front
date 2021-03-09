import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalWrapper from "../ModalWrapper";
import FullPost from "../FullPost";
import {
  selectFetchGetSelectedPostLoadingStatus,
  selectSelectedPost,
} from "../../store/ducks/posts/selector";
import { fetchGetSelectedPost } from "../../store/ducks/posts/actionCreators";
import { LoadingStatus } from "../../store/types";
import { Preloader } from "../index";
import ModalWindow from "../ModalWindow";

interface FullPostModalProps {
  postId: string;
  onClose: () => void;
}

const FullPostModal: FC<FullPostModalProps> = ({
  postId,
  onClose,
}): JSX.Element => {
  const dispatch = useDispatch();

  const selectedPost = useSelector(selectSelectedPost);
  const fetchGetSelectedPostLoadingStatus = useSelector(
    selectFetchGetSelectedPostLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchGetSelectedPost(postId));
  }, [dispatch, postId]);

  return (
    <ModalWrapper onClose={onClose}>
      {selectedPost &&
      fetchGetSelectedPostLoadingStatus !== LoadingStatus.LOADING ? (
        <FullPost post={selectedPost} />
      ) : (
        <ModalWindow height={60} width={60}>
          <Preloader centered size={33} />
        </ModalWindow>
      )}
    </ModalWrapper>
  );
};

export default FullPostModal;
