"use client";
import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetSideBarData } from "@/interfaces/SidebarData";
import Link from "next/link";

const StudentDashboardSidebar = () => {
  const cookies = new Cookies();
  const user = cookies.get("loggedInUser");
  const path = usePathname();

  function handleLogOut() {
    cookies.remove("loggedInUser");
    cookies.remove("username");
    cookies.remove("userEmail");
    cookies.remove("resetEmail");
    localStorage.removeItem("courseId");
    localStorage.removeItem("modalOpened");
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
                    SidebarData.slice(0, process.env.NEXT_PUBLIC_FREEMIUM?3:2).map((data: any, index: any) => {

                      return (
                      <li className="nav-item" key={index} role="presentation">
                        <Link
                          href={data.link}  
                          className={`${path === data.link ? "active" : ""}`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </Link>
                      </li>
                    )
                    })}
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
                  {/* {SidebarData &&
                  
                    SidebarData?.slice(-1).map((data: any, index: any) => {
                      // if logout, attach the logout function to the link
                      if (data.text == "Logout") {
                        return  <li key={index}>
                        <Link
                        onClick={handleLogOut}
                          href={data.link}
                          className={`${path === data.link ? "active" : ""}`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </Link>
                      </li>;
                      }

                      return (
                      <li key={index}>
                        <Link
                          href={data.link}
                          className={`${path === data.link ? "active" : ""}`}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </Link>
                      </li>
                    )
                    })} */}
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
