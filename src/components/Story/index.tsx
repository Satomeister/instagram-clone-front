import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  IoPlay as PlayIcon,
  GiPauseButton as PauseIcon,
  MdVolumeOff as VolumeOffIcon,
  MdVolumeUp as VolumeOnIcon,
} from "react-icons/all";
import classNames from "classnames";

import "./Story.scss";

// @ts-ignore
import video from "../../assets/lesson1.mp4";
import { Avatar } from "../index";

interface StoryProps {
  active?: boolean;
  id: string;
  handleSetActiveStory: Dispatch<SetStateAction<string>>;
  isSound: boolean;
  setIsSound: Dispatch<SetStateAction<boolean>>;
}

const Story: FC<StoryProps> = ({
  active,
  id,
  handleSetActiveStory,
                         isSound,
                         setIsSound,
}): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [durationLineWidth, setDurationLineWidth] = useState<string>("0");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isSound;
    }
    // eslint-disable-next-line
  }, [videoRef]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isSound;
    }
    // eslint-disable-next-line
  }, [isSound, videoRef]);

  const pause = () => {

    setPlaying(false);
    videoRef.current?.pause();
  };

  const play = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  const setVolumeOff = () => {
    if (videoRef.current) {
      setIsSound(false);
      videoRef.current.muted = true;
    }
  };

  const setVolumeOn = () => {
    if (videoRef.current) {
      setIsSound(true);
      videoRef.current.muted = false;
    }
  };

  const handleEndVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const handleTimeChange = () => {
    if (videoRef.current) {
      setDurationLineWidth(
        (+videoRef.current.currentTime / +videoRef.current.duration) * 100 + "%"
      );
    }
  };
  return (
    <li onClick={() => handleSetActiveStory(id)} className="story__wrapper">
      <div
        className={classNames("story", { "story--active": active })}
      >
        <video onEnded={handleEndVideo} onTimeUpdate={handleTimeChange} ref={videoRef} src={video} />
        <div className="story__data">
          <div className="story__data-top">
            <div
              style={{ width: durationLineWidth }}
              className="story__data-duration"
            />
          </div>
          <div className="story__data-bottom">
            <Link to={"/username"} className="story__data-user">
              <Avatar size={40} />
              <span>nihuyachiksa</span>
              <span>7h</span>
            </Link>
            <div className="story__data-controls">
              {!playing ? (
                <PlayIcon onClick={play} />
              ) : (
                <PauseIcon onClick={pause} />
              )}
              {isSound ? (
                <VolumeOnIcon onClick={setVolumeOff} />
              ) : (
                <VolumeOffIcon onClick={setVolumeOn} />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Story;
