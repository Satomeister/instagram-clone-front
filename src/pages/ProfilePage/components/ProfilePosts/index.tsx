import React, { FC } from "react";
import { Link } from "react-router-dom";

import profilePostsImage from "../../../../assets/profile-post-image.jpg";

import { IShortPost } from "../../../../store/ducks/posts/contracts/state";
import PostItem from "../PostItem";

interface ProfilePostsProps {
  posts: IShortPost[];
}

const ProfilePosts: FC<ProfilePostsProps> = ({ posts }): JSX.Element => {
  if (!posts.length) {
    return (
      <div className="profile-posts">
        <div className="empty-posts">
          <img
            className="empty-posts__image"
            src={profilePostsImage}
            alt="posts"
          />
          <div className="empty-posts__content">
            <h2>Start capturing and sharing your moments.</h2>
            <Link to="/post/create" className="button primary-button">
              Share you photo or video
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="profile-posts">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default ProfilePosts;
