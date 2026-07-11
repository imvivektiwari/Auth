"use client";
import { ReactNode, useState } from "react";

type Tabs = {
  slots: {
    tabs: {
      label: string;
      icon?: ReactNode;
    }[];
    tabContent: ReactNode[];
  };
};

const Tabs = ({
  slots = {
    tabs: [],
    tabContent: [],
  },
}: Tabs) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-default">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-body">
          {slots?.tabs.map((tab, index) => {
            return (
              <li
                key={index}
                className="me-2"
                onClick={() => setActiveTab(index)}
              >
                <a
                  href="#"
                  className={`${activeTab == 2 ? "active-tab" : ""} inline-flex items-center justify-center p-4 border-b border-transparent rounded-t-base hover:text-fg-brand hover:border-brand group`}
                  aria-current="page"
                >
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>{slots?.tabContent[activeTab]}</div>
    </div>
  );
};

export default Tabs;
