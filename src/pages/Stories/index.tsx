import React, { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineInstagram as InstagramIcon,
  GrClose as CloseIcon,
} from "react-icons/all";

import "./Stories.scss";

import { Story } from "../../components";

const Stories: FC = (): JSX.Element => {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeStory, setActiveStory] = useState<string>("1");
  const [isSound, setIsSound] = useState<boolean>(true);

  const stories = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
  ];

  return (
    <div className="stories-page">
      <Link to="/" className="stories-page__instagram-icon">
        <InstagramIcon />
      </Link>
      <Link to="/" className="stories-page__close-icon">
        <CloseIcon />
      </Link>
      <div className="stories-page__list-wrapper">
        <ul
          style={{ transform: `translateX(${-activeStory * 30}vh)` }}
          ref={listRef}
          className="stories-page__list"
        >
          {stories.map((story) => {
            return (
              <Story
                id={story.id}
                key={story.id}
                active={story.id === activeStory}
                handleSetActiveStory={setActiveStory}
                isSound={isSound}
                setIsSound={setIsSound}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Stories;
