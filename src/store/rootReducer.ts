import { combineReducers } from "redux";
import {authUserReducer, AuthUserState} from "./ducks/user/reducer";
import {usersReducer, UsersState} from "./ducks/users/reducer";

const rootReducer = combineReducers({
  authUser: authUserReducer,
  users: usersReducer
});

export interface AppState {
  authUser: AuthUserState,
  users:  UsersState
}

export default rootReducer;