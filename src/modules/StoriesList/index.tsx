import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./StoriesList.scss";

import { StoriesListItem } from "./components";
import { ArrowButton } from "../../components";
import { fetchGetStories } from "../../store/ducks/stories/actionCreators";
import {
  selectFetchGetStoriesLoadingStatus,
  selectStories,
} from "../../store/ducks/stories/selector";
import { LoadingStatus } from "../../store/types";
import { selectAuthUserId } from "../../store/ducks/authUser/selectors";

const BLOCK_WIDTH = 600;
const STORIES_WIDTH = 1500;

const StoriesList: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const listRef = useRef<HTMLUListElement>(null);

  const [scrollWidth, setScrollWidth] = useState<number>(0);

  const authUserId = useSelector(selectAuthUserId);
  const stories = useSelector(selectStories(""));
  const fetchGetStoriesLoadingStatus = useSelector(
    selectFetchGetStoriesLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchGetStories());
  }, [dispatch]);

  const handleScrollLeft = () => {
    if (listRef.current) {
      if (scrollWidth < BLOCK_WIDTH) {
        listRef.current.scroll(0, 0);
        setScrollWidth(0);
      } else {
        listRef.current.scroll(scrollWidth - BLOCK_WIDTH, 0);
        setScrollWidth((prev) => prev - BLOCK_WIDTH);
      }
    }
  };

  const handleScrollRight = () => {
    if (listRef.current) {
      listRef.current.scroll(scrollWidth + BLOCK_WIDTH, 0);
      setScrollWidth((prev) => prev + BLOCK_WIDTH);
    }
  };

  return (
    <div className="stories-list-wrapper">
      <ArrowButton
        onClick={handleScrollLeft}
        direction={"left"}
        show={scrollWidth !== 0}
      />
      <ArrowButton
        onClick={handleScrollRight}
        direction={"right"}
        show={!!scrollWidth && scrollWidth + BLOCK_WIDTH < STORIES_WIDTH}
      />
      {!!stories.length ||
      fetchGetStoriesLoadingStatus === LoadingStatus.LOADING ? (
        <ul ref={listRef} className="stories-list">
          {stories
            .filter(
              (story) => authUserId && !story.watchers.includes(authUserId)
            )
            .map((story) => {
              return <StoriesListItem key={story._id} story={story} />;
            })}
          {stories
            .filter(
              (story) => authUserId && story.watchers.includes(authUserId)
            )
            .map((story) => {
              return <StoriesListItem key={story._id} story={story} />;
            })}
        </ul>
      ) : (
        <ul ref={listRef} className="stories-list">
          <p className="stories-list__empty-text">
            Here will be stories of your friends
          </p>
        </ul>
      )}
    </div>
  );
};

export default StoriesList;
