import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import "./FullComment.scss";

import { Avatar } from "../index";

const FullComment: FC = (): JSX.Element => {
  const [repliesOpen, setRepliesOpen] = useState<boolean>(false);

  return (
    <li className="fullcomment">
      <Link className="fullcomment__avatar" to={"/"}>
        <Avatar />
      </Link>
      <div className="fullcomment__inner">
        <div className="fullcomment__content">
          <Link to={"/"} className="fullcomment__username">
            jfiowejf oi{" "}
          </Link>
          <span>
            eifoahfiawjefawio;fjkawfio;aefjawifo;lwjefueikjghesguesnjgo
          </span>
        </div>
        <div className="fullcomment__data">
          <span>5w</span>
          {1 && <span>4 likes</span>}
          <button>Reply</button>
        </div>
        {repliesOpen ? (
          <button
            onClick={() => setRepliesOpen(false)}
            className="fullcomment__more-button"
          >
            Hide replies
          </button>
        ) : (
          <button
            onClick={() => setRepliesOpen(true)}
            className="fullcomment__more-button"
          >
            View replies ({3})
          </button>
        )}
        {repliesOpen && (
          <ul className="fullcomment__replies">
            <li className="fullcomment">
              <Link className="fullcomment__avatar" to={"/"}>
                <Avatar />
              </Link>
              <div className="fullcomment__inner">
                <div className="fullcomment__content">
                  <Link to={"/"} className="fullcomment__username">
                    ponomarev
                  </Link>
                  <div className="fullcomment__text">
                    <Link to={"/username"}>@ponomarev</Link>
                    <span>fwe</span>
                  </div>
                </div>
                <div className="fullcomment__data">
                  <span>5w</span>
                  {1 && <span>4 likes</span>}
                  <button>Reply</button>
                </div>
              </div>
            </li>
            <li className="fullcomment">
              <Link className="fullcomment__avatar" to={"/"}>
                <Avatar />
              </Link>
              <div className="fullcomment__inner">
                <div className="fullcomment__content">
                  <Link to={"/"} className="fullcomment__username">
                    ponomarev
                  </Link>
                  <div className="fullcomment__text">
                    <Link to={"/username"}>@ponomarev</Link>
                    <span>fwe</span>
                  </div>
                </div>
                <div className="fullcomment__data">
                  <span>5w</span>
                  <button>Reply</button>
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
};

export default FullComment;
