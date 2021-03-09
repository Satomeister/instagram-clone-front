import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import {
  IoHomeOutline as HomeIcon,
  IoHomeSharp as HomeIconFilled,
} from "react-icons/all";

import "./Header.scss";

import logo from "../../assets/logo.png";

import {
  selectIsAuth,
  selectAuthUserData,
} from "../../store/ducks/authUser/selectors";
import { ActivityBar, GlobalSearch, UserDropdown } from "./components";

const Header: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectAuthUserData);

  return (
    <div className="header-wrapper">
      <div className="header">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>
        <GlobalSearch />
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
