import React, { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../Auth.scss";

import { Input } from "../../../components";
import { useForm, ValidationsEnum } from "../../../hooks/useForm";
import { fetchLogin } from "../../../store/ducks/authUser/actionCreators";
import {
  selectLoginError,
  selectLoginLoadingStatus,
} from "../../../store/ducks/authUser/selectors";
import { LoadingStatus } from "../../../store/types";

const config = {
  fields: {
    email: {
      validations: {
        [ValidationsEnum.IS_REQUIRED]: { message: "Login is required" },
      },
    },
    password: {
      validations: {
        [ValidationsEnum.IS_REQUIRED]: { message: "Password is required" },
      },
    },
  },
};

const SignIn: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const error = useSelector(selectLoginError);
  const loadingStatus = useSelector(selectLoginLoadingStatus);

  const { getFieldProps, values, errors } = useForm(config);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(fetchLogin(values));
    }
  };

  return (
    <div className="auth__inner">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          {...getFieldProps("email")}
          name="email"
          placeholder="E-mail or Username"
        />
        <Input
          type="password"
          {...getFieldProps("password")}
          name="password"
          placeholder="Password"
        />
        <button
          disabled={loadingStatus === LoadingStatus.LOADING}
          type="submit"
          className="button primary-button submit-button"
        >
          Login
        </button>
        <div className="submit-error">{error}</div>
      </form>
    </div>
  );
};

export default SignIn;
