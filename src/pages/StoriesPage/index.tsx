import React, { FC, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineInstagram as InstagramIcon,
  GrClose as CloseIcon,
} from "react-icons/all";

import "./Stories.scss";

import { Story } from "../../components";
import {
  selectFetchGetStoriesLoadingStatus,
  selectStories,
} from "../../store/ducks/stories/selector";
import { LoadingStatus } from "../../store/types";
import { fetchGetStoryById } from "../../store/ducks/stories/actionCreators";

interface StoriesPageProps {
  location?: { state: { prevPath: string } };
}

const StoriesPage: FC<StoriesPageProps> = ({ location }): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { storyId } = useParams<{ storyId: string }>();

  const listRef = useRef<HTMLUListElement>(null);

  const [activeStory, setActiveStory] = useState<string>("");
  const [isSound, setIsSound] = useState<boolean>(true);

  const stories = useSelector(selectStories(storyId));
  const getStoriesLoadingStatus = useSelector(
    selectFetchGetStoriesLoadingStatus
  );

  useEffect(() => {
    if (getStoriesLoadingStatus === LoadingStatus.NEVER) {
      dispatch(fetchGetStoryById(storyId));
    }
  }, [dispatch, getStoriesLoadingStatus, storyId]);

  useEffect(() => {
    setActiveStory(storyId);
  }, [storyId]);

  const handleSetNextStory = () => {
    setActiveStory((prev) => {
      const nextStory = stories[stories.map((s) => s._id).indexOf(prev) + 1];
      if (nextStory) {
        return nextStory._id;
      } else {
        return prev;
      }
    });
  };

  const handleBackLocation = () => {
    if (location) {
      if (location.state?.prevPath) {
        history.push(location.state.prevPath);
      } else {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  };

  return (
    <div className="stories-page">
      <div
        onClick={handleBackLocation}
        className="stories-page__instagram-icon"
      >
        <InstagramIcon />
      </div>
      <div onClick={handleBackLocation} className="stories-page__close-icon">
        <CloseIcon />
      </div>
      <div className="stories-page__list-wrapper">
        <ul
          style={{
            transform: `translateX(${
              -stories.map((s) => s._id).indexOf(activeStory) * 30 - 30
            }vh)`,
          }}
          ref={listRef}
          className="stories-page__list"
        >
          {stories.map((story) => {
            return (
              <Story
                key={story._id}
                story={story}
                active={story._id === activeStory}
                onSetActiveStory={setActiveStory}
                onSetNextStory={handleSetNextStory}
                isSound={isSound}
                onSetIsSound={setIsSound}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StoriesPage;
