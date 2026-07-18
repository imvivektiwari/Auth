import { ReactNode } from "react";
import { RouteType } from "@/routes";
import Link from "next/link";
import CompanyLogo from "../CompanyLogo/CompanyLogo";

type PrimaryNavigationProps = {
  routes: RouteType[];
  children?: ReactNode;
};

const PrimaryNavigation = ({ routes, children }: PrimaryNavigationProps) => {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
          <a href="./" className="flex items-center ps-2.5 mb-5">
            <CompanyLogo fontSize={"1.5rem"} />
            <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">
              {process.env.APP_NAME}
            </span>
          </a>

          <ul className="space-y-2 font-medium">
            {routes.map((route, index) => {
              return (
                <li key={`${route.label}-${index}`}>
                  <Link
                    href={route.path}
                    className="flex items-center px-2 py-1.5"
                  >
                    {route.icon}
                    <span className="ms-3">{route.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 text-white">{children}</div>
    </>
  );
};

export default PrimaryNavigation;
