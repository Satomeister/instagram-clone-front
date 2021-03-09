import React, { FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlay as PlayIcon,
  BsHeartFill as HeartIconFilled,
} from "react-icons/all";
import classNames from "classnames";

import "./PostMedia.scss";

import { ArrowButton } from "../../../../components";
import { IPost } from "../../../../store/ducks/posts/contracts/state";
import { fetchLikePost } from "../../../../store/ducks/posts/actionCreators";
import { selectAuthUserId } from "../../../../store/ducks/authUser/selectors";

interface PostMediaProps {
  post: IPost;
}

const PostMedia: FC<PostMediaProps> = ({ post }): JSX.Element => {
  const dispatch = useDispatch();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [imageHeart, setImageHeart] = useState<boolean>(false);

  const authUserId = useSelector(selectAuthUserId);

  const handleToggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    }
  };

  const handleDoubleClick = () => {
    if (authUserId && !post.likes.includes(authUserId)) {
      setImageHeart(true);
      dispatch(fetchLikePost(post._id));
      setTimeout(() => {
        setImageHeart(false);
      }, 1000);
    }
  };

  return (
    <div className="post-media">
      <div className="post-media__file">
        {post.media[currentNumber].type === "image" ? (
          <img
            onDoubleClick={handleDoubleClick}
            src={post.media[currentNumber].url}
            alt={`posts by ${post.author.username}`}
          />
        ) : (
          <video
            ref={videoRef}
            onClick={handleToggleVideoPlay}
            src={post.media[currentNumber].url}
          />
        )}
      </div>
      {imageHeart && (
        <div className="post-media__icon-heart">
          <HeartIconFilled />
        </div>
      )}
      {post.media[currentNumber].type === "video" && !videoPlaying && (
        <div onClick={handleToggleVideoPlay} className="post-media__play-btn">
          <PlayIcon />
        </div>
      )}
      {post.media.length > 1 && (
        <ul className="post-media__dots">
          {post.media.map((_, index) => (
            <li
              key={index}
              className={classNames("post-media__dots-item", {
                "post-media__dots-item--active": index === currentNumber,
              })}
            />
          ))}
        </ul>
      )}
      <ArrowButton
        show={post.media.length > 1 && currentNumber !== 0}
        direction={"left"}
        onClick={() => setCurrentNumber((prev) => prev - 1)}
        size={30}
      />
      <ArrowButton
        show={post.media.length > 1 && currentNumber !== post.media.length - 1}
        direction={"right"}
        onClick={() => setCurrentNumber((prev) => prev + 1)}
        size={30}
      />
    </div>
  );
};

export default PostMedia;
