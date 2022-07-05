import React from "react";
import {
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { RouterProps } from "../shared/types/route.type";
import { AppRoutes, NavigationRoutes } from "./routeConstants/appRoutes";

import isAuthenticated from "../shared/components/HOC/requireAuth";
import SideMenu from "../shared/components/SideMenu";

import AuthWrapper from "../views/Auth/AuthWrapper";
import Dashboard from "../views/Dashboard";

const AppRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.DASHBOARD, component: isAuthenticated(<Dashboard />) },

  ];

  return (
    <div>
      <BrowserRouter>
        <SideMenu />
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
