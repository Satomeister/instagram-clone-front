import React, { FC, useRef, useState } from "react";

import "./StoriesList.scss";

import { StoriesListItem } from "./components";
import { ArrowButton } from "../../components";

const BLOCK_WIDTH = 600;
const STORIES_WIDTH = 1500;

const StoriesList: FC = (): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollWidth, setScrollWidth] = useState<number>(0);

  const handleScrollLeft = () => {
    if (listRef.current) {
      if (scrollWidth < BLOCK_WIDTH ) {
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
      setScrollWidth(prev => prev + BLOCK_WIDTH);
    }
  };

  return (
    <div className="stories-list-wrapper">
      <ArrowButton  onClick={handleScrollLeft} direction={"left"} show={scrollWidth !== 0}/>
      <ArrowButton  onClick={handleScrollRight} direction={"right"} show={scrollWidth + BLOCK_WIDTH < STORIES_WIDTH}/>
      <ul ref={listRef} className="stories-list">
        <StoriesListItem username={"ewhogoiw egjweighw"} />
        <StoriesListItem
          username={"qwd fwe"}
          url={
            "https://pbs.twimg.com/profile_images/527818634714828801/SVBuNg8T_400x400.jpeg"
          }
        />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"kwefiwefj"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"kwefiwefj"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"1"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"111111"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"111111"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"111111"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"2"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"111111"} />
        <StoriesListItem username={"kwefiwefj"} watched />
        <StoriesListItem username={"3"} />
      </ul>
    </div>
  );
};

export default StoriesList;
