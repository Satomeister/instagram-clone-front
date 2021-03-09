import { all } from "redux-saga/effects";
import { authUserSaga } from "./ducks/authUser/sagas";
import { usersSaga } from "./ducks/users/sagas";
import { postSaga } from "./ducks/posts/sagas";
import { storiesSaga } from "./ducks/stories/sagas";
import { activitiesSaga } from "./ducks/activities/sagas";

export default function* rootSaga() {
  yield all([
    authUserSaga(),
    usersSaga(),
    postSaga(),
    storiesSaga(),
    activitiesSaga(),
  ]);
}
