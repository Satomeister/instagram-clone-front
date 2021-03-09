import React, { FC } from "react";

import "./StoriesListItem.scss";

import { Avatar } from "../../../../components";
import { IStory } from "../../../../store/ducks/stories/contracts/state";

interface StoriesListItemProps {
  story: IStory;
}

const StoriesListItem: FC<StoriesListItemProps> = ({ story }): JSX.Element => {
  return (
    <li className="story-item">
      <Avatar size={56} url={story.author.avatar} story={story} />
      <div className="story-item__username">{story.author.username}</div>
    </li>
  );
};

export default StoriesListItem;
