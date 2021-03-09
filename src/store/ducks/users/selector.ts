import { IShortUser, IUser } from "../authUser/contracts/state";
import { AppState } from "../../rootReducer";
import { LoadingStatus } from "../../types";

export const selectUser = (state: AppState): IUser | undefined =>
  state.users.user;

export const selectFetchGetUserLoadingStatus = (
  state: AppState
): LoadingStatus => state.users.setFetchGetUserAction;

export const selectGetUserError = (state: AppState): string =>
  state.users.getUserError;

export const selectSuggestions = (state: AppState): IShortUser[] =>
  state.users.suggestions;
