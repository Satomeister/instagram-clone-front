import { AppState } from "../../rootReducer";
import { IActivity } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const selectActivities = (state: AppState): IActivity[] =>
  state.activities.activities;

export const selectGetActivitiesLoadingStatus = (
  state: AppState
): LoadingStatus => state.activities.fetchGetActivitiesLoadingStatus;
