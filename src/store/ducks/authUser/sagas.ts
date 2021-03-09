import { call, put, takeLatest } from "redux-saga/effects";
import {
  AuthUserActionTypes,
  FetchCreatePostAction,
  FetchEditProfileAction,
  FetchLoginAction,
  FetchSavePostAction,
  FetchSignUpAction,
  FetchUnSavePostAction,
  FetchUpdateAvatarAction,
} from "./contracts/actionTypes";
import {
  addAuthUserPost,
  savePost,
  setAuthUserData,
  setCreatePostError,
  setEditProfileError,
  setEditProfileLoadingStatus,
  setFetchCreatePostLoadingStatus,
  setFetchGetSavedPosts,
  setGetMeLoadingStatus,
  setLoginError,
  setLoginLoadingStatus,
  setLogoutLoadingStatus,
  setSavedPosts,
  setSignUpError,
  setSignUpLoadingStatus,
  setUpdateAvatarLoadingStatus,
  unSavePost,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { AuthUserApi, PostApi } from "../../../api";
import { setSelectedPost } from "../posts/actionCreators";

function* fetchSignUpRequest({ payload }: FetchSignUpAction) {
  try {
    yield put(setSignUpLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthUserApi.signup, payload);
    localStorage.setItem("token", data.token);
    delete data.token;
    yield put(setAuthUserData(data));
    yield put(setSignUpLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    if (error?.response?.data?.message) {
      yield put(setSignUpError(error.response.data.message));
    }
    yield put(setSignUpLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchLoginRequest({ payload }: FetchLoginAction) {
  try {
    yield put(setLoginLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthUserApi.login, payload);
    localStorage.setItem("token", data.token);
    delete data.token;
    yield put(setAuthUserData(data));
    yield put(setLoginLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(setLoginError(error.response.data.message));
    }
    yield put(setLoginLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchLogoutRequest() {
  try {
    yield put(setLogoutLoadingStatus(LoadingStatus.LOADING));
    yield call(AuthUserApi.logout);
    localStorage.removeItem("token");
    yield put(setAuthUserData(undefined));
    yield put(setLogoutLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setLogoutLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchGetMeRequest() {
  try {
    yield put(setGetMeLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthUserApi.getMe);
    yield put(setAuthUserData(data));
    yield put(setGetMeLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setGetMeLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchEditProfileRequest({ payload }: FetchEditProfileAction) {
  try {
    yield put(setEditProfileLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthUserApi.edit, payload);
    yield put(setAuthUserData(data));
    yield put(setEditProfileLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(setEditProfileError(error.response.data.message));
    }
    yield put(setEditProfileLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchUpdateAvatarRequest({ payload }: FetchUpdateAvatarAction) {
  try {
    yield put(setUpdateAvatarLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(AuthUserApi.updateAvatar, payload);
    yield put(setAuthUserData(data));
    yield put(setUpdateAvatarLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUpdateAvatarLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchCreatePostRequest({ payload }: FetchCreatePostAction) {
  try {
    yield put(setFetchCreatePostLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(PostApi.create, payload);
    yield put(setSelectedPost(data.post));
    yield put(addAuthUserPost(data.shortPost));
    yield put(setFetchCreatePostLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(setCreatePostError(error.response.data.message));
    }
    yield put(setFetchCreatePostLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchGetSavedPostsRequest() {
  try {
    yield put(setFetchGetSavedPosts(LoadingStatus.LOADING));
    const { data } = yield call(AuthUserApi.getSavedPosts);
    yield put(setSavedPosts(data));
    yield put(setFetchGetSavedPosts(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchGetSavedPosts(LoadingStatus.ERROR));
  }
}

function* fetchSavePostRequest({ payload }: FetchSavePostAction) {
  try {
    yield put(savePost(payload));
    yield call(AuthUserApi.savePost, payload._id);
  } catch (e) {
    yield put(unSavePost(payload));
  }
}

function* fetchUnSavePostRequest({ payload }: FetchUnSavePostAction) {
  try {
    yield put(unSavePost(payload));
    yield call(AuthUserApi.unSavePost, payload._id);
  } catch (e) {
    yield put(savePost(payload));
  }
}

export function* authUserSaga() {
  yield takeLatest(AuthUserActionTypes.FETCH_SIGNUP, fetchSignUpRequest);
  yield takeLatest(AuthUserActionTypes.FETCH_LOGIN, fetchLoginRequest);
  yield takeLatest(AuthUserActionTypes.FETCH_LOGOUT, fetchLogoutRequest);
  yield takeLatest(AuthUserActionTypes.FETCH_GET_ME, fetchGetMeRequest);
  yield takeLatest(
    AuthUserActionTypes.FETCH_EDIT_PROFILE,
    fetchEditProfileRequest
  );
  yield takeLatest(
    AuthUserActionTypes.FETCH_UPDATE_AVATAR,
    fetchUpdateAvatarRequest
  );
  yield takeLatest(
    AuthUserActionTypes.FETCH_CREATE_POST,
    fetchCreatePostRequest
  );
  yield takeLatest(
    AuthUserActionTypes.FETCH_GET_SAVED_POSTS,
    fetchGetSavedPostsRequest
  );
  yield takeLatest(AuthUserActionTypes.FETCH_SAVE_POST, fetchSavePostRequest);
  yield takeLatest(
    AuthUserActionTypes.FETCH_UNSAVE_POST,
    fetchUnSavePostRequest
  );
}
