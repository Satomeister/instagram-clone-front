import React, { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  BiUserCircle as UserIcon,
  BsBookmark as BookmarkIcon,
  FiSettings as SettingsIcon,
} from "react-icons/all";

import "./UserDropdown.scss";

import { Avatar } from "../../../index";
import Box from "../../../Box";
import {
  selectAuthUserData,
  selectLogoutLoadingStatus,
} from "../../../../store/ducks/user/selectors";
import { fetchLogout } from "../../../../store/ducks/user/actionCreators";
import { LoadingStatus } from "../../../../store/types";
import ModalWrapper from "../../../ModalWrapper";

const UserDropdown: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const user = useSelector(selectAuthUserData);
  const logoutLoadingStatus = useSelector(selectLogoutLoadingStatus);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <>
      {logoutLoadingStatus === LoadingStatus.LOADING && (
        <ModalWrapper onClose={() => {}}>
          <div className="logout-modal">
            <h3>Logging Out</h3>
            <p>You need to log back in</p>
          </div>
        </ModalWrapper>
      )}
      <div
        onClick={() => setDropdownOpen(true)}
        style={{ position: "relative" }}
        className="header-navigation__item"
      >
        <Avatar size={25} />
        {dropdownOpen && (
          <div className="arrow-bottom">
            <div className="arrow-bottom__inner" />
          </div>
        )}
      </div>
      {dropdownOpen && (
        <Box width={230} setBoxOpen={setDropdownOpen}>
          <ul className="user-dropdown__list">
            <li className="user-dropdown__item">
              <Link to={`/${user?.username}`}>
                <UserIcon />
                <span>Profile</span>
              </Link>
            </li>
            <li className="user-dropdown__item">
              <Link to={`/${user?.username}/saved`}>
                <BookmarkIcon />
                <span>Saved</span>
              </Link>
            </li>
            <li className="user-dropdown__item">
              <Link to={`/account/edit`}>
                <SettingsIcon />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </Box>
      )}
    </>
  );
};

export default UserDropdown;
