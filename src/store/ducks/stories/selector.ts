import { AppState } from "../../rootReducer";
import { IStory } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const selectStories = (storyId: string) => (state: AppState): IStory[] =>
  state.stories.chosenStory[0]?._id === storyId
    ? state.stories.chosenStory
    : state.stories.stories;

export const selectFetchGetStoriesLoadingStatus = (
  state: AppState
): LoadingStatus => state.stories.fetchGetStoriesLoadingStatus;

export const selectFetchCreateStoryLoadingStatus = (
  state: AppState
): LoadingStatus => state.stories.fetchCreateStoryLoadingStatus;
