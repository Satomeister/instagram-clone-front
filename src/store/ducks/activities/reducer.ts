import produce, { Draft } from "immer";
import {
  ActivitiesActions,
  ActivitiesActionTypes,
} from "./contracts/actionTypes";
import { IActivity } from "./contracts/state";
import { LoadingStatus } from "../../types";

export interface ActivitiesState {
  activities: IActivity[];
  fetchGetActivitiesLoadingStatus: LoadingStatus;
}

const initialState: ActivitiesState = {
  activities: [],
  fetchGetActivitiesLoadingStatus: LoadingStatus.NEVER,
};

export const activitiesReducer = produce(
  (draft: Draft<ActivitiesState>, action: ActivitiesActions) => {
    switch (action.type) {
      case ActivitiesActionTypes.SET_ACTIVITIES:
        draft.activities = action.payload;
        break;
      case ActivitiesActionTypes.SET_FETCH_GET_ACTIVITIES_LOADING_STATUS:
        draft.fetchGetActivitiesLoadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);
