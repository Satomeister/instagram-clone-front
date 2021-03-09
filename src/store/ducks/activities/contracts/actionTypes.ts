import { IActivity } from "./state";
import { LoadingStatus } from "../../../types";

export enum ActivitiesActionTypes {
  FETCH_GET_ACTIVITIES = "activities/FETCH_GET_ACTIVITIES",
  SET_FETCH_GET_ACTIVITIES_LOADING_STATUS = "activities/SET_FETCH_GET_ACTIVITIES_LOADING_STATUS",
  SET_ACTIVITIES = "activities/SET_ACTIVITIES",
}

export interface FetchGetActivitiesAction {
  type: ActivitiesActionTypes.FETCH_GET_ACTIVITIES;
}

export interface SetActivitiesAction {
  type: ActivitiesActionTypes.SET_ACTIVITIES;
  payload: IActivity[];
}

export interface SetFetchGetActivitiesLoadingStatusAction {
  type: ActivitiesActionTypes.SET_FETCH_GET_ACTIVITIES_LOADING_STATUS;
  payload: LoadingStatus;
}

export type ActivitiesActions =
  | FetchGetActivitiesAction
  | SetActivitiesAction
  | SetFetchGetActivitiesLoadingStatusAction;
