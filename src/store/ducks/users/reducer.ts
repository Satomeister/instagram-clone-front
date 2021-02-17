import produce, {Draft} from "immer";
import {UsersActions, UsersActionTypes} from "./contracts/actionTypes";
import {IUser} from "../user/contracts/state";
import {LoadingStatus} from "../../types";

export interface UsersState {
  user: IUser | undefined,
  setFetchGetUserAction: LoadingStatus
}

const initialState: UsersState = {
  user: undefined,
  setFetchGetUserAction: LoadingStatus.NEVER
}

export const usersReducer = produce((draft:Draft<UsersState>, action: UsersActions) => {
  switch (action.type) {
    case UsersActionTypes.SET_USER:
      draft.user = action.payload;
      break;
    case UsersActionTypes.SET_FETCH_GET_USER_LOADING_STATUS:
      draft.setFetchGetUserAction = action.payload;
      break;
    case UsersActionTypes.FOLLOW:
      if (draft.user?._id === action.payload.user._id) {
        draft.user.followers.push(action.payload.authUserData)
      }
      break;
    case UsersActionTypes.UNFOLLOW:
      if (draft.user?._id === action.payload.user._id) {
        draft.user.followers = draft.user.followers.filter(follower => follower._id !== action.payload.authUserData._id)
      }
      break;
    default:
      break;
  }
}, initialState)