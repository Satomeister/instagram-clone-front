import { IStory, WatchStoryPayload } from "./state";
import { LoadingStatus } from "../../../types";

export enum StoriesActionTypes {
  FETCH_CREATE_STORY = "stories/FETCH_CREATE_STORY",
  SET_FETCH_CREATE_STORY_LOADING_STATUS = "stories/SET_FETCH_CREATE_STORY_LOADING_STATUS",
  FETCH_GET_STORIES = "stories/FETCH_GET_STORIES",
  FETCH_GET_STORY_BY_ID = "stories/FETCH_GET_STORY_BY_ID",
  SET_STORIES = "stories/SET_STORIES",
  SET_FETCH_GET_STORIES_LOADING_STATUS = "stories/SET_FETCH_GET_STORIES_LOADING_STATUS",
  SET_CHOSEN_STORY = "stories/SET_CHOSEN_STORY",
  FETCH_WATCH_STORY = "stories/FETCH_WATCH_STORY",
  WATCH_STORY = "stories/WATCH_STORY",
}

export interface FetchGetStoriesAction {
  type: StoriesActionTypes.FETCH_GET_STORIES;
}

export interface SetStoriesAction {
  type: StoriesActionTypes.SET_STORIES;
  payload: IStory[];
}

export interface SetFetchGetStoriesLoadingStatusAction {
  type: StoriesActionTypes.SET_FETCH_GET_STORIES_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchCreateStoryAction {
  type: StoriesActionTypes.FETCH_CREATE_STORY;
  payload: File;
}

export interface SetFetchCreateStoryLoadingStatusAction {
  type: StoriesActionTypes.SET_FETCH_CREATE_STORY_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchGetStoryById {
  type: StoriesActionTypes.FETCH_GET_STORY_BY_ID;
  payload: string;
}

export interface SetChosenStoryAction {
  type: StoriesActionTypes.SET_CHOSEN_STORY;
  payload: IStory;
}

export interface FetchWatchStoryAction {
  type: StoriesActionTypes.FETCH_WATCH_STORY;
  payload: WatchStoryPayload;
}

export interface WatchStoryAction {
  type: StoriesActionTypes.WATCH_STORY;
  payload: WatchStoryPayload;
}

export type StoriesActions =
  | FetchGetStoriesAction
  | SetStoriesAction
  | SetFetchGetStoriesLoadingStatusAction
  | FetchCreateStoryAction
  | SetFetchCreateStoryLoadingStatusAction
  | FetchGetStoryById
  | SetChosenStoryAction
  | FetchWatchStoryAction
  | WatchStoryAction;
