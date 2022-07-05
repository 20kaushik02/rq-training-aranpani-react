import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../../routes/routeConstants/appRoutes";

import { User } from "../../../models/User/user.model";
import { ResetPasswordValidationSchema } from "./validation";
import UserService from "../../../services/AuthService/auth.service";

import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import "./resetPassword.scss";

const ResetPassword = () => {
  const { resetPassword, loading } = UserService();

  const navigate = useNavigate();
  
  // const location = useLocation();
  // const email = new URLSearchParams(location.search).get("email");

  // if (!email) {
  //   navigate(NavigationRoutes.LOGIN);
  // }

  const handleSubmit = async (values: User) => {
    const user = Object.assign(new User(), {
      ...values,
      // email
    });

    if (await resetPassword(user)) {
      navigate(NavigationRoutes.LOGIN);
    }
  };

  const formikProps = {
    initialValues: new User(),
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: handleSubmit,
  };

  return (
    <div className="reset-password">
      <Formik {...formikProps}>
        {({ dirty, isValid }) => (
          <Form>
            <h2 className="font-bold">Reset Password</h2>
            <InputField
              title="Update Password"
              placeholder="Enter Password"
              name="password"
              type="password"
            />
            <InputField
              title="Confirm Password"
              placeholder="Enter confirm Password"
              name="confirmPassword"
              type="password"
            />
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={!dirty || !isValid}
            >
              Update and Proceed
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
