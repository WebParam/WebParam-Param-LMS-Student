"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import User from "@/images/user.png";
import UserStudent from "@/ui/user/user-dropdown";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const sections = [
    { id: "dashboard", label: "Dashboard" },
    { id: "course", label: "My Courses" },
    { id: "progress", label: "My progress" },
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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 180) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAvatarClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <header className="rbt-header">
        <div className="rbt-sticky-placeholder"></div>

        <div className="rbt-header-wrapper">
          <div className="container">
            <div className="mainbar-row rbt-navigation-center align-items-center">
              <div className="header-left">
                <div className="logo">Khumla</div>
              </div>

              <div className="rbt-main-navigation d-none d-xl-block">
                <nav className="mainmenu-nav onepagenav">
                  <ul className="mainmenu">
                    {sections.map((sec, i) => (
                      <li
                        className={currentSection === sec.id ? "current" : ""}
                        key={i}
                      >
                        <ScrollLink
                          to={sec.id}
                          spy={true}
                          smooth={true}
                          duration={500}
                          offset={-70}
                          style={{ cursor: "pointer" }}
                        >
                          {sec.label}
                        </ScrollLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

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
                    <div className="dropdown-menu-1">
                      <UserStudent />
                    </div>
                  )}
                </div>

                <div
                  className="rbt-offcanvas-trigger d-xl-none"
                  id="rbt-offcanvas-activation"
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
