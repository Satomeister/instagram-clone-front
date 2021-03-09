import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FetchFollowAction,
  FetchGetUserAction,
  FetchUnFollowAction,
  UsersActionTypes,
} from "./contracts/actionTypes";
import {
  follow,
  setFetchGetUserLoadingStatus,
  setGetUserError,
  setSuggestions,
  setUser,
  unFollow,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { UsersApi } from "../../../api";
import { updateAuthUserFollowing } from "../authUser/actionCreators";
import { AppState } from "../../rootReducer";

function* fetchGetUserRequest({ payload }: FetchGetUserAction) {
  try {
    yield put(setFetchGetUserLoadingStatus(LoadingStatus.LOADING));
    yield put(setGetUserError(""));
    const { data } = yield call(UsersApi.getUser, payload);
    yield put(setUser(data));
    yield put(setFetchGetUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    if (error.response.status === 404) {
      yield put(setGetUserError("404"));
    }
    yield put(setFetchGetUserLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchFollowRequest({ payload }: FetchFollowAction) {
  try {
    const { data } = yield call(UsersApi.follow, payload);
    const authUserData = yield select((state: AppState) => state.authUser.data);
    yield put(updateAuthUserFollowing(data));
    yield put(follow({ user: data, authUserData: authUserData }));
  } catch (e) {}
}

function* fetchUnFollowRequest({ payload }: FetchUnFollowAction) {
  try {
    const { data } = yield call(UsersApi.unfollow, payload);
    const authUserData = yield select((state: AppState) => state.authUser.data);
    yield put(updateAuthUserFollowing(data));
    yield put(unFollow({ user: data, authUserData: authUserData }));
  } catch (e) {}
}

function* fetchGetSuggestionsRequest() {
  try {
    const { data } = yield call(UsersApi.getSuggestions);
    yield put(setSuggestions(data));
  } catch (e) {}
}

export function* usersSaga() {
  yield takeLatest(UsersActionTypes.FETCH_GET_USER, fetchGetUserRequest);
  yield takeLatest(UsersActionTypes.FETCH_FOLLOW, fetchFollowRequest);
  yield takeLatest(UsersActionTypes.FETCH_UNFOLLOW, fetchUnFollowRequest);
  yield takeLatest(
    UsersActionTypes.FETCH_GET_SUGGESTIONS,
    fetchGetSuggestionsRequest
  );
}
