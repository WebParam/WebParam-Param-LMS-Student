"use client";

import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GetSideBarData } from "@/interfaces/SidebarData";
import styles from "./StudentDashboardSidebar.module.css";
import Image from "next/image";
import profilePicture from "../../../app/(auth)/login/profilepic.jpeg";
import ramalo from "../../../ui/login/ramalo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Importing logout icon
import {
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Importing the arrow icon

const StudentDashboardSidebar: React.FC = () => {
  const cookies = new Cookies();
  const path = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  const handleLogOut = () => {
    cookies.remove("loggedInUser");
    cookies.remove("username");
    cookies.remove("userEmail");
    cookies.remove("resetEmail");
    localStorage.removeItem("courseId");
    localStorage.removeItem("modalOpened");
    router.push("/login");
  };

  useEffect(() => {
    const storedUsername = cookies.get("username");
    setUsername(storedUsername);
  }, []);

  const SidebarData = GetSideBarData();

  const basePath = path.split("?")[0];

  const isProfilePage = basePath === "/user-profile"; // Assuming "/profile" is the profile link

  useEffect(() => {
    console.log(`This is the path: ${path}`);
  });

  const calculateFillOpacity = (progress: number) => {
    return progress / 100; // Adjust opacity between 0 (0%) to 1 (100%)
  };
  const calculateProgressWidth = (progress: number) => {
    const totalWidth = 22; // The full width of the SVG
    return (progress / 100) * totalWidth; // Adjust the width based on progress (0 to 100)
  };

  return (
    <div
      className={`sticky-top h-100 w-20 rbt-shadow-box d-flex flex-column justify-content-between ${styles.sidebar}`}
      style={{ fontFamily: "'Montserrat', sans-serif", minHeight: "100vh" }}
    >
      <div>
        {/* Logo */}
        <div className="logo-container text-center mb-5">
          <Image src={ramalo} alt="Logo" width={120} height={60} priority />
        </div>

        {/* Profile Picture or Placeholder */}
        <div
          className="profile-picture-container d-flex justify-content-center align-items-center text-center mb-4"
          style={{
            width: "120px",
            height: "120px",
            margin: "0 auto",
            backgroundColor: isProfilePage ? "transparent" : "inherit", // Optional: Add a background color for the placeholder
          }}
        >
          {!isProfilePage && (
            <Image
              src={profilePicture}
              alt="Profile Picture"
              className="rounded-circle"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          )}
        </div>

        {/* Username and Role Placeholder */}
        <div className="section-title mb-5 text-center">
          <div style={{ height: "32px" }}>
            {" "}
            {/* Placeholder for username */}
            {!isProfilePage && (
              <h6
                className={` text-capitalize ${styles.username} fw-bold fs-1`}
              >
                {username
                  ? `${username}`.toUpperCase()
                  : "Nicole".toUpperCase()}
              </h6>
            )}
          </div>
          <div style={{ height: "24px" }}>
            {" "}
            {/* Placeholder for role text */}
            {!isProfilePage && (
              <p className="role-text fs-4">Front-End Designer</p>
            )}
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow-1">
          <ul className="d-flex flex-column justify-content-start h-100">
            {SidebarData &&
              SidebarData.map((data, index) => (
                <li className="mb-4" key={index} role="presentation">
                  <Link
                    href={data.link}
                    className={`d-flex align-items-center fs-3 ${
                      styles.sidebarLink
                    } ${
                      basePath === data.link.split("?")[0]
                        ? `fw-bold ${styles.activeLink}`
                        : ""
                    }`}
                  >
                    <i className={data.icon + " pe-4"}></i>
                    <span className="ms-2">{data.text}</span>
                    {basePath === data.link.split("?")[0] && (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="ms-auto"
                      />
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className={` ms-4  `}>
        <button
          onClick={handleLogOut}
          className="nav-link d-flex align-items-center fs-3 ms-3 "
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <div className=" feather-log-out me-2 " />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StudentDashboardSidebar;
