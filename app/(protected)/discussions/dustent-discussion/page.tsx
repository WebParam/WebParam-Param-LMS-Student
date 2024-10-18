"use client";

import { GetSideBarData } from "@/interfaces/SidebarData";
import { usePathname } from "next/navigation";


const DiscussionDashboardSidebar = () => {
  const isFreemium = process.env.NEXT_PUBLIC_FREEMIUM && process.env.NEXT_PUBLIC_FREEMIUM == "true" ? true : false;
  const SidebarData = GetSideBarData();
  const path = usePathname();
  return (
    <>
      <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
        <div className="inner">
          <div className="content-item-content">
            <div className="rbt-default-sidebar-wrapper">
              <div className="section-title mb--20"></div>
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.slice(0, isFreemium?3:8).map((data, index) => (
                      <li className="nav-item" key={index} role="presentation">
                        <a
                          className={`${path === data.link ? "active" : ""}`}
                          href={data.link}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>

              <div className="section-title mt--40 mb--20"></div>

              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.slice(isFreemium?3:8, isFreemium?5:10).map((data, index) => (
                      <li key={index}>
                        <a
                          href={data.link}
                          className={`${path === data.link ? "active" : ""}`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscussionDashboardSidebar;
