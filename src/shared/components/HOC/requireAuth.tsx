import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { NavigationRoutes } from '../../../routes/routeConstants/appRoutes';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const Authentication = (props: any) => {
        const { authenticated } = AuthContext();
        const location = useLocation();
        const navigate = useNavigate();
        useEffect(() => {
            if (!authenticated && location.pathname !== NavigationRoutes.LOGIN) {
                return navigate(NavigationRoutes.LOGIN);
            }
        }, [props]);

        return <div className="app-wrapper">{children}</div>;
    }

    return <Authentication />;
};

export const isAuthenticated = (component: JSX.Element) => {
    return RequireAuth({ children: component });
};


export default isAuthenticated;