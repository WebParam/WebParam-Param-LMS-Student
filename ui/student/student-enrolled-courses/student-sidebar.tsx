"use client";
import Cookies from "universal-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetSideBarData } from "@/interfaces/SidebarData";

const StudentDashboardSidebar = () => {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const path = usePathname();
  const isFreemium =
    process.env.NEXT_PUBLIC_FREEMIUM &&
    process.env.NEXT_PUBLIC_FREEMIUM == "true"
      ? true
      : false;

  function handleLogOut() {
    cookies.remove("loggedInUser");
    cookies.remove("username");
    cookies.remove("userEmail");
    cookies.remove("resetEmail");
    router.push("/login");
  }
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = cookies.get("username");
    setUsername(storedUsername);
  }, []);

  const SidebarData = GetSideBarData();

  return (
    <>
      <div
        className="rbt-default-sidebar sticky-top rbt-shadow-box"
        style={{ border: "4px solid #f1f2f3", boxShadow: "0 0 10px #f1f2f3" }}
      >
        <div className="inner">
          <div className="content-item-content">
            <div className="rbt-default-sidebar-wrapper">
              <div className="section-title mb--20">
                <h6 className="rbt-title-style-2">
                  {username ? `Welcome ${username}` : "name surname"}
                </h6>
              </div>
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.slice(0, isFreemium?3:8).map((data: any, index: any) => {
                      
                      console.log(path === '/student/projects?tab=enrolled');
                      if (process.env.NEXT_PUBLIC_FREEMIUM && data.link == "/student/enrolled-courses") {
                        return  (
                        <li className="nav-item" key={index} role="presentation">
                        <a
                          href={'/student/projects?tab=enrolled'}
                          className={`${path == '/student/projects' ? "active" : ""}`} // Apply the active class correctly
                          style={{color: path == '/student/projects' ? "#2f57ef" : ""}} 
                        >
                          <i className={data.icon} />
                          <span>My Projects</span>
                        </a>
                      </li>);
                      }
                      return (
                      <li className="nav-item" key={index} role="presentation">
                        <a
                          className={`${path === data.link ? "active" : ""}`}
                          href={data.link}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </a>
                      </li>
                    )
                    })}
                </ul>
              </nav>

              {SidebarData?.length > (isFreemium?3:7) &&
                <div className="section-title mt--40 mb--20">
                  <h6 className="rbt-title-style-2">User</h6>
                </div>
              }
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                     SidebarData.slice(isFreemium?3:8, isFreemium?5:10).map((data: any, index: any) => (
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

export default StudentDashboardSidebar;
