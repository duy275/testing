import type { ReactNode } from "react";

export type RouteKey = 'HOME' | 'DASHBOARD' | 'CALCULATOR' | 'MESSAGE' | 'ALARM' | 'SETTINGS';

export interface RouteConfig {
    path: string;
    key: RouteKey;
    component: ReactNode;
    icon: string;
    exact?: boolean;
}