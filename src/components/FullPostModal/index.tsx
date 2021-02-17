import React, { Dispatch, FC, SetStateAction } from "react";

import "./FullPostModal.scss";

import {
  PostActions,
  PostMedia,
  SendCommentInput,
} from "../../modules/Post/components";
import { Avatar, DotsMenu, FullComment } from "../index";
import { IImage, IVideo } from "../../modules/Post";
import ModalWrapper from "../ModalWrapper";

interface FullPostModalProps {
  username: string;
  media: IImage[] | IVideo[];
  handleSetFullPostModalOpen: Dispatch<SetStateAction<boolean>>;
}

const FullPostModal: FC<FullPostModalProps> = ({
  username,
  media,
  handleSetFullPostModalOpen,
}): JSX.Element => {
  return (
    <ModalWrapper onClose={() => handleSetFullPostModalOpen(false)}>
      <div className="fullPostModal">
        <PostMedia username={username} media={media} />
        <div className="fullPostModal__right">
          <div className="fullPostModal__info">
            <div className="fullPostModal__user">
              <Avatar />
              <span className="fullPostModal__user-username">{username}</span>
            </div>
            <DotsMenu />
          </div>
          <div className="fullPostModal__feedback">
            <ul className="fullPostModal__comments">
              <FullComment />
            </ul>
          </div>
          <PostActions likesCount={3} />
          <SendCommentInput />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default FullPostModal;
