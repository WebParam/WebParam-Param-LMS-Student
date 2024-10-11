"use client";
import { Suspense, useState, useEffect } from "react";
import Loader from "@/ui/loader/loader";
import Enrolled from "./enrolled";

const EnrolledCourses = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="get-4-color rbt-title-style-3">
            <i className="bi bi-laptop "></i>
            <span className="style-3-left">My Applications</span>
          </h4>
        </div>

        <div className="tab-content">
           <Enrolled />
        </div>
      </div>
    </div>
  );
};

const EnrolledCoursesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <EnrolledCourses />
    </Suspense>
  );
};

export default EnrolledCoursesPage;
