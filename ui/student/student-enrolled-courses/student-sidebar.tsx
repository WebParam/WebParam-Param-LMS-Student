"use client";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const StudentDashboardSidebar = ({isEnrolled}:any) => {
  const [username, setUsername] = useState<string | null>(null);
  const cookies = new Cookies();
  const path = usePathname();
  const router = useRouter();
  const user = cookies.get("logggedInUser");

  useEffect(() => {
    const storedUsername = cookies.get("username");
    setUsername(storedUsername);
  }, []);


  function handleLogOut() {
    cookies.remove("loggedInUser");
     cookies.remove("username");
     cookies.remove("userEmail")
     cookies.remove("resetEmail")
     router.push('/login')
  }

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
                <h6 className="rbt-title-style-2">{username ? `Welcome ${username}` : "name surname"}</h6>
              </div>

              {isEnrolled == 0 && 
              <>
              <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">Student</h6>
              </div>

              <nav className="mainmenu-nav">
                {<ul className="dashboard-mainmenu rbt-default-sidebar-list">
                      {/* <li>
                        <Link
                          href={'/student/dashboard'}
                          className={`${path === '/student/dashboard' ? "active" : ""}`}
                        >
                          <i className='bi bi-grid-fill' />
                          <span>Dashboard</span>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          href={'/student/enrolled-courses'}
                          className={`${path === '/student/enrolled-courses' ? "active" : ""}`}
                        >
                          <i className='bi bi-laptop-fill' />
                          <span>My Courses</span>
                        </Link>
                      </li>

                      {/* <li>
                        <Link
                          href={'/student/assessments'}
                          className={`${path === '/student/assessments' ? "active" : ""}`}
                        >
                          <i className='feather-message-square' />
                          <span>Assessments</span>
                        </Link>
                      </li> */}

                      
                      {/* <li>
                        <Link
                          href={'/student/assignments'}
                          className={`${path === '/student/assignments' ? "active" : ""}`}
                        >
                          <i className='feather-menu' />
                          <span>Assignments</span>
                        </Link>
                      </li> */}

                      {/* <li>
                        <Link
                          href={'/student/logbook'}
                          className={`${path === '/student/logbook' ? "active" : ""}`}
                        >
                          <i className='bi-journal-bookmark' />
                          <span>Logbook</span>
                        </Link>
                      </li> */}
                </ul>}
              </nav>
              </>}

              <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">User</h6>
              </div>

              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  <li>
                    <Link
                      href={'/student/student-profile'}
                      className={`${path === '/student/student-profile' ? "active" : ""}`}
                    >
                      <i className='feather-user' />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={'/student/notifications'}
                      className={`${path === '/student/notifications' ? "active" : ""}`}
                    >
                      <i className='feather-volume-2' />
                      <span>Notifications</span>
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      href={'#'}
                      className={`${path === '/student/settings' ? "active" : ""}`}
                    >
                      <i className='feather-volume-2' />
                      <span>Settings</span>
                    </Link>
                  </li> */}

                  <li>
                    <div
                      style={{cursor:'pointer'}}
                      onClick={handleLogOut}
                    >
                      <i className='feather-log-out' />
                      <span>Logout</span>
                    </div>
                  </li>
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