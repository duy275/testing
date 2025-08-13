import type { RouteConfig } from "../types/Routes"
import Calculator from "../pages/Calculator"
import calculator from '../../public/calculator-minimalistic-svgrepo-com.svg'
import Dashboard from "../pages/Dashboard"
import dashboard from '../../public/dashboard-svgrepo-com.svg'

export const routes: RouteConfig[] = [
    {
        path: '/calculator',
        key: 'CALCULATOR',
        component: <Calculator />,
        icon: calculator,
        exact: true,
    },
    {
        path: '/dashboard',
        key: 'DASHBOARD',
        component: <Dashboard/>,
        icon: dashboard,
        exact: true,
    }
]

export const DEFAULT_ROUTE = routes[0];

export const getRouteByKey = (key: string): RouteConfig | undefined => {
    return routes.find(route => route.key === key);
}

export const getRouteByPath = (path: string): RouteConfig | undefined => {
    return routes.find(route => route.path === path);
}