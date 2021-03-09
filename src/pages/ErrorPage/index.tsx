import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage: FC = (): JSX.Element => {
  useEffect(() => {
    document.title = `Page Not Found • Instagram`;
  }, []);

  return (
    <div className="error-page">
      <h2>Sorry, this page isn't available.</h2>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <Link to={"/"}>Go back to Instagram.</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
