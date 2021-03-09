import React, { FC } from "react";
import { useSelector } from "react-redux";

import { Link, Redirect, Route, Switch } from "react-router-dom";

import "./Auth.scss";

import logo from "../../assets/logo.png";

import { SignIn, SignUp } from "./components";
import { selectIsAuth } from "../../store/ducks/authUser/selectors";

const AuthPage: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="auth">
        <img className="auth__logo" src={logo} alt="" />
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

export default AuthPage;
