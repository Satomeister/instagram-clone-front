import React, { FC, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Home.scss";

import { Post, StoriesList, Suggestions } from "../../modules";
import { UserItem } from "../../components";
import {
  selectIsAuth,
  selectAuthUserData,
} from "../../store/ducks/authUser/selectors";
import { fetchGetPosts } from "../../store/ducks/posts/actionCreators";
import {
  selectFetchGetPostsLoadingStatus,
  selectPosts,
} from "../../store/ducks/posts/selector";
import { LoadingStatus } from "../../store/types";

const HomePage: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectAuthUserData);
  const posts = useSelector(selectPosts);
  const getPostsLoadingStatus = useSelector(selectFetchGetPostsLoadingStatus);

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [dispatch]);

  if (!isAuth) {
    return <Redirect to={"/auth/signin"} />;
  }

  return (
    <div className="home">
      <div className="home__content">
        <StoriesList />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {getPostsLoadingStatus === LoadingStatus.SUCCESS && posts.length === 0 && (
          <div>
            <span>Follow someone to see Posts</span>
          </div>
        )}
      </div>
      <div className="home__user">
        {userData && (
          <UserItem
            user={userData}
            avatarSize={56}
            withFullname
            withPadding={false}
          />
        )}
        <Suggestions />
      </div>
    </div>
  );
};

export default HomePage;
