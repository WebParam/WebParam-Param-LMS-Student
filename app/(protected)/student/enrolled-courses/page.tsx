"use client";

import './course.scss';
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/ui/loader/loader";
import styles from "@/styles/enrolled-courses/enrolled-courses.module.css";
import Enrolled from "./enrolled";
import Completed from "./completed";
import SoftSkills from "./softSkills/soft-skills";
import { useRouter, useSearchParams } from "next/navigation";
import Active from "./active";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const EnrolledCourses = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [showMoreTabs, setShowMoreTabs] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (tab == null) {
      router.push('/student/enrolled-courses?tab=enrolled');
    }
  }, [tab]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="get-4-color rbt-title-style-3">
            <i className="bi bi-laptop "></i>
            <span className="style-3-left">My Courses</span>
          </h4>
        </div>
        <div className={`advance-tab-button mb--30 ${styles.advanceTabButton}`}>
          <ul className={`nav nav-tabs tab-button-style-2 ${styles.navTabs}`} id="myTab-4" role="tablist">
            {!showMoreTabs && (
              <>
                <li role="presentation">
                  <Link
                    href="#"
                    className={`tab-button ${tab == "enrolled" && "active"} ${styles.tabButton}`}
                    id="home-tab-4"
                    data-bs-toggle="tab"
                    data-bs-target="#home-4"
                    role="tab"
                    aria-controls="home-4"
                    aria-selected="true"
                    onClick={() => router.push('/student/enrolled-courses?tab=enrolled')}
                  >
                    <span className="title">Enrolled</span>
                  </Link>
                </li>
                <li role="presentation">
                  <Link
                    href="#"
                    className={`tab-button ${tab == "active" && "active"} ${styles.tabButton}`}
                    id="profile-tab-4"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-4"
                    role="tab"
                    aria-controls="profile-4"
                    aria-selected="false"
                    onClick={() => router.push('/student/enrolled-courses?tab=active')}
                  >
                    <span className="title">Active</span>
                  </Link>
                </li>
                <li role="presentation">
                  <Link
                    href="#"
                    className={`tab-button ${tab == "completed" && "active"} ${styles.tabButton}`}
                    id="contact-tab-4"
                    data-bs-toggle="tab"
                    data-bs-target="#contact-4"
                    role="tab"
                    aria-controls="contact-4"
                    aria-selected="false"
                    onClick={() => router.push('/student/enrolled-courses?tab=completed')}
                  >
                    <span className="title">Completed</span>
                  </Link>
                </li>
                <li role="presentation">
                  <button
                    className={`tab-button more-tabs-button ${isSmallScreen ? "" : styles.showMore}`}
                    onClick={() => setShowMoreTabs(!showMoreTabs)}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </li>
              </>
            )}
            {showMoreTabs && (
              <>
                <li role="presentation">
                  <button
                    className={`tab-button more-tabs-button ${isSmallScreen ? "" : styles.showMore}`}
                    onClick={() => setShowMoreTabs(!showMoreTabs)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                </li>
                <li role="presentation">
                  <Link
                    href="#"
                    className={`tab-button ${tab == "softSkills" && "active"} ${styles.tabButton}`}
                    id="softSkills-tab-4"
                    data-bs-toggle="tab"
                    data-bs-target="#softSkills-4"
                    role="tab"
                    aria-controls="softSkills-4"
                    aria-selected="false"
                    onClick={() => router.push('/student/enrolled-courses?tab=softSkills')}
                  >
                    <span className="title">Soft Skills</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="tab-content">
          {tab === "enrolled" && <Enrolled />}
          {tab === "active" && <Active />}
          {tab === "completed" && <Completed />}
          {tab === "softSkills" && <SoftSkills />}
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
