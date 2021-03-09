import { call, put, takeLatest } from "redux-saga/effects";
import { ActivitiesActionTypes } from "./contracts/actionTypes";
import {
  setActivities,
  setFetchGetActivitiesLoadingStatus,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { ActivityApi } from "../../../api/activity";

function* fetchGetActivitiesRequest() {
  try {
    yield put(setFetchGetActivitiesLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(ActivityApi.getActivities);
    yield put(setActivities(data));
    yield put(setFetchGetActivitiesLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchGetActivitiesLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* activitiesSaga() {
  yield takeLatest(
    ActivitiesActionTypes.FETCH_GET_ACTIVITIES,
    fetchGetActivitiesRequest
  );
}
