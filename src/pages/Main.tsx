import React, { FC, Suspense, useReducer } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Header,
  ModalWindow,
  Notification,
  UnauthorizedNotification,
} from "../components";
import {
  CreatePostPage,
  CreateStoryPage,
  EditProfilePage,
  ErrorPage,
  HomePage,
  PostPage,
  ProfilePage,
} from "./index";
import { selectIsAuth } from "../store/ducks/authUser/selectors";
import {
  deleteNotification,
  NotificationContext,
  notificationReducer,
} from "../context/notification";
import ModalWrapper from "../components/ModalWrapper";

const Main: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);

  const [
    notificationState,
    notificationDispatch,
  ] = useReducer(notificationReducer, { type: null, text: "" });

  return (
    <NotificationContext.Provider value={notificationDispatch}>
      {notificationState.type === "unAuth" && (
        <ModalWrapper
          onClose={() => notificationDispatch(deleteNotification())}
        >
          <ModalWindow>
            <div className="unauth-modal">
              <h3>You are not Logged in</h3>
              <Link to="/auth/signin">Log in</Link>
            </div>
          </ModalWindow>
        </ModalWrapper>
      )}
      {notificationState.type === "text" && (
        <Notification text={notificationState.text} />
      )}
      <div className="container">
        <Header />
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/account/edit" component={EditProfilePage} />
            <Route exact path="/post/create" component={CreatePostPage} />
            <Route exact path="/story/create" component={CreateStoryPage} />
            <Route exact path="/post/:postId" component={PostPage} />
            <Route
              exact
              path={["/:username", "/:username/saved"]}
              component={ProfilePage}
            />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Suspense>
        {!isAuth && <UnauthorizedNotification />}
      </div>
    </NotificationContext.Provider>
  );
};

export default Main;
