import produce, { Draft } from "immer";
import { AuthUserActions, AuthUserActionTypes } from "./contracts/actionTypes";
import { IUser } from "./contracts/state";
import { LoadingStatus } from "../../types";
import { IShortPost } from "../posts/contracts/state";

export interface AuthUserState {
  data: IUser | undefined;
  savedPosts: IShortPost[];
  signUpLoadingStatus: LoadingStatus;
  loginLoadingStatus: LoadingStatus;
  logoutLoadingStatus: LoadingStatus;
  getMeLoadingStatus: LoadingStatus;
  editProfileLoadingStatus: LoadingStatus;
  updateAvatarLoadingStatus: LoadingStatus;
  createPostLoadingStatus: LoadingStatus;
  fetchGetSavedPostsLoadingStatus: LoadingStatus;
  signUpError: string;
  loginError: string;
  editProfileError: string;
  getMeError: string;
  createPostError: string;
}

const initialState: AuthUserState = {
  data: undefined,
  savedPosts: [],
  signUpLoadingStatus: LoadingStatus.NEVER,
  loginLoadingStatus: LoadingStatus.NEVER,
  logoutLoadingStatus: LoadingStatus.NEVER,
  getMeLoadingStatus: LoadingStatus.NEVER,
  editProfileLoadingStatus: LoadingStatus.NEVER,
  updateAvatarLoadingStatus: LoadingStatus.NEVER,
  createPostLoadingStatus: LoadingStatus.NEVER,
  fetchGetSavedPostsLoadingStatus: LoadingStatus.NEVER,
  createPostError: "",
  signUpError: "",
  loginError: "",
  editProfileError: "",
  getMeError: "",
};

export const authUserReducer = produce(
  (draft: Draft<AuthUserState>, action: AuthUserActions) => {
    switch (action.type) {
      case AuthUserActionTypes.SET_AUTH_USER_DATA:
        draft.data = action.payload;
        break;
      case AuthUserActionTypes.SET_SIGNUP_LOADING_STATUS:
        draft.signUpLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SET_LOGIN_LOADING_STATUS:
        draft.loginLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SET_LOGOUT_LOADING_STATUS:
        draft.logoutLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SET_GET_ME_LOADING_STATUS:
        draft.getMeLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SET_EDIT_PROFILE_LOADING_STATUS:
        draft.editProfileLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SET_SIGNUP_ERROR:
        draft.signUpError = action.payload;
        break;
      case AuthUserActionTypes.SET_LOGIN_ERROR:
        draft.loginError = action.payload;
        break;
      case AuthUserActionTypes.SET_GET_ME_ERROR:
        draft.getMeError = action.payload;
        break;
      case AuthUserActionTypes.SET_EDIT_PROFILE_ERROR:
        draft.editProfileError = action.payload;
        break;
      case AuthUserActionTypes.SET_UPDATE_AVATAR_LOADING_STATUS:
        draft.updateAvatarLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.UPDATE_AUTH_USER_FOLLOWING:
        if (draft.data) {
          draft.data.following = draft.data.following.some(
            (followingUser) => followingUser._id === action.payload._id
          )
            ? draft.data.following.filter(
                (followingUser) => followingUser._id !== action.payload._id
              )
            : [...draft.data.following, action.payload];
        }
        break;
      case AuthUserActionTypes.SET_FETCH_CREATE_POST_LOADING_STATUS:
        draft.createPostLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SET_CREATE_POST_ERROR:
        draft.createPostError = action.payload;
        break;
      case AuthUserActionTypes.ADD_AUTH_USER_POST:
        draft.data?.posts.push(action.payload);
        break;
      case AuthUserActionTypes.UPDATE_POST_LIKES_COUNT:
        if (draft.data) {
          draft.data.posts = draft.data.posts.map((post) => {
            if (post._id === action.payload.postId) {
              post.likesCount += action.payload.value;
            }
            return post;
          });
        }
        break;
      case AuthUserActionTypes.UPDATE_POST_COMMENTS_COUNT:
        if (draft.data) {
          draft.data.posts = draft.data.posts.map((post) => {
            if (post._id === action.payload.postId) {
              post.commentsCount += action.payload.value;
            }
            return post;
          });
        }
        break;
      case AuthUserActionTypes.SET_STORY:
        if (draft.data) {
          draft.data.story = action.payload;
        }
        break;
      case AuthUserActionTypes.SET_SAVED_POSTS:
        draft.savedPosts = action.payload;
        break;
      case AuthUserActionTypes.SET_FETCH_GET_SAVED_POSTS:
        draft.fetchGetSavedPostsLoadingStatus = action.payload;
        break;
      case AuthUserActionTypes.SAVE_POST:
        if (draft.data) {
          draft.data.saved.push(action.payload._id);
        }

        break;
      case AuthUserActionTypes.UNSAVE_POST:
        if (draft.data) {
          draft.data.saved = draft.data.saved.filter(
            (id) => id !== action.payload._id
          );
        }
        break;
      default:
        break;
    }
  },
  initialState
);
