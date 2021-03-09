import { call, put, takeLatest } from "redux-saga/effects";
import {
  FetchCreateStoryAction,
  FetchGetStoryById,
  FetchWatchStoryAction,
  StoriesActionTypes,
} from "./contracts/actionTypes";
import {
  setChosenStory,
  setFetchCreateStoryLoadingStatus,
  setFetchGetStoriesLoadingStatus,
  setStories,
  watchStory,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { StoryApi } from "../../../api";
import { setStory } from "../authUser/actionCreators";

function* fetchGetStoriesRequest() {
  try {
    yield put(setFetchGetStoriesLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(StoryApi.getStories);
    yield put(setStories(data));
    yield put(setFetchGetStoriesLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchGetStoriesLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchCreateStoryRequest({ payload }: FetchCreateStoryAction) {
  try {
    yield put(setFetchCreateStoryLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(StoryApi.create, payload);
    yield put(setStory(data));
    yield put(setFetchCreateStoryLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchCreateStoryLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchGetStoryByIdRequest({ payload }: FetchGetStoryById) {
  try {
    const { data } = yield call(StoryApi.getById, payload);
    yield put(setChosenStory(data));
  } catch (e) {}
}

function* fetchWatchStoryRequest({ payload }: FetchWatchStoryAction) {
  try {
    yield call(StoryApi.watch, payload.storyId);
    yield put(watchStory(payload));
  } catch (e) {}
}

export function* storiesSaga() {
  yield takeLatest(
    StoriesActionTypes.FETCH_GET_STORIES,
    fetchGetStoriesRequest
  );
  yield takeLatest(
    StoriesActionTypes.FETCH_CREATE_STORY,
    fetchCreateStoryRequest
  );
  yield takeLatest(
    StoriesActionTypes.FETCH_WATCH_STORY,
    fetchWatchStoryRequest
  );
  yield takeLatest(
    StoriesActionTypes.FETCH_GET_STORY_BY_ID,
    fetchGetStoryByIdRequest
  );
}
