import React, { FC } from "react";
import {
  IoHomeOutline as HomeIcon,
  IoHomeSharp as HomeIconFilled,
} from "react-icons/all";
import { Link, Route, Switch } from "react-router-dom";

import "./Header.scss";

import logo from "../../assets/logo.png";
import { GlobalSearchInput } from "../index";
import { useSelector } from "react-redux";
import {
  selectIsAuth,
  selectAuthUserData,
} from "../../store/ducks/user/selectors";
import { ActivityBar, UserDropdown } from "./components";

const Header: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectAuthUserData);

  return (
    <div className="header-wrapper">
      <div className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>
        <GlobalSearchInput />
        <div className="header-navigation">
          {isAuth ? (
            <>
              <Switch>
                <Route exact path="/">
                  <div
                    style={{ cursor: "auto" }}
                    className="header-navigation__item"
                  >
                    <HomeIconFilled />
                  </div>
                </Route>
                <Route path={["/account/edit", "/:username"]}>
                  <Link to={"/"} className="header-navigation__item">
                    <HomeIcon />
                  </Link>
                </Route>
              </Switch>
              <ActivityBar />
              {user?.username && <UserDropdown />}
            </>
          ) : (
            <>
              <div className="header-navigation__item">
                <Link to={"/auth/signin"} className="button primary-button">
                  Log In
                </Link>
              </div>
              <div className="header-navigation__item">
                <Link to={"/auth/signup"} className="button">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
