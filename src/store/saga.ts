import { all } from "redux-saga/effects";
import {authUserSaga} from "./ducks/user/sagas";
import {usersSaga} from "./ducks/users/saga";

export default function* rootSaga() {
  yield all([authUserSaga(), usersSaga()]);
}