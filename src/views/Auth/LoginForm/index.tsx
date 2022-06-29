import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { validationSchema } from "./LoginValidation";
import { Button } from "antd";
import UserService from "../../../services/AuthService/auth.service";
import "./login.scss";
import { User } from "../../../models/user.model";

const LoginForm = () => {
  const { loading, loginUser } = UserService();

  const onSubmit = async (values: User) => {
    const user = Object.assign(new User(), values);
    await loginUser(user);
  };

  return (
    <div className="login-form">
      <Formik
        initialValues={new User()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
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
                onClick={() => {
                  console.log('help');
                }}
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
