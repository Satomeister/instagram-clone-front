import {
  CreatePostPayload,
  EditProfilePayload,
  IShortUser,
  IUser,
  LoginPayload,
  SignUpPayload,
  UpdatePostLikesCountPayload,
} from "./contracts/state";
import {
  AddAuthUserPostAction,
  AuthUserActionTypes,
  FetchCreatePostAction,
  FetchEditProfileAction,
  FetchGetMeAction,
  FetchGetSavedPostsAction,
  FetchLoginAction,
  FetchLogoutAction,
  FetchSavePostAction,
  FetchSignUpAction,
  FetchUnSavePostAction,
  FetchUpdateAvatarAction,
  SavePostAction,
  SetAuthUserDataAction,
  SetCreatePostErrorAction,
  SetEditProfileErrorAction,
  SetEditProfileLoadingStatusAction,
  SetFetchCreatePostLoadingStatusAction,
  SetFetchGetSavedPostsAction,
  SetGetMeErrorAction,
  SetGetMeLoadingStatusAction,
  SetLoginErrorAction,
  SetLoginLoadingStatusAction,
  SetLogoutLoadingStatusAction,
  SetSavedPostsAction,
  SetSignUpErrorAction,
  SetSignUpLoadingStatusAction,
  SetStoryAction,
  SetUpdateAvatarLoadingStatusAction,
  UnSavePostAction,
  UpdateAuthUserFollowingAction,
  UpdatePostCommentsCountAction,
  UpdatePostLikesCountAction,
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";
import { IStory } from "../stories/contracts/state";
import { IShortPost } from "../posts/contracts/state";

export const fetchSignUp = (payload: SignUpPayload): FetchSignUpAction => ({
  type: AuthUserActionTypes.FETCH_SIGNUP,
  payload,
});

export const fetchLogin = (payload: LoginPayload): FetchLoginAction => ({
  type: AuthUserActionTypes.FETCH_LOGIN,
  payload,
});

export const fetchLogout = (): FetchLogoutAction => ({
  type: AuthUserActionTypes.FETCH_LOGOUT,
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
  payload,
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

export const setEditProfileError = (
  payload: string
): SetEditProfileErrorAction => ({
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

export const fetchCreatePost = (
  payload: CreatePostPayload
): FetchCreatePostAction => ({
  type: AuthUserActionTypes.FETCH_CREATE_POST,
  payload,
});

export const setFetchCreatePostLoadingStatus = (
  payload: LoadingStatus
): SetFetchCreatePostLoadingStatusAction => ({
  type: AuthUserActionTypes.SET_FETCH_CREATE_POST_LOADING_STATUS,
  payload,
});

export const setCreatePostError = (
  payload: string
): SetCreatePostErrorAction => ({
  type: AuthUserActionTypes.SET_CREATE_POST_ERROR,
  payload,
});

export const addAuthUserPost = (
  payload: IShortPost
): AddAuthUserPostAction => ({
  type: AuthUserActionTypes.ADD_AUTH_USER_POST,
  payload,
});

export const updatePostLikesCount = (
  payload: UpdatePostLikesCountPayload
): UpdatePostLikesCountAction => ({
  type: AuthUserActionTypes.UPDATE_POST_LIKES_COUNT,
  payload,
});

export const updatePostCommentsCount = (
  payload: UpdatePostLikesCountPayload
): UpdatePostCommentsCountAction => ({
  type: AuthUserActionTypes.UPDATE_POST_COMMENTS_COUNT,
  payload,
});

export const setStory = (payload: IStory): SetStoryAction => ({
  type: AuthUserActionTypes.SET_STORY,
  payload,
});

export const fetchGetSavedPosts = (): FetchGetSavedPostsAction => ({
  type: AuthUserActionTypes.FETCH_GET_SAVED_POSTS,
});

export const setSavedPosts = (payload: IShortPost[]): SetSavedPostsAction => ({
  type: AuthUserActionTypes.SET_SAVED_POSTS,
  payload,
});

export const setFetchGetSavedPosts = (
  payload: LoadingStatus
): SetFetchGetSavedPostsAction => ({
  type: AuthUserActionTypes.SET_FETCH_GET_SAVED_POSTS,
  payload,
});

export const fetchSavePost = (payload: IShortPost): FetchSavePostAction => ({
  type: AuthUserActionTypes.FETCH_SAVE_POST,
  payload,
});

export const savePost = (payload: IShortPost): SavePostAction => ({
  type: AuthUserActionTypes.SAVE_POST,
  payload,
});

export const fetchUnSavePost = (
  payload: IShortPost
): FetchUnSavePostAction => ({
  type: AuthUserActionTypes.FETCH_UNSAVE_POST,
  payload,
});

export const unSavePost = (payload: IShortPost): UnSavePostAction => ({
  type: AuthUserActionTypes.UNSAVE_POST,
  payload,
});
