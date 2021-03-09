import { AppState } from "../../rootReducer";
import { IPost } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const selectSelectedPost = (state: AppState): IPost | undefined =>
  state.posts.selectedPost;

export const selectPosts = (state: AppState): IPost[] => state.posts.posts;

export const selectFetchGetPostsLoadingStatus = (
  state: AppState
): LoadingStatus => state.posts.fetchGetPostsLoadingStatus;

export const selectFetchCommentPostLoadingStatus = (
  state: AppState
): LoadingStatus => state.posts.fetchCommentPostLoadingStatus;

export const selectFetchGetNewCommentsChunkLoadingStatus = (
  state: AppState
): LoadingStatus => state.posts.fetchGetNewChunkLoadingStatus;

export const selectFetchGetSelectedPostLoadingStatus = (
  state: AppState
): LoadingStatus => state.posts.fetchGetSelectedPostLoadingStatus;

export const selectFetchReplyCommentLoadingStatus = (
  state: AppState
): LoadingStatus => state.posts.fetchReplyCommentLoadingStatus;

export const selectGetSelectedPostError = (state: AppState): string =>
  state.posts.getSelectedPostError;
