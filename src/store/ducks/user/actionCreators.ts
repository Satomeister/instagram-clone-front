import {
  EditProfilePayload, IShortUser,
  IUser,
  LoginPayload,
  SignUpPayload,
} from "./contracts/state";
import {
  FetchEditProfileAction,
  FetchGetMeAction,
  FetchLoginAction,
  FetchSignUpAction,
  FetchUpdateAvatarAction,
  SetEditProfileLoadingStatusAction,
  SetGetMeErrorAction,
  SetGetMeLoadingStatusAction,
  SetLoginErrorAction,
  SetLoginLoadingStatusAction,
  SetSignUpErrorAction,
  SetSignUpLoadingStatusAction,
  SetUpdateAvatarLoadingStatusAction,
  SetAuthUserDataAction,
  AuthUserActionTypes,
  UpdateAuthUserFollowingAction, FetchLogoutAction, SetLogoutLoadingStatusAction, SetEditProfileErrorAction,
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";

export const fetchSignUp = (payload: SignUpPayload): FetchSignUpAction => ({
  type: AuthUserActionTypes.FETCH_SIGNUP,
  payload,
});

export const fetchLogin = (payload: LoginPayload): FetchLoginAction => ({
  type: AuthUserActionTypes.FETCH_LOGIN,
  payload,
});

export const fetchLogout = (): FetchLogoutAction => ({
  type: AuthUserActionTypes.FETCH_LOGOUT
});

export const fetchGetMe = (): FetchGetMeAction => ({
  type: AuthUserActionTypes.FETCH_GET_ME,
});

export const setAuthUserData = (
  payload: IUser | undefined
): SetAuthUserDataAction => ({
  type: AuthUserActionTypes.SET_AUTH_USER_DATA,
  payload,
});

export const setSignUpLoadingStatus = (
  payload: LoadingStatus
): SetSignUpLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_SIGNUP_LOADING_STATUS,
  payload,
});

export const setLoginLoadingStatus = (
  payload: LoadingStatus
): SetLoginLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_LOGIN_LOADING_STATUS,
  payload,
});

export const setLogoutLoadingStatus = (
  payload: LoadingStatus
): SetLogoutLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_LOGOUT_LOADING_STATUS,
  payload
});

export const setGetMeLoadingStatus = (
  payload: LoadingStatus
): SetGetMeLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_GET_ME_LOADING_STATUS,
  payload,
});

export const setSignUpError = (payload: string): SetSignUpErrorAction => ({
  type: AuthUserActionTypes.SET_SIGNUP_ERROR,
  payload,
});

export const setLoginError = (payload: string): SetLoginErrorAction => ({
  type: AuthUserActionTypes.SET_LOGIN_ERROR,
  payload,
});

export const setGetMeError = (payload: string): SetGetMeErrorAction => ({
  type: AuthUserActionTypes.SET_GET_ME_ERROR,
  payload,
});

export const fetchEditProfile = (
  payload: EditProfilePayload
): FetchEditProfileAction => ({
  type: AuthUserActionTypes.FETCH_EDIT_PROFILE,
  payload,
});

export const setEditProfileLoadingStatus = (
  payload: LoadingStatus
): SetEditProfileLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_EDIT_PROFILE_LOADING_STATUS,
  payload,
});

export const setEditProfileError = (payload: string): SetEditProfileErrorAction => ({
  type: AuthUserActionTypes.SET_EDIT_PROFILE_ERROR,
  payload,
});

export const fetchUpdateAvatar = (
  payload: FormData | null
): FetchUpdateAvatarAction => ({
  type: AuthUserActionTypes.FETCH_UPDATE_AVATAR,
  payload,
});

export const setUpdateAvatarLoadingStatus = (
  payload: LoadingStatus
): SetUpdateAvatarLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_UPDATE_AVATAR_LOADING_STATUS,
  payload,
});

export const updateAuthUserFollowing = (
  payload: IShortUser
): UpdateAuthUserFollowingAction => ({
  type: AuthUserActionTypes.UPDATE_AUTH_USER_FOLLOWING,
  payload,
});
