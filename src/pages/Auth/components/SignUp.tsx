import React, { FC, FormEvent } from "react";
import {useDispatch, useSelector} from "react-redux";

import "../Auth.scss";

import { Input } from "../../../components";
import { useForm, ValidationsEnum } from "../../../hooks/useForm";
import { fetchSignUp } from "../../../store/ducks/user/actionCreators";
import {selectSignUpError, selectSignUpLoadingStatus} from "../../../store/ducks/user/selectors";
import {LoadingStatus} from "../../../store/types";

const config = {
  fields: {
    email: {
      validations: {
        [ValidationsEnum.IS_REQUIRED]: { message: "E-mail is required" },
        [ValidationsEnum.IS_EMAIL]: { message: "E-mail is invalid" },
      },
    },
    fullname: {
      validations: {
        [ValidationsEnum.IS_REQUIRED]: { message: "Full Name is required" },
        [ValidationsEnum.MIN]: {
          value: 3,
          message: "Full Name must be at least 3 characters",
        },
        [ValidationsEnum.MAX]: {
          value: 40,
          message: "Full Name must be no longer than 40 characters",
        },
      },
    },
    username: {
      validations: {
        [ValidationsEnum.IS_REQUIRED]: { message: "Username is required" },
        [ValidationsEnum.MIN]: {
          value: 3,
          message: "Username must be at least 3 characters",
        },
        [ValidationsEnum.MAX]: {
          value: 30,
          message: "Username must be no longer than 30 characters",
        },
      },
    },
    password: {
      validations: {
        [ValidationsEnum.IS_REQUIRED]: { message: "Password is required" },
        [ValidationsEnum.MIN]: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  },
};

const SignUp: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const error = useSelector(selectSignUpError)
  const loadingStatus = useSelector(selectSignUpLoadingStatus)

  const { getFieldProps, values, errors } = useForm(config);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(fetchSignUp(values));
    }
  };

  return (
    <div className="auth__inner">
      <h2 className="auth__inner-title">
        Sign up to see photos and videos from your friends.
      </h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          {...getFieldProps("email")}
          name="email"
          placeholder="E-mail"
        />
        <Input
          type="text"
          {...getFieldProps("fullname")}
          name="fullname"
          placeholder="Full Name"
        />
        <Input
          type="text"
          {...getFieldProps("username")}
          name="username"
          placeholder="Username"
        />
        <Input
          type="password"
          {...getFieldProps("password")}
          name="password"
          placeholder="Password"
        />
        <button disabled={loadingStatus === LoadingStatus.LOADING} type="submit" className="button primary-button submit-button">
          Sign up
        </button>
        <div className="submit-error">
          {error}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
