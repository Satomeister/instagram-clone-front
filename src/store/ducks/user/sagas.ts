import { call, put, takeLatest } from "redux-saga/effects";
import {
  FetchEditProfileAction,
  FetchLoginAction,
  FetchSignUpAction,
  FetchUpdateAvatarAction,
  AuthUserActionTypes,
} from "./contracts/actionTypes";
import {
  setEditProfileLoadingStatus,
  setGetMeLoadingStatus,
  setLoginError,
  setLoginLoadingStatus,
  setSignUpError,
  setSignUpLoadingStatus,
  setUpdateAvatarLoadingStatus,
  setAuthUserData,
  setLogoutLoadingStatus, setEditProfileError,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { AuthUserApi } from "../../../api/authUser";

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
    if (error?.response?.data?.message) {
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
    if (error?.response?.data?.message) {
      yield put(setEditProfileError(error.response.data.message))
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
}
