import React, { FC, useState } from "react";

import "./PostMedia.scss";

import { IImage, IVideo } from "../../index";
import { ArrowButton } from "../../../../components";

interface PostMediaProps {
  username: string;
  media: IImage[] | IVideo[];
}

const PostMedia: FC<PostMediaProps> = ({ media, username }): JSX.Element => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);

  return (
    <div className="post__content">
      {media[currentNumber].type === "image" ? (
        <img src={media[currentNumber].url} alt={"post by " + { username }} />
      ) : (
        <video src={media[currentNumber].url} />
      )}
      <ArrowButton
        show={media.length > 1 && currentNumber !== 0}
        direction={"left"}
        onClick={() => setCurrentNumber((prev) => prev - 1)}
        size={30}
      />
      <ArrowButton
        show={media.length > 1 && currentNumber !== media.length - 1}
        direction={"right"}
        onClick={() => setCurrentNumber((prev) => prev + 1)}
        size={30}
      />
    </div>
  );
};

export default PostMedia;
