import { IStory } from "./contracts/state";
import { LoadingStatus } from "../../types";
import produce, { Draft } from "immer";
import { StoriesActions, StoriesActionTypes } from "./contracts/actionTypes";

export interface StoriesState {
  stories: IStory[];
  chosenStory: IStory[];
  fetchGetStoriesLoadingStatus: LoadingStatus;
  fetchCreateStoryLoadingStatus: LoadingStatus;
}

const initialState: StoriesState = {
  stories: [],
  chosenStory: [],
  fetchGetStoriesLoadingStatus: LoadingStatus.NEVER,
  fetchCreateStoryLoadingStatus: LoadingStatus.NEVER,
};

export const storiesReducer = produce(
  (draft: Draft<StoriesState>, action: StoriesActions) => {
    switch (action.type) {
      case StoriesActionTypes.SET_STORIES:
        draft.stories = action.payload;
        break;
      case StoriesActionTypes.SET_FETCH_GET_STORIES_LOADING_STATUS:
        draft.fetchGetStoriesLoadingStatus = action.payload;
        break;
      case StoriesActionTypes.SET_FETCH_CREATE_STORY_LOADING_STATUS:
        draft.fetchCreateStoryLoadingStatus = action.payload;
        break;
      case StoriesActionTypes.SET_CHOSEN_STORY:
        draft.chosenStory = [action.payload];
        break;
      case StoriesActionTypes.WATCH_STORY:
        draft.stories = draft.stories.map((story) => {
          if (story._id === action.payload.storyId) {
            if (!story.watchers.includes(action.payload.userId)) {
              story.watchers.push(action.payload.userId);
            }
          }
          return story;
        });
        break;
      default:
        break;
    }
  },
  initialState
);
