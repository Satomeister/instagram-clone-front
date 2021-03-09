import { AppState } from "../../rootReducer";
import { IUser } from "./contracts/state";
import { LoadingStatus } from "../../types";
import { IStory } from "../stories/contracts/state";
import { IShortPost } from "../posts/contracts/state";

export const selectAuthUserData = (state: AppState): IUser | undefined =>
  state.authUser.data;

export const selectAuthUserStory = (state: AppState): IStory | undefined =>
  selectAuthUserData(state)?.story;

export const selectSavedPosts = (state: AppState): IShortPost[] =>
  state.authUser.savedPosts;

export const selectFetchGetSavedPostsLoadingStatus = (
  state: AppState
): LoadingStatus => state.authUser.fetchGetSavedPostsLoadingStatus;

export const selectAuthUserId = (state: AppState): string | undefined =>
  selectAuthUserData(state)?._id;

export const selectIsAuth = (state: AppState): boolean => !!state.authUser.data;

export const selectSignUpLoadingStatus = (state: AppState): LoadingStatus =>
  state.authUser.signUpLoadingStatus;

export const selectLoginLoadingStatus = (state: AppState): LoadingStatus =>
  state.authUser.loginLoadingStatus;

export const selectLogoutLoadingStatus = (state: AppState): LoadingStatus =>
  state.authUser.logoutLoadingStatus;

export const selectGetMeLoadingStatus = (state: AppState): LoadingStatus =>
  state.authUser.getMeLoadingStatus;

export const selectUpdateAvatarLoadingStatus = (
  state: AppState
): LoadingStatus => state.authUser.updateAvatarLoadingStatus;

export const selectEditProfileLoadingStatus = (
  state: AppState
): LoadingStatus => state.authUser.editProfileLoadingStatus;

export const selectCreatePostLoadingStatus = (state: AppState): LoadingStatus =>
  state.authUser.createPostLoadingStatus;

export const selectSignUpError = (state: AppState): string =>
  state.authUser.signUpError;

export const selectLoginError = (state: AppState): string =>
  state.authUser.loginError;

export const selectGetMeError = (state: AppState): string =>
  state.authUser.getMeError;

export const selectEditProfileError = (state: AppState): string =>
  state.authUser.editProfileError;

export const selectCreatePostError = (state: AppState): string =>
  state.authUser.createPostError;
