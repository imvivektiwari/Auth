import { ReactNode } from "react";

export type RouteType = {
  label: string;
  path: string;
  icon: ReactNode;
};

export const ROUTES = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: null,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: null,
  },
];
