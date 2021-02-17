import {IUser} from "../user/contracts/state";
import {AppState} from "../../rootReducer";
import {LoadingStatus} from "../../types"

export const selectUser = (state: AppState): IUser | undefined => state.users.user
export const selectFetchGetUserLoadingStatus = (state: AppState): LoadingStatus => state.users.setFetchGetUserAction