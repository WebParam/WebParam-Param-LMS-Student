"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import User from "@/avator/user.png";
import UserStudent from "@/ui/user/user-dropdown";
import styles from "@/styles/side-bar/profile-nav-bar.module.css";
import StudentMobileSideBar from "../student/student-enrolled-courses/mobile-student-sidebar";

const Navbar = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: "dashboard", label: "Dashboard", link: "/student/dashboard" },
    { id: "course", label: "My Courses", link: "/student/enrolled-courses" },
  ];

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

  const handleAvatarClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <>
      <header className="rbt-header">
        <div className="rbt-sticky-placeholder"></div>

        <div className="rbt-header-wrapper">
          <div className="container">
            <div className="mainbar-row rbt-navigation-center align-items-center">
              <div className="header-left">
                <Link href="/" className="logo" 
                style={{
                  fontFamily:`"League Spartan" sans-serif `,
                  fontWeight: "900",
                  color: "rgb(36, 52, 92)",
                  fontSize: "50px"}}>
                  thooto
                </Link>
              </div>

              <div className="rbt-main-navigation d-none d-xl-block">
                <nav className="mainmenu-nav onepagenav">
                  {process.env.SHOW_TOP_BANNER &&    <ul className="mainmenu">
                    {sections.map((sec, i) => (
                      <li
                        className={currentSection === sec.id ? "current" : ""}
                        key={i}
                      >
                        <Link href={sec.link}>{sec.label}</Link>
                      </li>
                    ))}
                  </ul>}
               
                </nav>
              </div>
              {process.env.SHOW_TOP_BANNER && 
              <div className="rbt-header-sec-col rbt-header-center d-none d-md-block margin-right-3">
                <div className="rbt-header-content">
                  <div className="header-info">
                    <div className="rbt-search-field">
                      <div className="search-field">
                        <input type="text" placeholder="Search Course" />
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
            }
             {process.env.SHOW_TOP_BANNER && 
              <div className="header-right d-flex align-items-center mt">
                <div className="d-none d-md-block me-3">
                  <Link href="#" onClick={handleAvatarClick}>
                    <Image
                      src={User}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  </Link>
                  {isDropdownVisible && (
                    <div className={styles.dropdownMenu}>
                      <UserStudent closeDropdown={closeDropdown} />
                    </div>
                  )}
                </div>

                <div
                  className="rbt-offcanvas-trigger d-xl-none"
                  id="rbt-offcanvas-activation"
                  onClick={toggleSidebar}
                >
                  <span className="offcanvas-trigger">
                    <span className="offcanvas-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </span>
                </div>
              </div>
            }
            </div>
          </div>
        </div>
      </header>
      <StudentMobileSideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

export default Navbar;