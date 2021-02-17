import React, { FC, useState } from "react";
import {
  BsHeart as HeartIcon,
  BsHeartFill as HeartIconFilled,
} from "react-icons/bs";
import Box from "../../../Box";

import "./ActivityBar.scss";



const ActivityBar: FC = (): JSX.Element => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setNotificationOpen(true)}
        style={{ position: "relative" }}
        className="header-navigation__item"
      >
        {notificationOpen ? (
          <>
            <HeartIconFilled />
            <div className="arrow-bottom">
              <div className="arrow-bottom__inner" />
            </div>
          </>
        ) : (
          <HeartIcon />
        )}
      </div>
      {notificationOpen && (
        <Box width={500} height={240} setBoxOpen={setNotificationOpen}>
          <div className="activity-bar-empty">
            <div className="activity-bar-empty__icon">
              <HeartIcon />
            </div>
            <p>Activity On Your Posts</p>
            <p>
              When someone likes or comments on one of your posts, you'll see it
              here.
            </p>
          </div>
        </Box>
      )}
    </>
  );
};
export default ActivityBar;
