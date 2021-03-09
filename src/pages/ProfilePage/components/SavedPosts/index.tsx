import React, { FC, useEffect } from "react";
import { BsBookmark as BookmarkIcon } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";

import {
  selectFetchGetSavedPostsLoadingStatus,
  selectSavedPosts,
} from "../../../../store/ducks/authUser/selectors";
import { Preloader } from "../../../../components";
import { fetchGetSavedPosts } from "../../../../store/ducks/authUser/actionCreators";
import { LoadingStatus } from "../../../../store/types";
import PostItem from "../PostItem";

const SavedPosts: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const savedPosts = useSelector(selectSavedPosts);
  const fetchGetSavedPostsLoadingStatus = useSelector(
    selectFetchGetSavedPostsLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchGetSavedPosts());
  }, [dispatch]);

  if (!savedPosts.length) {
    return (
      <div className="profile-posts">
        <div className="empty-saved">
          <div className="empty-saved__icon">
            <BookmarkIcon />
          </div>
          <div className="empty-saved__content">
            <h2>Save</h2>
            <p>
              Save photos and videos that you want to see again. No one is
              notified, and only you can see what you've saved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (fetchGetSavedPostsLoadingStatus === LoadingStatus.LOADING) {
    return (
      <div className="profile-posts">
        <Preloader centered />
      </div>
    );
  }

  return (
    <ul className="profile-posts">
      {savedPosts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default SavedPosts;
