import React from "react";

import { User } from "../../../models/user.model";
import { ForgotPasswordValidationSchema } from "./validation";
import UserService from "../../../services/AuthService/auth.service";

import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import "./forgotPassword.scss";

const ForgotPassword = () => {
  const { setResetCode, loading } = UserService();

  const handleSubmit = async (values: User) => {
    const user = Object.assign(new User(), values);
    await setResetCode(user);
  };

  const formikProps = {
    initialValues: new User(),
    validationSchema: ForgotPasswordValidationSchema,
    onSubmit: handleSubmit,
  };

  return (
    <div className="forgot-password">
      <Formik {...formikProps}>
        {({ dirty, isValid }) => (
          <Form>
            <h2 className="font-bold">Forgot Password</h2>
            <InputField
              title="Enter Registered Email ID"
              placeholder="Type here"
              name="email"
              type="text"
            />
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={!dirty || !isValid}
            >
              Send Reset Code
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
