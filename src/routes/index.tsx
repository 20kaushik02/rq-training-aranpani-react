import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { RouterProps } from "../shared/types/route.type";
import { AppRoutes } from "./routeConstants/appRoutes";
// import isAuthenticated from "../shared/components/HOC/requireAuth";
import AuthWrapper from "../views/Auth/AuthWrapper";

const AppRouter = () => {
  let routes: RouterProps[] = [
    { path: AppRoutes.AUTH, component: <AuthWrapper /> },
    // { path: AppRoutes.HOME, component: isAuthenticated(<Home />) },
  ];

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes?.map((route, index) => {
            return (
              <Route
                key={index}
                path={route?.path}
                element={route?.component}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
