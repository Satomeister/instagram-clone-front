import produce, { Draft } from "immer";
import { UsersActions, UsersActionTypes } from "./contracts/actionTypes";
import { IShortUser, IUser } from "../authUser/contracts/state";
import { LoadingStatus } from "../../types";

export interface UsersState {
  user: IUser | undefined;
  suggestions: IShortUser[];
  setFetchGetUserAction: LoadingStatus;
  getUserError: string;
}

const initialState: UsersState = {
  user: undefined,
  suggestions: [],
  setFetchGetUserAction: LoadingStatus.NEVER,
  getUserError: "",
};

export const usersReducer = produce(
  (draft: Draft<UsersState>, action: UsersActions) => {
    switch (action.type) {
      case UsersActionTypes.SET_USER:
        draft.user = action.payload;
        break;
      case UsersActionTypes.SET_FETCH_GET_USER_LOADING_STATUS:
        draft.setFetchGetUserAction = action.payload;
        break;
      case UsersActionTypes.SET_GET_USER_ERROR:
        draft.getUserError = action.payload;
        break;
      case UsersActionTypes.FOLLOW:
        if (draft.user?._id === action.payload.user._id) {
          draft.user.followers.push(action.payload.authUserData);
        }
        break;
      case UsersActionTypes.UNFOLLOW:
        if (draft.user?._id === action.payload.user._id) {
          draft.user.followers = draft.user.followers.filter(
            (follower) => follower._id !== action.payload.authUserData._id
          );
        }
        break;
      case UsersActionTypes.SET_SUGGESTIONS:
        draft.suggestions = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);
