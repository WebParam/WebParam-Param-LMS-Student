import React from "react";
import Link from "next/link";
// import logo from "./logo.svg";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./login-nav.module.scss";

const LoginNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="container">
        {/* Hamburger Menu */}
        <button
          className="border-0" // Ensure there's no background
          type="button"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
          style={{ color: "black", background: "transparent" }} // Remove background
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Centered Navigation Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            {" "}
            {/* Added align-items-center */}
            <li className="nav-item mx-5">
              <Link className="nav-link text-dark fs-4 " href="/platform">
                Platform
              </Link>
            </li>
            <li className="nav-item mx-5 ">
              <Link
                className="nav-link text-dark fs-4 hover-effect"
                href="#programmes"
              >
                Programmes
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link text-dark fs-4" href="/">
                <span
                  className="logo"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {/* <Image
                    // src={logo} // Replaced placeholder text with logo image
                    alt="Logo"
                    style={{
                      height: "24px", // Adjust height as needed
                      marginRight: "5px", // Add margin for spacing
                    }} */}
                  {/* /> */}
                </span>{" "}
                {/* Placeholder for Logo */}
              </Link>
            </li>
            <li className=" nav-item mx-4">
              <Link className="nav-link text-dark fs-4" href="#contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side Auth Links */}
        <div className="d-flex align-items-center ms-auto">
          <span
            className="user-icon me-5"
            style={{ color: "#FE457A", fontSize: "24px" }}
          >
            <i className="far fa-user-circle"></i>
          </span>
          <Link
            href="/login"
            className="text-pink mx-2 fs-4"
            style={{ color: "#FE457A" }}
          >
            Login
          </Link>
          <span style={{ color: "#FE457A" }}>|</span>
          <Link
            href="/signup"
            className="text-pink mx-2 fs-4 "
            style={{ color: "#FE457A" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LoginNav;
