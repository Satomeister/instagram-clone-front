import React, { FC } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

import "./ReplyText.scss";

interface ReplyTextProps {
  text: string;
}

const ReplyText: FC<ReplyTextProps> = ({ text }): JSX.Element => {
  const parsedText = reactStringReplace(text, /(@\w+)/, (value, n) => (
    <Link key={n} to={`/${value.slice(1)}`}>
      {" "}
      {value}{" "}
    </Link>
  ));

  return (
    <div className="reply__text">
      <span>{parsedText}</span>
    </div>
  );
};

export default ReplyText;
