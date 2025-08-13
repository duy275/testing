//Navigation Custom Hook
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RouteKey } from '../../types/Routes';
import { DEFAULT_ROUTE, getRouteByPath, routes } from '../../route/appRoute';

export const useRouteNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialActivePage = (): RouteKey => {
        const currentRoute = getRouteByPath(location.pathname);
        return currentRoute?.key || DEFAULT_ROUTE.key
    };

    const [activePage, setActivePage] = useState<RouteKey>(getInitialActivePage());

    useEffect(() => {
        const currentRoute = getRouteByPath(location.pathname);
        if (currentRoute) {
            setActivePage(currentRoute.key)
        }
    },[location.pathname]);

    const navigateTo = (routeKey: RouteKey) => {
        const route = routes.find(r => r.key === routeKey);
        if (route) {
            navigate(route.path);   
        }
    };

    return {
        activePage,
        navigateTo,
        routes
    };
}