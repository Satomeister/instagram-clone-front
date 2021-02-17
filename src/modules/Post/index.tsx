import React, { FC, useEffect, useState } from "react";

import "./Post.scss";

import {Avatar, DotsMenu, FullPostModal} from "../../components";
import {
  PostActions,
  PostComments,
  PostMedia,
  SendCommentInput,
} from "./components";

export interface IImage {
  url: string;
  type: "image";
}

export interface IVideo {
  url: string;
  type: "video";
}

export interface IComment {
  _id: string;
  text: string;
  likes?: number;
  sender: {username: string};
}

export interface IPost {
  username: string;
  avatar?: string;
  media: IImage[] | IVideo[];
  description?: string;
  lastComments?: IComment[];
  commentsCount: number;
}

const Post: FC<IPost> = ({
  username,
  avatar,
  media,
  description,
  lastComments,
  commentsCount,
}): JSX.Element => {
  const [fullDescription, setFullDescription] = useState<boolean>(true);
  const [fullPostModalOpen, setFullPostModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (description && description.length > 40) {
      setFullDescription(false);
    }
  }, [description]);

  return (
    <>
      {fullPostModalOpen && (
        <FullPostModal
          username={username}
          media={media}
          handleSetFullPostModalOpen={setFullPostModalOpen}
        />
      )}
      <div className="post">
        <div className="post__top">
          <div className="post__user-info">
            <Avatar url={avatar} />
            <span className="post__username">{username}</span>
          </div>
          <DotsMenu />
        </div>
        <PostMedia username={username} media={media} />
        <PostActions likesCount={3} />
        {description && fullDescription ? (
          <div className="post__description">
            <span className="post__description-username">{username} </span>
            <span className="post__description-text">{description}</span>
            {description.length > 40 && (
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
            <span className="post__description-username">{username} </span>
            <span className="post__description-text">
              {description?.slice(0, 40).concat(" ...")}
            </span>
            <span
              onClick={() => setFullDescription(true)}
              className="post__description-more"
            >
              more
            </span>
          </div>
        )}
        <PostComments
          handleSetFullPostModalOpen={setFullPostModalOpen}
          commentsCount={commentsCount}
          lastComments={lastComments}
        />
        <SendCommentInput />
      </div>
    </>
  );
};
export default Post;
