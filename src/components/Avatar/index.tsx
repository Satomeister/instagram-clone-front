import React, { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Avatar.scss";

import noavatar from "../../assets/noavatar.jpg";

import { IStory } from "../../store/ducks/stories/contracts/state";
import { setChosenStory } from "../../store/ducks/stories/actionCreators";
import { selectAuthUserId } from "../../store/ducks/authUser/selectors";

interface AvatarProps {
  url?: string;
  size?: number;
  story?: IStory;
}

const Avatar: FC<AvatarProps> = ({ size, url, story }): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const canvasBorderRef = useRef<HTMLCanvasElement>(null);

  const authUserId = useSelector(selectAuthUserId);

  useEffect(() => {
    if (canvasBorderRef.current?.getContext) {
      const ctx = canvasBorderRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = size ? (size < 40 ? 1.5 : 2) : 1.5;

        if (authUserId && story?.watchers.includes(authUserId)) {
          ctx.strokeStyle = "#bfbfbf";
        } else {
          const gradient = ctx.createLinearGradient(20, 20, 70, 50);

          gradient.addColorStop(0, "#fa7e1e");
          gradient.addColorStop(1, "#d62976");

          ctx.strokeStyle = gradient;
        }

        ctx.arc(
          size ? size / 2 + 5 : 32 / 2 + 5,
          size ? size / 2 + 5 : 32 / 2 + 5,
          size ? size / 2 + (size < 40 ? 3 : 4) : 32 / 2 + 3,
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.stroke();
      }
    }
  }, [canvasBorderRef, size, authUserId, story]);

  const openStory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (story) {
      e.preventDefault();
      dispatch(setChosenStory(story));
      history.push(`/stories/${story._id}`, {
        prevPath: history.location.pathname,
      });
    }
  };

  if (story) {
    return (
      <div
        onClick={openStory}
        className="avatar-wrapper"
        style={{ width: size ? size + 10 : 42, height: size ? size + 10 : 42 }}
      >
        <canvas
          width={size ? size + 10 : 42}
          height={size ? size + 10 : 42}
          ref={canvasBorderRef}
          className="avatar__border"
        />
        <img
          style={{ width: size, height: size }}
          className="avatar"
          src={url || noavatar}
          alt="avatar"
        />
      </div>
    );
  }

  return (
    <div
      className="avatar-wrapper"
      style={{ width: size ? size + 10 : 42, height: size ? size + 10 : 42 }}
    >
      <img
        style={{ width: size, height: size }}
        className="avatar"
        src={url || noavatar}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
