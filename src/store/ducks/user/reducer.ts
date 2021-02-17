import produce, { Draft } from "immer";
import { AuthUserActions, AuthUserActionTypes } from "./contracts/actionTypes";
import { IUser } from "./contracts/state";
import { LoadingStatus } from "../../types";

export interface AuthUserState {
  data: IUser | undefined;
  signUpLoadingStatus: LoadingStatus;
  loginLoadingStatus: LoadingStatus;
  logoutLoadingStatus: LoadingStatus;
  getMeLoadingStatus: LoadingStatus;
  editProfileLoadingStatus: LoadingStatus;
  updateAvatarLoadingStatus: LoadingStatus;
  signUpError: string;
  loginError: string;
  editProfileError: string;
  getMeError: string;
}

const initialState: AuthUserState = {
  data: undefined,
  signUpLoadingStatus: LoadingStatus.NEVER,
  loginLoadingStatus: LoadingStatus.NEVER,
  logoutLoadingStatus: LoadingStatus.NEVER,
  getMeLoadingStatus: LoadingStatus.NEVER,
  editProfileLoadingStatus: LoadingStatus.NEVER,
  updateAvatarLoadingStatus: LoadingStatus.NEVER,
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
      default:
        break;
    }
  },
  initialState
);
