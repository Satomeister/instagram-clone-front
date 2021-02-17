import React, { FC } from "react";
import { Link } from "react-router-dom";

import "./InputDropdown.scss";

import Avatar from "../../../Avatar";
import Box from "../../../Box";
import {IShortUser} from "../../../../store/ducks/user/contracts/state";

interface InputDropdownProps {
  users: IShortUser[]
}

const InputDropdown: FC<InputDropdownProps> = ({users}): JSX.Element => {

  if (!users.length) {
    return (
      <Box width={380} height={360} className="input-dropdown">
        <p className="input-dropdown__empty">No results found.</p>
      </Box>
    );
  }

  return (
    <Box width={380} height={360} className="input-dropdown">
      <ul className="input-dropdown__list">
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/${user.username}`} className="input-dropdown__item">
              <Avatar size={44} url={user.avatar} />
              <div className="input-dropdown__item-user">
                <span className="input-dropdown__item-user-name">
                  {user.username}
                </span>
                <span className="input-dropdown__item-user-fullname">
                  {user.fullname}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default InputDropdown;
