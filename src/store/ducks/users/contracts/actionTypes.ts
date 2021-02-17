import {IShortUser, IUser} from "../../user/contracts/state";
import { LoadingStatus } from "../../../types";
import {updateFollowPayload} from "./state";

export enum UsersActionTypes {
  FETCH_GET_USER = "users/FETCH_GET_USER",
  SET_USER = "users/SET_USER",
  SET_FETCH_GET_USER_LOADING_STATUS = "users/SET_FETCH_GET_USER_LOADING_STATUS",
  FETCH_FOLLOW = "users/FETCH_FOLLOW",
  FETCH_UNFOLLOW = "users/FETCH_UNFOLLOW",
  FOLLOW = 'user/FOLLOW',
  UNFOLLOW = 'user/UNFOLLOW'
}

export interface FetchGetUserAction {
  type: UsersActionTypes.FETCH_GET_USER;
  payload: string;
}

export interface SetUserAction {
  type: UsersActionTypes.SET_USER;
  payload: IUser;
}

export interface SetFetchGetUserLoadingStatusAction {
  type: UsersActionTypes.SET_FETCH_GET_USER_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchFollowAction {
  type: UsersActionTypes.FETCH_FOLLOW;
  payload: string;
}

export interface FetchUnFollowAction {
  type: UsersActionTypes.FETCH_UNFOLLOW;
  payload: string;
}

export interface FollowAction {
  type: UsersActionTypes.FOLLOW;
  payload: updateFollowPayload;
}

export interface UnFollowAction {
  type: UsersActionTypes.UNFOLLOW;
  payload: updateFollowPayload;
}

export type UsersActions =
  | FetchGetUserAction
  | SetUserAction
  | SetFetchGetUserLoadingStatusAction
  | FetchFollowAction
  | FetchUnFollowAction
  | FollowAction
  | UnFollowAction;