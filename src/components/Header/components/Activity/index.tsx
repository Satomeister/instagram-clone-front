import React, { FC } from "react";
import { Link } from "react-router-dom";

import { formatDistanceToNowStrict } from "date-fns";

import "./Activity.scss";

import { IActivity } from "../../../../store/ducks/activities/contracts/state";
import UserItem from "../../../UserItem";

interface ActivityProps {
  activity: IActivity;
}

const Activity: FC<ActivityProps> = ({ activity }) => {
  return (
    <li className="activity">
      <div className="activity__data">
        <UserItem withFullname={false} user={activity.user} avatarSize={44} />
        {activity.type === "like" ? (
          <span>liked your photo.</span>
        ) : (
          <span>commented: {activity.comment?.text}</span>
        )}
        <span className="activity__date">
          {formatDistanceToNowStrict(new Date(activity.createdAt))}
        </span>
      </div>
      <Link to={`/post/${activity.post._id}`}>
        {activity.post.media[0].type === "video" ? (
          <video className="activity__image" src={activity.post.media[0].url} />
        ) : (
          <img
            className="activity__image"
            src={activity.post.media[0].url}
            alt=""
          />
        )}
      </Link>
    </li>
  );
};

export default Activity;
