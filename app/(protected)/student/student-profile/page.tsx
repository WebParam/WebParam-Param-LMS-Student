"use client";

import React, { useState } from "react";
import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";
import Image from "next/image";
import styles from "./UserProfile.module.css"; // Adjust the path as necessary
import Calendar from "@/ui/classes/calendar";
import DayView from "@/ui/classes/DayView";

const profilePicture = require("../../../(auth)/login/profilepic.jpeg").default;

const q1 = require("./svg/q1.svg").default;
const q2 = require("./svg/q2.svg").default;
const q3 = require("./svg/q3.svg").default;

const q4 = require("./svg/q4.svg").default;
const q5 = require("./svg/q5.svg").default;

import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "Nicole Gura",
    position: "Front-End Designer",
    company: "Tsatsile Consulting",
    location: "Cape Town, Western Cape",
    startDate: "July 2022",
    email: "nicole@tsatsile.co.za",
    idNumber: "98230139021097",
    mobileNumber: "012 345 6789",
    gender: "Female",
    race: "Black",
    disability: "None",
    highestQualification: "Diploma Certificate",
    currentlyEnrolled: "No",
    driversLicense: "Yes",
    licenseType: "[Specify Type]",
    assetAssigned: "[Yes/No]",
    assetType: "[Specify Type]",
    assetModel: "[Specify Model]",
    licensePlate: "[Specify Plate]",
    trackerStatus: "[Specify Status]",
    insuranceStatus: "-",
    incidentReports: "[Details]",
    hostPlacement: "[Details]",
    programmeEnrollment: "Learnership name/ YES programme",
    programmeStatus: "Active",
    bankInfo: "[Details]",
    contract: "[Yes/No]",
    backgroundCheck: "[Details]",
  });

  return (
    <div className={styles.mainContent}>
      <div
        className="d-flex"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="sidebar" style={{ width: "20%" }}>
          <StudentDashboardSidebar />
        </div>
        <div className="main-content flex-grow-1">
          {/* Top Third */}
          <div
            className="bg-light p-4 d-flex align-items-center justify-content-center"
            style={{ height: "33.33vh" }}
          >
            <Image
              src={profilePicture} // Replace with your circular image path
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: "200px", height: "200px" }} // Adjust size as needed
            />
            <div className="text-left">
              <h2 className="mb-1">{userData.name}</h2>
              <p className="mb-1 fs-4">
                {userData.position} | {userData.company}
              </p>
              <p className="mb-1 fs-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                {userData.location}
              </p>
              <p className="mb-1 fs-4">Date Started: {userData.startDate}</p>
              <div className="d-flex justify-content-between mt-3 fs-4 fw-bold">
                <a href="/edit-profile" className={`${styles.editButton}`}>
                  Edit Profile
                </a>
                <button className={`${styles.messageButton} ms-3`}>
                  <FontAwesomeIcon icon={faEnvelope} className="me-4" />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Second Third */}
          <div className="p-4 mt-5 mx-5 d-inline-flex w-100 justify-content-center">
            <div
              className="card me-3 px-5"
              style={{ width: "auto", alignSelf: "flex-start" }}
            >
              <div className="card-body">
                <h3 className={`card-title fs-2 ${styles.cardTitle}`}>
                  Personal Bio
                </h3>
                <p className="fs-4">
                  <strong>Full Name:</strong> {userData.name}
                  <br />
                  <strong>Email Address:</strong> {userData.email}
                  <br />
                  <strong>ID Number:</strong> {userData.idNumber}
                  <br />
                  <strong>Mobile Number:</strong> {userData.mobileNumber}
                  <br />
                  <strong>Gender:</strong> {userData.gender}
                  <br />
                  <strong>Race:</strong> {userData.race}
                  <br />
                  <strong>Disability:</strong> {userData.disability}
                </p>
              </div>
            </div>
            <div
              className="card"
              style={{ width: "auto", alignSelf: "flex-start" }}
            >
              <div className="card-body">
                <h3 className={`card-title fs-2 ${styles.cardTitle}`}>
                  Professional Bio
                </h3>
                <p className="fs-4">
                  <strong>Highest Qualification:</strong>{" "}
                  {userData.highestQualification}
                  <br />
                  <strong>Currently enrolled in studies:</strong>{" "}
                  {userData.currentlyEnrolled}
                  <br />
                  <strong>Drivers License:</strong> {userData.driversLicense}
                  <br />
                  <strong>Type of License:</strong> {userData.licenseType}
                  <br />
                  <strong>Asset Assigned:</strong> {userData.assetAssigned}
                  <br />
                  <strong>Asset Type:</strong> {userData.assetType}
                  <br />
                  <strong>Asset Model:</strong> {userData.assetModel}
                  <br />
                  <strong>License Registration Plate:</strong>{" "}
                  {userData.licensePlate}
                  <br />
                  <strong>Tracker Status:</strong> {userData.trackerStatus}
                  <br />
                  <strong>Insurance status:</strong> {userData.insuranceStatus}
                  <br />
                  <strong>Incident/Accident reports:</strong>{" "}
                  {userData.incidentReports}
                  <br />
                  <strong>Host Placement:</strong> {userData.hostPlacement}
                  <br />
                  <strong>Programme Enrollment:</strong>{" "}
                  {userData.programmeEnrollment}
                  <br />
                  <strong>Programme Status:</strong> {userData.programmeStatus}
                  <br />
                  <strong>Bank Account information:</strong> {userData.bankInfo}
                  <br />
                  <strong>Contract:</strong> {userData.contract}
                  <br />
                  <strong>Criminal Background check:</strong>{" "}
                  {userData.backgroundCheck}
                </p>
              </div>
            </div>
          </div>

          {/* Third Third */}
          <div className="p-4">
            <div className="card border-0">
              <div className="card-body">
                <h3 className={`${styles.programJourney} mb-5 fs-2 text-start`}>
                  Program Journey Summary
                </h3>

                {/* <p>[Placeholder text for program journey goes here]</p> */}
                <div className="d-flex justify-content-center">
                  <div className="text-center mx-3">
                    <Image
                      src={q1}
                      alt="Quarter 1"
                      className="me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p className=" fs-5">Quarter 1 Complete</p>
                  </div>
                  <div className="text-center mx-3">
                    <Image
                      src={q2}
                      alt="Quarter 2"
                      className="me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p className=" fs-5">Quarter 2 Complete</p>
                  </div>
                  <div className="text-center mx-3">
                    <Image
                      src={q3}
                      alt="Quarter 3"
                      className="me-3 "
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p className=" fs-5">Quarter 3 Complete</p>
                  </div>
                  <div className="text-center mx-3">
                    <Image
                      src={q4}
                      alt="Quarter 4"
                      className="me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p className=" fs-5">Quarter 4 Complete</p>
                  </div>
                  <div className="text-center mx-3">
                    <Image
                      src={q5}
                      alt="Complete"
                      className="me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p className=" fs-5">Complete!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
