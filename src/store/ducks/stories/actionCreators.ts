import {
  FetchCreateStoryAction,
  FetchGetStoriesAction,
  FetchGetStoryById,
  FetchWatchStoryAction,
  SetChosenStoryAction,
  SetFetchCreateStoryLoadingStatusAction,
  SetFetchGetStoriesLoadingStatusAction,
  StoriesActionTypes,
  WatchStoryAction,
} from "./contracts/actionTypes";
import { IStory, WatchStoryPayload } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const fetchGetStories = (): FetchGetStoriesAction => ({
  type: StoriesActionTypes.FETCH_GET_STORIES,
});

export const setStories = (payload: IStory[]) => ({
  type: StoriesActionTypes.SET_STORIES,
  payload,
});

export const setFetchGetStoriesLoadingStatus = (
  payload: LoadingStatus
): SetFetchGetStoriesLoadingStatusAction => ({
  type: StoriesActionTypes.SET_FETCH_GET_STORIES_LOADING_STATUS,
  payload,
});

export const fetchCreateStory = (payload: File): FetchCreateStoryAction => ({
  type: StoriesActionTypes.FETCH_CREATE_STORY,
  payload,
});

export const setFetchCreateStoryLoadingStatus = (
  payload: LoadingStatus
): SetFetchCreateStoryLoadingStatusAction => ({
  type: StoriesActionTypes.SET_FETCH_CREATE_STORY_LOADING_STATUS,
  payload,
});

export const fetchGetStoryById = (payload: string): FetchGetStoryById => ({
  type: StoriesActionTypes.FETCH_GET_STORY_BY_ID,
  payload,
});

export const setChosenStory = (payload: IStory): SetChosenStoryAction => ({
  type: StoriesActionTypes.SET_CHOSEN_STORY,
  payload,
});

export const fetchWatchStory = (
  payload: WatchStoryPayload
): FetchWatchStoryAction => ({
  type: StoriesActionTypes.FETCH_WATCH_STORY,
  payload,
});

export const watchStory = (payload: WatchStoryPayload): WatchStoryAction => ({
  type: StoriesActionTypes.WATCH_STORY,
  payload,
});
