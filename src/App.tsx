import React, { FC, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInstagram as InstagramIcon } from "react-icons/all";

import "./App.scss";

import { Auth, Main, Stories } from "./pages";
import { fetchGetMe } from "./store/ducks/user/actionCreators";
import { selectGetMeLoadingStatus } from "./store/ducks/user/selectors";
import { LoadingStatus } from "./store/types";

const App: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const getMeLoadingStatus = useSelector(selectGetMeLoadingStatus);

  const isReady =
    getMeLoadingStatus !== LoadingStatus.NEVER &&
    getMeLoadingStatus !== LoadingStatus.LOADING;

  useEffect(() => {
    dispatch(fetchGetMe());
  }, [dispatch]);

  if (!isReady) {
    return (
      <div className="empty-app">
        <InstagramIcon />
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path="/stories" component={Stories} />
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
