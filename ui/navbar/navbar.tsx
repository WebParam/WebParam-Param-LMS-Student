"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import './navbar.scss'
import { usePathname } from "next/navigation";
import SearchResults from "../searchResults/SearchResults";
import StudentMobileSideBar from "../student/student-enrolled-courses/mobile-student-sidebar";
import Nav from "./nav";

const Navbar = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [coursesCopy, setCoursesCopy] = useState<any>([]);
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const sections = [
    { id: "dashboard", label: "Dashboard", link: "/student/analytics" },
    { id: "course", label: "My Courses", link: "/student/enrolled-courses" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://khumla-development-newcourse-read.azurewebsites.net/api/v1/Courses/GetCoursesNew"
        );
        setCourses(response.data);
        setCoursesCopy(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const searchResults = courses.filter((item: any) =>
      item.data.title.toLowerCase().includes(search.toLowerCase())
    );

    setCoursesCopy(searchResults);

    if (!search) {
      setCoursesCopy(courses);
    }
  }, [search]);

  useEffect(() => {
    const sectionIds = ["dashboard", "course", "progress"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);

        if (element && scrollPosition >= element.offsetTop) {
          setCurrentSection(sectionId);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentSection]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <>
      {pathname != "/login" &&
        pathname != "/register" &&
        pathname != "/verify-account" &&
        pathname != "/forgot-password" &&
        pathname != "/forgot-password/otp" && (
          <>
            <header className="rbt-header">
              <div className="rbt-sticky-placeholder"></div>

              <div className="rbt-header-wrapper">
                <div className="container">
                  <div className="mainbar-row rbt-navigation-center align-items-center">
                    <div className="header-left">
                      <Link
                        href="/"
                        className="logo"
                        style={{
                          fontFamily: "League Spartan, sans-serif",
                          fontWeight: "900",
                          color: "#24345c",
                          fontSize: "50px",
                        }}
                      >
                        thooto
                      </Link>
                    </div>

                    {/* <div className="rbt-main-navigation d-none d-xl-block">
                      <nav className="mainmenu-nav onepagenav">
                        <ul className="mainmenu">
                          {sections.map((sec, i) => (
                            <li
                              className={
                                currentSection === sec.id ? "current" : ""
                              }
                              key={i}
                            >
                              <Link href={sec.link}>{sec.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div> */}

                    <div className="rbt-header-sec-col rbt-header-center d-none d-md-block margin-right-3">
                      <div className="rbt-header-content">
                        <div className="header-info">
                          <div className="rbt-search-field">
                            <div className="search-field">
                              <input
                                type="text"
                                placeholder="Search Course"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                              <button
                                className="rbt-round-btn serach-btn"
                                type="submit"
                              >
                                <i className="feather-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="header-right d-flex align-items-center mt" onClick={() => setIsSidebarOpen(state => !state)} style={{cursor:'pointer', height:'20px'}}>
                      <div className="d-none d-md-block me-3">
                        <div className={`humburger-menu ${isSidebarOpen && "active"}`}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {isSidebarOpen && 
            <Nav />
           }
            {search.trim() && <SearchResults coursesCopy={coursesCopy} />}
          </>
        )}
    </>
  );
};

export default Navbar;
