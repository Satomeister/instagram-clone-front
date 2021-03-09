import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  GrFormSearch as SearchIcon,
  IoCloseCircle as CloseIcon,
} from "react-icons/all";

import "./GlobalSearch.scss";

import { InputDropdown } from "./components";
import { UsersApi } from "../../../../api";
import { IShortUser } from "../../../../store/ducks/authUser/contracts/state";
import { LoadingStatus } from "../../../../store/types";
import Preloader from "../../../Preloader";

const GlobalSearch: FC = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [users, setUsers] = useState<IShortUser[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
    LoadingStatus.NEVER
  );

  const showInput = () => {
    setInputVisible(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (inputVisible && value.trim()) {
      setDropdownOpen(inputVisible);
    } else {
      setTimeout(() => {
        setDropdownOpen(inputVisible);
      }, 100);
    }
  }, [inputVisible, value]);

  const handleSetValue = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      setValue(value);
      setLoadingStatus(LoadingStatus.LOADING);
      const { data } = await UsersApi.findUsers(value);
      setUsers(data);
      setLoadingStatus(LoadingStatus.SUCCESS);
    } catch (e) {
      setLoadingStatus(LoadingStatus.ERROR);
    }
  };

  return (
    <div className="global-search-input">
      {!inputVisible ? (
        <div className="open-input-button" onClick={showInput}>
          <SearchIcon className="open-input-button__icon" />
          <span className="open-input-button__text">{value || "Search"}</span>
        </div>
      ) : (
        <div className="global-input__wrapper">
          <SearchIcon className="input__icon" />
          <input
            onChange={handleSetValue}
            onBlur={() => setInputVisible(false)}
            value={value}
            autoFocus
            ref={inputRef}
            type="text"
            placeholder="Search"
          />
          {loadingStatus === LoadingStatus.LOADING ? (
            <Preloader size={16} className="input__icon" />
          ) : (
            <CloseIcon style={{ cursor: "pointer" }} className="input__icon" />
          )}
        </div>
      )}
      {dropdownOpen && (
        <>
          <div className="arrow-bottom">
            <div className="arrow-bottom__inner" />
          </div>
          <InputDropdown users={users} />
        </>
      )}
    </div>
  );
};

export default GlobalSearch;
