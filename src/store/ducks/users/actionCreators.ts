import {
  FetchFollowAction,
  FetchGetSuggestionsAction,
  FetchGetUserAction,
  FetchUnFollowAction,
  FollowAction,
  SetFetchGetUserLoadingStatusAction,
  SetGetUserErrorAction,
  SetSuggestionsAction,
  SetUserAction,
  UnFollowAction,
  UsersActionTypes,
} from "./contracts/actionTypes";
import { IShortUser, IUser } from "../authUser/contracts/state";
import { LoadingStatus } from "../../types";
import { updateFollowPayload } from "./contracts/state";

export const fetchGetUser = (payload: string): FetchGetUserAction => ({
  type: UsersActionTypes.FETCH_GET_USER,
  payload,
});

export const setUser = (payload: IUser): SetUserAction => ({
  type: UsersActionTypes.SET_USER,
  payload,
});

export const setGetUserError = (payload: string): SetGetUserErrorAction => ({
  type: UsersActionTypes.SET_GET_USER_ERROR,
  payload,
});

export const setFetchGetUserLoadingStatus = (
  payload: LoadingStatus
): SetFetchGetUserLoadingStatusAction => ({
  type: UsersActionTypes.SET_FETCH_GET_USER_LOADING_STATUS,
  payload,
});

export const fetchFollow = (payload: string): FetchFollowAction => ({
  type: UsersActionTypes.FETCH_FOLLOW,
  payload,
});

export const fetchUnFollow = (payload: string): FetchUnFollowAction => ({
  type: UsersActionTypes.FETCH_UNFOLLOW,
  payload,
});

export const follow = (payload: updateFollowPayload): FollowAction => ({
  type: UsersActionTypes.FOLLOW,
  payload,
});

export const unFollow = (payload: updateFollowPayload): UnFollowAction => ({
  type: UsersActionTypes.UNFOLLOW,
  payload,
});

export const fetchGetSuggestions = (): FetchGetSuggestionsAction => ({
  type: UsersActionTypes.FETCH_GET_SUGGESTIONS,
});

export const setSuggestions = (
  payload: IShortUser[]
): SetSuggestionsAction => ({
  type: UsersActionTypes.SET_SUGGESTIONS,
  payload,
});
