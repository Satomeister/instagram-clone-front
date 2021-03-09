import React, { FC } from "react";

interface LikesProps {
  likes: string[];
}

const Likes: FC<LikesProps> = ({ likes }): JSX.Element => {
  return (
    <>
      {likes.length !== 0 ? (
        likes.length > 1 ? (
          <span>{likes.length} likes</span>
        ) : (
          <span>{likes.length} like</span>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Likes;
