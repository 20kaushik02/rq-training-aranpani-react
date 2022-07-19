import React from "react";
import {
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { RouterProps } from "../shared/types/route.type";
import { AppRoutes } from "./routeConstants/appRoutes";

import isAuthenticated from "../shared/components/HOC/withAuth";
import SideMenu from "../shared/components/SideMenu";

import AuthWrapper from "../views/Auth/AuthWrapper";
import Dashboard from "../views/Dashboard";
import ListProjects from "../views/Projects/ListProjects";
import ProjectDetails from "../views/Projects/ProjectDetails";
import Representatives from "../views/Representatives";
import RepresentativeDetails from "../views/Representatives/RepresentativeDetails";

const AppRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    { path: AppRoutes.DASHBOARD, component: isAuthenticated(<Dashboard />) },
    { path: AppRoutes.PROJECTS, component: isAuthenticated(<ListProjects />) },
    { path: AppRoutes.PROJECT_DETAILS, component: isAuthenticated(<ProjectDetails />) },
    { path: AppRoutes.REPRESENTATIVE, component: isAuthenticated(<Representatives />) },
    { path: AppRoutes.REPRESENTATIVE_DETAILS, component: isAuthenticated(<RepresentativeDetails />) },

  ];

  return (
    <div>
      <BrowserRouter>
        <SideMenu />
        <Routes>
          {routes.map(({ component, ...route }, index) =>
            <Route key={index} {...route} element={component} />
          )}
          <Route path="*" element={<Navigate to={AppRoutes.PROJECTS} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
