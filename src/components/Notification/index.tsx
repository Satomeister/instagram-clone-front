import React, { FC } from "react";

import "./Notification.scss";

interface NotificationProps {
  text: string;
}

const Notification: FC<NotificationProps> = ({ text }): JSX.Element => {
  return (
    <>
      {!!text && (
        <div className="notification">
          <p className="notification__text">{text}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
