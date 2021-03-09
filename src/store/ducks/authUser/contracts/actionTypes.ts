import {
  EditProfilePayload,
  CreatePostPayload,
  IShortUser,
  IUser,
  LoginPayload,
  SignUpPayload,
  UpdatePostLikesCountPayload,
} from "./state";
import { LoadingStatus } from "../../../types";
import { IStory } from "../../stories/contracts/state";
import { IShortPost } from "../../posts/contracts/state";

export enum AuthUserActionTypes {
  FETCH_SIGNUP = "user/FETCH_SIGNUP",
  FETCH_LOGIN = "user/FETCH_LOGIN",
  FETCH_GET_ME = "user/GET_ME",
  FETCH_LOGOUT = "user/FETCH_LOGOUT",
  SET_AUTH_USER_DATA = "user/SET_AUTH_USER_DATA",
  SET_SIGNUP_LOADING_STATUS = "user/SET_SIGNUP_LOADING_STATUS",
  SET_LOGIN_LOADING_STATUS = "user/SET_LOGIN_LOADING_STATUS",
  SET_LOGOUT_LOADING_STATUS = "user/SET_FETCH_LOGOUT_STATUS",
  SET_GET_ME_LOADING_STATUS = "user/SET_GET_ME_LOADING_STATUS",
  SET_SIGNUP_ERROR = "user/SET_SIGNUP_ERROR",
  SET_LOGIN_ERROR = "user/SET_LOGIN_ERROR",
  SET_GET_ME_ERROR = "user/SET_GET_ME_ERROR",
  SET_EDIT_PROFILE_ERROR = "user/SET_EDIT_PROFILE_ERROR",
  FETCH_EDIT_PROFILE = "user/FETCH_EDIT_PROFILE",
  SET_EDIT_PROFILE_LOADING_STATUS = "user/SET_EDIT_PROFILE_LOADING_STATUS",
  FETCH_UPDATE_AVATAR = "user/FETCH_UPDATE_AVATAR",
  SET_UPDATE_AVATAR_LOADING_STATUS = "user/SET_UPDATE_AVATAR_LOADING_STATUS",
  UPDATE_AUTH_USER_FOLLOWING = "user/UPDATE_AUTH_USER_FOLLOWING",
  FETCH_CREATE_POST = "user/FETCH_CREATE_POST",
  ADD_AUTH_USER_POST = "user/ADD_POST",
  SET_FETCH_CREATE_POST_LOADING_STATUS = "user/SET_FETCH_CREATE_POST_LOADING_STATUS",
  SET_CREATE_POST_ERROR = "user/SET_FETCH_CREATE_POST_ERROR",
  UPDATE_POST_LIKES_COUNT = "user/UPDATE_POST_LIKES_COUNT",
  UPDATE_POST_COMMENTS_COUNT = "user/UPDATE_POST_COMMENTS_COUNT",
  SET_STORY = "user/SET_STORY",
  FETCH_GET_SAVED_POSTS = "user/FETCH_GET_SAVED_POSTS",
  SET_SAVED_POSTS = "user/SET_SAVED_POSTS",
  SET_FETCH_GET_SAVED_POSTS = "user/SET_FETCH_GET_SAVED_POSTS",
  FETCH_SAVE_POST = "user/FETCH_SAVE_POST",
  SAVE_POST = "user/SAVE_POST",
  FETCH_UNSAVE_POST = "user/FETCH_UNSAVE_POST",
  UNSAVE_POST = "user/UNSAVE_POST",
}

export interface FetchSignUpAction {
  type: AuthUserActionTypes.FETCH_SIGNUP;
  payload: SignUpPayload;
}

export interface FetchLoginAction {
  type: AuthUserActionTypes.FETCH_LOGIN;
  payload: LoginPayload;
}

export interface FetchLogoutAction {
  type: AuthUserActionTypes.FETCH_LOGOUT;
}

export interface FetchGetMeAction {
  type: AuthUserActionTypes.FETCH_GET_ME;
}

export interface SetAuthUserDataAction {
  type: AuthUserActionTypes.SET_AUTH_USER_DATA;
  payload: IUser | undefined;
}

export interface SetSignUpLoadingStatusAction {
  type: AuthUserActionTypes.SET_SIGNUP_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface SetLoginLoadingStatusAction {
  type: AuthUserActionTypes.SET_LOGIN_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface SetGetMeLoadingStatusAction {
  type: AuthUserActionTypes.SET_GET_ME_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface SetLogoutLoadingStatusAction {
  type: AuthUserActionTypes.SET_LOGOUT_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface SetSignUpErrorAction {
  type: AuthUserActionTypes.SET_SIGNUP_ERROR;
  payload: string;
}

export interface SetLoginErrorAction {
  type: AuthUserActionTypes.SET_LOGIN_ERROR;
  payload: string;
}

export interface SetGetMeErrorAction {
  type: AuthUserActionTypes.SET_GET_ME_ERROR;
  payload: string;
}

export interface SetEditProfileErrorAction {
  type: AuthUserActionTypes.SET_EDIT_PROFILE_ERROR;
  payload: string;
}

export interface FetchEditProfileAction {
  type: AuthUserActionTypes.FETCH_EDIT_PROFILE;
  payload: EditProfilePayload;
}

export interface SetEditProfileLoadingStatusAction {
  type: AuthUserActionTypes.SET_EDIT_PROFILE_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchUpdateAvatarAction {
  type: AuthUserActionTypes.FETCH_UPDATE_AVATAR;
  payload: FormData | null;
}

export interface SetUpdateAvatarLoadingStatusAction {
  type: AuthUserActionTypes.SET_UPDATE_AVATAR_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface UpdateAuthUserFollowingAction {
  type: AuthUserActionTypes.UPDATE_AUTH_USER_FOLLOWING;
  payload: IShortUser;
}

export interface FetchCreatePostAction {
  type: AuthUserActionTypes.FETCH_CREATE_POST;
  payload: CreatePostPayload;
}

export interface SetFetchCreatePostLoadingStatusAction {
  type: AuthUserActionTypes.SET_FETCH_CREATE_POST_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface SetCreatePostErrorAction {
  type: AuthUserActionTypes.SET_CREATE_POST_ERROR;
  payload: string;
}

export interface AddAuthUserPostAction {
  type: AuthUserActionTypes.ADD_AUTH_USER_POST;
  payload: IShortPost;
}

export interface UpdatePostLikesCountAction {
  type: AuthUserActionTypes.UPDATE_POST_LIKES_COUNT;
  payload: UpdatePostLikesCountPayload;
}

export interface UpdatePostCommentsCountAction {
  type: AuthUserActionTypes.UPDATE_POST_COMMENTS_COUNT;
  payload: UpdatePostLikesCountPayload;
}

export interface SetStoryAction {
  type: AuthUserActionTypes.SET_STORY;
  payload: IStory;
}

export interface FetchGetSavedPostsAction {
  type: AuthUserActionTypes.FETCH_GET_SAVED_POSTS;
}

export interface SetSavedPostsAction {
  type: AuthUserActionTypes.SET_SAVED_POSTS;
  payload: IShortPost[];
}

export interface SetFetchGetSavedPostsAction {
  type: AuthUserActionTypes.SET_FETCH_GET_SAVED_POSTS;
  payload: LoadingStatus;
}

export interface FetchSavePostAction {
  type: AuthUserActionTypes.FETCH_SAVE_POST;
  payload: IShortPost;
}

export interface SavePostAction {
  type: AuthUserActionTypes.SAVE_POST;
  payload: IShortPost;
}

export interface FetchUnSavePostAction {
  type: AuthUserActionTypes.FETCH_UNSAVE_POST;
  payload: IShortPost;
}

export interface UnSavePostAction {
  type: AuthUserActionTypes.UNSAVE_POST;
  payload: IShortPost;
}

export type AuthUserActions =
  | FetchSignUpAction
  | FetchLoginAction
  | FetchLogoutAction
  | SetAuthUserDataAction
  | SetSignUpLoadingStatusAction
  | SetLoginLoadingStatusAction
  | SetGetMeLoadingStatusAction
  | SetLogoutLoadingStatusAction
  | SetSignUpErrorAction
  | SetLoginErrorAction
  | SetGetMeErrorAction
  | SetEditProfileErrorAction
  | FetchEditProfileAction
  | SetEditProfileLoadingStatusAction
  | FetchUpdateAvatarAction
  | SetUpdateAvatarLoadingStatusAction
  | UpdateAuthUserFollowingAction
  | FetchCreatePostAction
  | SetFetchCreatePostLoadingStatusAction
  | SetCreatePostErrorAction
  | AddAuthUserPostAction
  | UpdatePostLikesCountAction
  | UpdatePostCommentsCountAction
  | SetStoryAction
  | FetchGetSavedPostsAction
  | SetSavedPostsAction
  | SetFetchGetSavedPostsAction
  | FetchSavePostAction
  | SavePostAction
  | FetchUnSavePostAction
  | UnSavePostAction;
