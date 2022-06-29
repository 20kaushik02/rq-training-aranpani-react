import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../routes/routeConstants/appRoutes";

import { User } from "../../../models/user.model";
import { LoginFormValidationSchema } from "./validation";
import UserService from "../../../services/AuthService/auth.service";

import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import "./login.scss";

const LoginForm = () => {
  const { loading, loginUser } = UserService();

  const navigate = useNavigate();

  const handleSubmit = async (values: User) => {
    const user = Object.assign(new User(), values);
    await loginUser(user);
  };

  const handleForgotPassword = () => {
    navigate(NavigationRoutes.FORGOT_PASSWORD);
  }

  const formikProps = {
    initialValues: new User(),
    validationSchema: LoginFormValidationSchema,
    onSubmit: handleSubmit,
  };

  return (
    <div className="login-form">
      <Formik {...formikProps}>
        {({ dirty, isValid }) => (
          <Form>
            <h2 className="font-bold">Login to admin portal</h2>
            <InputField
              title="Email ID"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputField
              title="Password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <div className="forget-password__link mb-5">
              <label
                htmlFor="forget-password"
                className="cursor-pointer link"
                onClick={handleForgotPassword}
              >
                Forgot Password ?
              </label>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isValid || !dirty}
              loading={loading}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div >
  );
};

export default LoginForm;
