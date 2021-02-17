import React, { FC } from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";

import "./Auth.scss";

import logo from "../../assets/logo.png";
import { SignIn, SignUp } from "./components";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../store/ducks/user/selectors";

const Auth: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <div className="auth">
        <img className="auth-logo" src={logo} alt="in100gram" />
        <Switch>
          <Route exact path="/auth/signin" component={SignIn} />
          <Route exact path="/auth/signup" component={SignUp} />
        </Switch>
      </div>
      <div className="auth__link">
        <Route exact path="/auth/signin">
          <span>Don't have an account? </span>
          <Link to="/auth/signup">Sign Up</Link>
        </Route>
        <Route exact path="/auth/signup">
          <span>Have an account? </span>
          <Link to="/auth/signin">Log In</Link>
        </Route>
      </div>
    </>
  );
};

export default Auth;
