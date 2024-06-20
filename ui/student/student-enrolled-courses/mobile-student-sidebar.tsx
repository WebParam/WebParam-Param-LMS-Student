"use client";

import { usePathname } from "next/navigation";
import SidebarData from "@/data/dashboard/student/siderbar.json";
import StudentMobileProps from "@/interfaces/side-bar";
import styles from "@/styles/side-bar/side-bar.module.css";

const StudentMobileSideBar = ({
  isOpen,
  toggleSidebar,
}: StudentMobileProps): JSX.Element => {
  const path = usePathname();

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.overlay} onClick={toggleSidebar}></div>
      <div className={styles["sidebar-content"]}>
        <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <div className="section-title mb--20">
                  <h6 className="rbt-title-style-2">Welcome, Mpho Moroka</h6>
                </div>
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SidebarData &&
                      SidebarData.siderbar.slice(0, 7).map((data, index) => (
                        <li
                          className="nav-item"
                          key={index}
                          role="presentation"
                        >
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

                <div className="section-title mt--40 mb--20">
                  <h6 className="rbt-title-style-2">Student</h6>
                </div>

                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SidebarData &&
                      SidebarData.siderbar.slice(9, 12).map((data, index) => (
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

                <div className="section-title mt--40 mb--20">
                  <h6 className="rbt-title-style-2">User</h6>
                </div>

                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SidebarData &&
                      SidebarData.siderbar.slice(7, 10).map((data, index) => (
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
      </div>
    </div>
  );
};

export default StudentMobileSideBar;