import React, { FC } from "react";
import {Header, Notification, UnauthorizedNotification} from "../components";
import { Route, Switch } from "react-router-dom";
import { EditProfile, Home, Profile } from "./index";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../store/ducks/user/selectors";

const Main: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth)

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account/edit" component={EditProfile} />
        <Route path="/:username" component={Profile} />
      </Switch>
      {!isAuth && <UnauthorizedNotification /> }
    </div>
  );
};

export default Main;