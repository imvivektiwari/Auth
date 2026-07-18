import { ReactNode } from "react";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";

export type RouteType = {
  label: string;
  path: string;
  icon: ReactNode;
};

export const ROUTES = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <MdOutlineSettings />,
  },
  {
    label: "Sign-out",
    path: "/sign-out",
    icon: <LiaSignOutAltSolid />,
  },
];
