import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
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
import { format, isToday } from "date-fns";

import "./Story.scss";

import { Avatar } from "../index";
import { IStory } from "../../store/ducks/stories/contracts/state";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUserId } from "../../store/ducks/authUser/selectors";
import { fetchWatchStory } from "../../store/ducks/stories/actionCreators";

interface StoryProps {
  active?: boolean;
  story: IStory;
  onSetActiveStory: Dispatch<SetStateAction<string>>;
  onSetNextStory: () => void;
  isSound: boolean;
  onSetIsSound: Dispatch<SetStateAction<boolean>>;
}

const getStoryDate = (date: Date) => {
  date = new Date(date);
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else {
    return format(date, "cccc HH:mm");
  }
};

const Story: FC<StoryProps> = ({
  active,
  story,
  onSetActiveStory,
  onSetNextStory,
  isSound,
  onSetIsSound,
}): JSX.Element => {
  const dispatch = useDispatch();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [durationLineWidth, setDurationLineWidth] = useState<string>("0");

  const authUserId = useSelector(selectAuthUserId);

  const pause = () => {
    setPlaying(false);
    videoRef.current?.pause();
  };

  const play = useCallback(() => {
    if (authUserId && !story.watchers.includes(authUserId)) {
      dispatch(fetchWatchStory({ userId: authUserId, storyId: story._id }));
    }
    setPlaying(true);
    videoRef.current?.play();
  }, [authUserId, story, dispatch]);

  const setVolumeOff = () => {
    if (videoRef.current) {
      onSetIsSound(false);
      videoRef.current.muted = true;
    }
  };

  const setVolumeOn = () => {
    if (videoRef.current) {
      onSetIsSound(true);
      videoRef.current.muted = false;
    }
  };

  const handleEndVideo = () => {
    if (videoRef.current) {
      pause();
      videoRef.current.currentTime = 0;
      onSetNextStory();
    }
  };

  const handleTimeChange = () => {
    if (videoRef.current) {
      setDurationLineWidth(
        (+videoRef.current.currentTime / +videoRef.current.duration) * 100 + "%"
      );
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isSound;
    }
    // eslint-disable-next-line
  }, [videoRef]);

  useEffect(() => {
    if (active) {
      play();
    } else {
      if (videoRef.current) {
        pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [active, play]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isSound;
    }
    // eslint-disable-next-line
  }, [isSound, videoRef]);

  return (
    <li onClick={() => onSetActiveStory(story._id)} className="story__wrapper">
      <div className={classNames("story", { "story--active": active })}>
        <div className="story__video">
          <video
            onEnded={handleEndVideo}
            onTimeUpdate={handleTimeChange}
            ref={videoRef}
            src={story.video}
          />
        </div>
        <div className="story__data">
          <div className="story__data-top">
            <div
              style={{ width: durationLineWidth }}
              className="story__data-duration"
            />
          </div>
          <div className="story__data-bottom">
            <Link to={`/${story.author.username}`} className="story__data-user">
              <Avatar url={story.author.avatar} size={40} />
              <span>{story.author.username}</span>
              <span>{getStoryDate(story.date)}</span>
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
