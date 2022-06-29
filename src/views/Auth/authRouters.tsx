import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterProps } from "../../shared/types/route.type";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const authRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.LOGIN, component: <LoginForm /> },
    { path: AppRoutes.FORGOT_PASSWORD, component: <ForgotPassword /> },
    { path: AppRoutes.RESET_PASSWORD, component: <ResetPassword /> },
  ];

  return (
    <Routes>
      {routes.map(({ component, ...routerProps }, index) => (
        <Route key={index} element={component} {...routerProps} />
      ))}
    </Routes>
  );
};

export default authRouter;
