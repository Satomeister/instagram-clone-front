import React from "react";

export { default as HomePage } from "./HomePage";
export { default as ProfilePage } from "./ProfilePage";
export { default as Main } from "./Main";
export { default as AuthPage } from "./AuthPage";
export { default as PostPage } from "./PostPage";
export { default as ErrorPage } from "./ErrorPage";

export const StoriesPage = React.lazy(() => import("./StoriesPage"));
export const EditProfilePage = React.lazy(() => import("./EditProfilePage"));
export const CreatePostPage = React.lazy(() => import("./CreatePostPage"));
export const CreateStoryPage = React.lazy(() => import("./CreateStoryPage"));
