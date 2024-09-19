"use client";

import { usePathname, useRouter } from "next/navigation";
import StudentMobileProps from "@/interfaces/side-bar";
import styles from "@/styles/side-bar/side-bar.module.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GetSideBarData } from "@/interfaces/SidebarData";

const StudentMobileSideBar = ({isOpen,toggleSidebar,}: StudentMobileProps): JSX.Element => {
  const [username, setUsername] = useState<string | null>(null);
  const path = usePathname();
  const cookies = new Cookies();

  const handleLinkClick = (link: string) => {
    window.location.href = link;
    toggleSidebar();
  };

  const router = useRouter();
  
  function handleLogOut() {
    cookies.remove("loggedInUser");
    cookies.remove("username");
    cookies.remove("userEmail");
    cookies.remove("resetEmail");
    localStorage.removeItem("courseId");
    localStorage.removeItem("modalOpened");
    router.push("/login");
  }
  

  useEffect(() => {
    const storedUsername = cookies.get("username");
    setUsername(storedUsername);
  }, []);

  const SidebarData = GetSideBarData();
  const isFreemium = process.env.NEXT_PUBLIC_FREEMIUM && process.env.NEXT_PUBLIC_FREEMIUM == "true" ? true : false;
debugger;
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} style={{ width:'100%', position:'fixed', bottom:'0 !important', left:'0 !important', right:'0 !important', marginTop:'75px !important',zIndex:'1000'}}>
      <div className={styles.overlay} onClick={toggleSidebar}></div>
      <div className={styles["sidebar-content"]}>
        <div className="rbt-shadow-box" style={{borderRadius:'0', border:'1px solid #e0e0e0'}}>
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SidebarData &&
                      SidebarData.slice(0, isFreemium?3:8).map((data, index) => (
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
                  <h6 className="rbt-title-style-2">User</h6>
                </div>

    <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  <li>
                    <a
                  
                      href={'/student/student-profile'}
                      className={`${path === '/student/student-profile' ? "active" : ""}`}
                    >
                      <i className="feather-user" />
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a
                    onClick={handleLogOut}
                      href={'/'}
                      className={`${path === '/' ? "active" : ""}`}
                    >
                      <i className="feather-log-out" />
                      <span>Logout</span>
                    </a>
                  </li>
               </ul>
              </nav>


                {/* <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SidebarData &&
                     SidebarData.slice(isFreemium?3:8, isFreemium?5:10).map((data, index) => (
                        <li key={index}>
                          <a
                            className={`${path === data.link ? "active" : ""}`}
                            onClick={() => handleLinkClick(data.link)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className={data.icon} />
                            <span>{data.text}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMobileSideBar;
