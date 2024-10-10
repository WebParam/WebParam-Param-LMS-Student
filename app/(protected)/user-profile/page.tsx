import React from "react";
import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";
import Image from "next/image";
import styles from "./UserProfile.module.css"; // Adjust the path as necessary

const profilePicture =
  require("../../../app/(auth)/login/profilepic.jpeg").default;

import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfile: React.FC = () => {
  return (
    <div className="d-flex" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StudentDashboardSidebar />
      <div className="flex-grow-1">
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
            <h2 className="mb-1">Nicole Gura</h2>
            <p className="mb-1 fs-4">
              Front-End Designer | Tsatsile Consulting
            </p>
            <p className="mb-1 fs-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              Cape Town, Western Cape
            </p>
            <p className="mb-1 fs-4">Date Started: July 2022</p>
            <div className="d-flex justify-content-between mt-3 fs-4 fw-bold">
              <a href="/edit-profile" className={`${styles.editButton}`}>
                Edit Profile
              </a>
              <button className={`${styles.messageButton} ms-3`}>
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Second Third */}
        <div className="p-4 mt-5 mx-5 d-inline-flex w-100 justify-content-center">
          <div
            className="card me-3"
            style={{ width: "auto", alignSelf: "flex-start" }}
          >
            <div className="card-body">
              <h3 className={`card-title fs-1 ${styles.cardTitle}`}>
                Personal Bio
              </h3>
              <p className="fs-4">
                <strong>Full Name:</strong> Nicole Gura
                <br />
                <strong>Email Address:</strong> nicole@tsatsile.co.za
                <br />
                <strong>ID Number:</strong> 98230139021097
                <br />
                <strong>Mobile Number:</strong> 012 345 6789
                <br />
                <strong>Gender:</strong> Female
                <br />
                <strong>Race:</strong> Black
                <br />
                <strong>Disability:</strong> None
              </p>
            </div>
          </div>
          <div
            className="card"
            style={{ width: "auto", alignSelf: "flex-start" }}
          >
            <div className="card-body">
              <h3 className={`card-title fs-1 ${styles.cardTitle}`}>
                Professional Bio
              </h3>
              <p className="fs-4">
                <strong>Highest Qualification:</strong> Diploma Certificate
                <br />
                <strong>Currently enrolled in studies:</strong> No
                <br />
                <strong>Drivers License:</strong> Yes
                <br />
                <strong>Type of License:</strong> [Specify Type]
                <br />
                <strong>Asset Assigned:</strong> [Yes/No]
                <br />
                <strong>Asset Type:</strong> [Specify Type]
                <br />
                <strong>Asset Model:</strong> [Specify Model]
                <br />
                <strong>License Registration Plate:</strong> [Specify Plate]
                <br />
                <strong>Tracker Status:</strong> [Specify Status]
                <br />
                <strong>Insurance status:</strong> -
                <br />
                <strong>Incident/Accident reports:</strong> [Details]
                <br />
                <strong>Host Placement:</strong> [Details]
                <br />
                <strong>Programme Enrollment:</strong> Learnership name/ YES
                programme
                <br />
                <strong>Programme Status:</strong> Active, Dropout
                <br />
                <strong>Bank Account information:</strong> [Details]
                <br />
                <strong>Contract:</strong> [Yes/No]
                <br />
                <strong>Criminal Background check:</strong> [Details]
              </p>
            </div>
          </div>
        </div>

        {/* Third Third */}
        <div className="p-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Program Journey</h3>
              <p>[Placeholder text for program journey goes here]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
