import { combineReducers } from "redux";
import { authUserReducer, AuthUserState } from "./ducks/authUser/reducer";
import { usersReducer, UsersState } from "./ducks/users/reducer";
import { postsReducer, PostsState } from "./ducks/posts/reducer";
import { storiesReducer, StoriesState } from "./ducks/stories/reducer";
import { activitiesReducer, ActivitiesState } from "./ducks/activities/reducer";

const rootReducer = combineReducers({
  authUser: authUserReducer,
  users: usersReducer,
  posts: postsReducer,
  stories: storiesReducer,
  activities: activitiesReducer,
});

export interface AppState {
  authUser: AuthUserState;
  users: UsersState;
  posts: PostsState;
  stories: StoriesState;
  activities: ActivitiesState;
}

export default rootReducer;
