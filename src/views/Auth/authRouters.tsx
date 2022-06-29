import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import { RouterProps } from "../../shared/types/route.type";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const authRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.LOGIN, component: <LoginForm /> },
  ];

  return (
    <Routes>
      {routes.map(({ component, ...routerProps }, index) => (
        <Route key={index} element={component} {...routerProps} />
      ))}
      <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
    </Routes>
  );
};

export default authRouter;
