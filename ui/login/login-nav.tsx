import React from "react";
import Link from "next/link";
import logo from "./logo.svg";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./login-nav.module.css";

const LoginNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className={`container position-relative`}>
        {/* Hamburger Menu */}
        <button
          className={` border-0  ${styles.hamburgerMenu}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: "black", background: "transparent" }}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Logo - Centered */}
        <Link
          className={`navbar-brand px-5 me-5  ${styles.centeredLogo}`}
          href="/"
        >
          <span className="logo">
            <Image
              src={logo}
              alt="Logo"
              style={{
                height: "24px",
                marginRight: "5px",
              }}
            />
          </span>
        </Link>

        {/* Centered Navigation Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mx-5">
              <Link className={`nav-link ${styles.navLink}`} href="/platform">
                Platform
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link className={`nav-link ${styles.navLink}`} href="#programmes">
                Programmes
              </Link>
            </li>
            <li className="nav-item mx-5">
              <Link
                className={`nav-link ${styles.navLink}`}
                href="#contact-us"
                style={{ marginLeft: "10rem" }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side Auth Links */}
        <div
          className={`d-flex align-items-center ms-auto ${styles.authLinks}`}
        >
          <span
            className="user-icon me-5"
            style={{ color: "#FE457A", fontSize: "24px" }}
          >
            <i className="far fa-user-circle"></i>
          </span>
          <Link
            href="/login"
            className={`text-pink mx-2 fs-4 ${styles.navLink}`}
            style={{ color: "#FE457A" }}
          >
            Login
          </Link>
          <span style={{ color: "#FE457A" }}>|</span>
          <Link
            href="/signup"
            className={`text-pink mx-2 fs-4 ${styles.navLink}`}
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
