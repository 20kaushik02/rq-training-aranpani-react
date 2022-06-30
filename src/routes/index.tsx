import React from "react";
import {
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { RouterProps } from "../shared/types/route.type";
import { AppRoutes, NavigationRoutes } from "./routeConstants/appRoutes";
// import isAuthenticated from "../shared/components/HOC/requireAuth";
import AuthWrapper from "../views/Auth/AuthWrapper";

const AppRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
  ];

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes.map(({ component, ...route }, index) =>
            <Route key={index} {...route} element={component} />
          )}
          <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
