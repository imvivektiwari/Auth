import { RouteType } from "@/routes";
import Link from "next/link";
import React from "react";

type PrimaryNavigationProps = {
  routes: RouteType[];
};

const PrimaryNavigation = ({ routes }: PrimaryNavigationProps) => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-55 h-full transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
        <ul className="space-y-2 font-medium">
          {routes.map((route: RouteType, index) => {
            return (
              <li key={index}>
                <Link
                  href={route.path}
                  className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                >
                  <span className="ms-3">{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default PrimaryNavigation;
