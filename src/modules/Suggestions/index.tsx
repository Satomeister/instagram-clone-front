import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Suggestions.scss";

import {
  fetchFollow,
  fetchGetSuggestions,
  fetchUnFollow,
} from "../../store/ducks/users/actionCreators";
import { selectSuggestions } from "../../store/ducks/users/selector";
import { isFollowing } from "../../utils";
import { selectAuthUserData } from "../../store/ducks/authUser/selectors";
import Avatar from "../../components/Avatar";

const Suggestions: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const suggestions = useSelector(selectSuggestions);
  const authUser = useSelector(selectAuthUserData);

  useEffect(() => {
    dispatch(fetchGetSuggestions());
  }, [dispatch]);

  const handleFollow = (id: string) => {
    dispatch(fetchFollow(id));
  };

  const handleUnFollow = (id: string) => {
    dispatch(fetchUnFollow(id));
  };

  return (
    <div className="suggestions">
      <h3 className="suggestions__title">Suggestions For You</h3>
      <ul className="suggestions__list">
        {suggestions.map((user) => (
          <li key={user._id} className="suggestions__item">
            <Link to={`/${user.username}`} className="suggestions__item-inner">
              <Avatar url={user.avatar} story={user.story} />
              <div className="suggestions__item-inner-data">
                <span className="suggestions__item-inner-name">
                  {user.username}
                </span>
                <span className="suggestions__item-inner-text">
                  Instagram recommended
                </span>
              </div>
            </Link>
            {isFollowing(authUser, user._id) ? (
              <button
                onClick={() => handleUnFollow(user._id)}
                style={{ color: "#888888" }}
                className="button"
              >
                Following
              </button>
            ) : (
              <button onClick={() => handleFollow(user._id)} className="button">
                Follow
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
