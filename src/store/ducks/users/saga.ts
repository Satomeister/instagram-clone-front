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
  setUser,
  unFollow,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { UsersApi } from "../../../api/users";
import { updateAuthUserFollowing } from "../user/actionCreators";
import {AppState} from "../../rootReducer";

function* fetchGetUserRequest({ payload }: FetchGetUserAction) {
  try {
    yield put(setFetchGetUserLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(UsersApi.getUser, payload);
    yield put(setUser(data));
    yield put(setFetchGetUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchGetUserLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchFollowRequest({ payload }: FetchFollowAction) {
  try {
    const { data } = yield call(UsersApi.follow, payload);
    const authUserData = yield select((state: AppState) => state.authUser.data)
    yield put(updateAuthUserFollowing(data));
    yield put(follow({user: data, authUserData:authUserData}));
  } catch (e) {}
}

function* fetchUnFollowRequest({ payload }: FetchUnFollowAction) {
  try {
    const { data } = yield call(UsersApi.unfollow, payload);
    const authUserData = yield select((state: AppState) => state.authUser.data)
    yield put(updateAuthUserFollowing(data));
    yield put(unFollow({user: data, authUserData:authUserData}));
  } catch (e) {}
}

export function* usersSaga() {
  yield takeLatest(UsersActionTypes.FETCH_GET_USER, fetchGetUserRequest);
  yield takeLatest(UsersActionTypes.FETCH_FOLLOW, fetchFollowRequest);
  yield takeLatest(UsersActionTypes.FETCH_UNFOLLOW, fetchUnFollowRequest);
}
