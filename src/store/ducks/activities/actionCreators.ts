import {
  ActivitiesActionTypes,
  FetchGetActivitiesAction,
  SetActivitiesAction,
  SetFetchGetActivitiesLoadingStatusAction,
} from "./contracts/actionTypes";
import { IActivity } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const fetchGetActivities = (): FetchGetActivitiesAction => ({
  type: ActivitiesActionTypes.FETCH_GET_ACTIVITIES,
});

export const setActivities = (payload: IActivity[]): SetActivitiesAction => ({
  type: ActivitiesActionTypes.SET_ACTIVITIES,
  payload,
});

export const setFetchGetActivitiesLoadingStatus = (
  payload: LoadingStatus
): SetFetchGetActivitiesLoadingStatusAction => ({
  type: ActivitiesActionTypes.SET_FETCH_GET_ACTIVITIES_LOADING_STATUS,
  payload,
});
