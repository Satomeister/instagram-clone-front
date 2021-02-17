import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { GrClose as CloseIcon } from "react-icons/all";

import { AiOutlineInstagram as InstagramIcon } from "react-icons/all";

import "./UnauthorizedNotification.scss";

const UnauthorizedNotification: FC = (): JSX.Element => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(true);

  return (
    <>
      {notificationOpen && (
        <div className="unauthorized-notification">
          <div className="unauthorized-notification__inner">
            <div>
              <div className="instagram-icon">
                <InstagramIcon />
              </div>
              <div className="unauthorized-notification__inner-content">
                <h3>Log In to Instagram</h3>
                <p>
                  Log in to see photos and videos from friends and discover
                  other accounts you'll love.
                </p>
              </div>
            </div>
            <div className="unauthorized-notification__inner-actions">
              <Link to="/auth/signin" className="button primary-button">
                Log In
              </Link>
              <Link to="/auth/signup" className="button">
                Sign Up
              </Link>
            </div>
          </div>
          <button
            onClick={() => setNotificationOpen(false)}
            className="unauthorized-notification__close-button"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default UnauthorizedNotification;
