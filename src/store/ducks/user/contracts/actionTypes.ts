import {EditProfilePayload, IShortUser, IUser, LoginPayload, SignUpPayload} from "./state";
import { LoadingStatus } from "../../../types";

export enum AuthUserActionTypes {
  FETCH_SIGNUP = "user/FETCH_SIGNUP",
  FETCH_LOGIN = "user/FETCH_LOGIN",
  FETCH_GET_ME = "user/GET_ME",
  FETCH_LOGOUT = 'user/FETCH_LOGOUT',
  SET_AUTH_USER_DATA = "user/SET_AUTH_USER_DATA",
  SET_SIGNUP_LOADING_STATUS = "user/SET_SIGNUP_LOADING_STATUS",
  SET_LOGIN_LOADING_STATUS = "user/SET_LOGIN_LOADING_STATUS",
  SET_LOGOUT_LOADING_STATUS = 'user/SET_FETCH_LOGOUT_STATUS',
  SET_GET_ME_LOADING_STATUS = "user/SET_GET_ME_LOADING_STATUS",
  SET_SIGNUP_ERROR = "user/SET_SIGNUP_ERROR",
  SET_LOGIN_ERROR = "user/SET_LOGIN_ERROR",
  SET_GET_ME_ERROR = "user/SET_GET_ME_ERROR",
  SET_EDIT_PROFILE_ERROR = "user/SET_EDIT_PROFILE_ERROR",
  FETCH_EDIT_PROFILE = "user/FETCH_EDIT_PROFILE",
  SET_EDIT_PROFILE_LOADING_STATUS = "user/SET_EDIT_PROFILE_LOADING_STATUS",
  FETCH_UPDATE_AVATAR = 'user/FETCH_UPDATE_AVATAR',
  SET_UPDATE_AVATAR_LOADING_STATUS = "user/SET_UPDATE_AVATAR_LOADING_STATUS",
  UPDATE_AUTH_USER_FOLLOWING = 'user/UPDATE_AUTH_USER_FOLLOWING'
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
  type: AuthUserActionTypes.FETCH_EDIT_PROFILE,
  payload: EditProfilePayload
}

export interface SetEditProfileLoadingStatusAction {
  type: AuthUserActionTypes.SET_EDIT_PROFILE_LOADING_STATUS,
  payload: LoadingStatus
}

export interface FetchUpdateAvatarAction {
  type: AuthUserActionTypes.FETCH_UPDATE_AVATAR,
  payload: FormData | null
}

export interface SetUpdateAvatarLoadingStatusAction {
  type: AuthUserActionTypes.SET_UPDATE_AVATAR_LOADING_STATUS,
  payload: LoadingStatus
}

export interface UpdateAuthUserFollowingAction {
  type: AuthUserActionTypes.UPDATE_AUTH_USER_FOLLOWING,
  payload: IShortUser
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
  | UpdateAuthUserFollowingAction;