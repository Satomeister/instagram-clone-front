import React, { FC, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInstagram as InstagramIcon } from "react-icons/all";

import "./App.scss";

import { AuthPage, Main, StoriesPage } from "./pages";
import { fetchGetMe } from "./store/ducks/authUser/actionCreators";
import { selectGetMeLoadingStatus } from "./store/ducks/authUser/selectors";
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
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/stories/:storyId" component={StoriesPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/" component={Main} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
